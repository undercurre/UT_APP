import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	GetReelCode,
	GetResourceRuncardView,
	GetResourceRouteOperationView,
	ProcessResourceFinish,
	ProcessResourceGiveOut,
	ProcessResourceRuncard
} from '@/api/SmtResourceProess.js'
import dayjs from 'dayjs'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo,
			authBtnList: state => state.user.authBtnList
		})
	},
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			form: {
				resourceNo: '', // 辅料条码编号
				nextOperationId: '',
				user: ''
			},
			netData: {},
			autoFocus: false,
			zhichengList: [],
			zhichengIndex: -1,
			disabled: true,
			msgContentHeight: 200,
			msgList: []
		}
	},
	onLoad() {
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(120) - uni.upx2px(280)
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		})
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handlePushMsgList(form, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.form || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async handleCheckReelID2() {
			this.autoFocus = false
			if (!this.form.resourceNo) {
				this.$voice.error()
				this.handlePushMsgList(this.form, '请输入辅料', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await GetReelCode(this.form.resourceNo)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.form, res.ErrorInfo.Message || '辅料检查失败', 'error')
				this.form.resourceNo = ''
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			if (res.Result) {
				this.disabled = false
				this.form.resourceNo = res.Result
				this.getFuliaoList()
			} else {
				this.$voice.error()
				this.form.resourceNo = ''
				this.handlePushMsgList(this.form, '辅料检查失败', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		},
		async getFuliaoList() {
			const res = await GetResourceRuncardView(this.form.resourceNo)
			if (res.Result) {
				this.form.nextOperationId = res.Result.NEXT_OPERATION.toString()
				this.netData = res.Result || {}
				this.getZhiCheng(res.Result.RESOURCE_ID)
			}
		},
		async getZhiCheng(RESOURCE_ID) {
			if (!this.form.resourceNo) return false;
			const res = await GetResourceRouteOperationView(RESOURCE_ID)
			this.zhichengList = res.Result || []
			this.zhichengList.map((item, index) => {
				if (item.NEXT_OPERATION.toString() === this.form.nextOperationId) {
					this.zhichengIndex = index
				}
			})
		},
		handleChangeZhiCheng(e) {
			this.zhichengIndex = e.detail.value
			this.form.nextOperationId = this.zhichengList[this.zhichengIndex].NEXT_OPERATION || ''
		},
		useFinished() {
			this.autoFocus = false
			if (!this.form.resourceNo) {
				this.$voice.error()
				this.handlePushMsgList(this.form, '请输入辅料条码', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			uni.showModal({
				title: '提示',
				content: '确定用完了吗？',
				success: async _ => {
					if (_.confirm) {
						const res = await ProcessResourceFinish({
							resourceNo: this.form.resourceNo,
							user: this.userInfo.USER_NAME
						})
						if (res.ErrorInfo.Status) {
							this.$voice.error()
							this.handlePushMsgList(this.form, res.ErrorInfo.Message || '操作失败', 'error')
							return false
						}
						if (res.Result) {
							this.$voice.success()
							this.handlePushMsgList(this.form, '操作成功', 'success')
							this.resetFormData()
						} else {
							this.handlePushMsgList(this.form, '操作失败', 'error')
							this.$voice.error()
						}
					}
				}
			})
		},
		scrapped() {
			this.autoFocus = false
			if (!this.form.resourceNo) {
				this.$voice.error()
				this.handlePushMsgList(this.form, '请输入辅料条码', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			uni.showModal({
				title: '提示',
				content: '确定要报废吗？',
				showCancel: false,
				success: async _ => {
					if (_.confirm) {
						const res = await ProcessResourceGiveOut({
							resourceNo: this.form.resourceNo,
							user: this.userInfo.USER_NAME
						})
						if (res.ErrorInfo.Status) {
							this.$voice.error()
							this.handlePushMsgList(this.form, res.ErrorInfo.Message || '操作失败', 'error')
							return false
						}
						if (res.Result) {
							this.$voice.success()
							this.handlePushMsgList(this.form, '操作成功', 'success')
							this.resetFormData()
						} else {
							this.$voice.error()
							this.handlePushMsgList(this.form, '操作失败', 'error')
						}
					}
				}
			})
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.form.resourceNo) {
				this.$voice.error()
				this.handlePushMsgList(this.form, '请输入辅料条码', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			this.form.user = this.userInfo.USER_NAME
			const res = await ProcessResourceRuncard(this.form)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.form, res.ErrorInfo.Message || '操作失败', 'error')
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.handlePushMsgList(this.form, '操作成功', 'success')
				this.resetFormData()
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.form, '操作失败', 'error')
			}
		}
	}
}
