import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	LoadData,
	MesTongsStoreConfigLoadData,
	EnterStore
} from '@/api/FixtureQuery.js'
import dayjs from 'dayjs'
export default {
	components: {
		graceHeader,
		gracePage
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			formData: {
				CODE: '',
				STORE_CODE: ''
			},
			netData: {

			},
			autoFocus: false,
			autoFocusNext: false,
			msgList: [],
			msgContentHeight: 200
		}
	},
	onShow() {
		this.$nextTick(_ => {
			this.autoFocus = true
		})
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(0)
			}
		})
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false,
				msgContentHeight: this.msgContentHeight,
				msgList: this.msgList
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		cleanClick() {
			this.formData = {
				ID: 0,
				CODE: '',
				NAME: '',
				ENABLED: 'Y'
			}
			this.autoFocus = true
			this.autoFocusNext = false
		},
		async submitForm() {
			this.autoFocus = false
			this.autoFocusNext = false
			if (!this.formData.CODE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工装编号', 'error')
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.STORE_CODE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工装库位', 'error')
				this.$nextTick(_ => {
					this.autoFocusNext = true
				})
				return false
			}
			const res = await EnterStore({
				TongsID: this.netData.ID || '',
				StoreID: this.formData.StoreID || '',
				UserName: this.userInfo.USER_NAME
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '入库失败', 'error')
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, '入库成功', 'success')
				this.$nextTick(_ => {
					this.resetFormData()
				})
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '入库失败', 'error')
			}
		},
		async getMesTongsInfo() {
			this.autoFocus = this.autoFocusNext = false
			if (!this.formData.CODE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工装编号', 'error')
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			const res = await LoadData({
				CODE: this.formData.CODE
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '获取产品信息失败', 'error')
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.netData = JSON.parse(res.Result || [])[0] || {}
				this.autoFocusNext = true
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '获取产品信息失败', 'error')
				this.$nextTick(_ => {
					this.resetFormData()
					this.autoFocus = true
				})
			}
		},
		async getMesStoreInfo() {
			this.autoFocusNext = false
			if (!this.formData.STORE_CODE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工装库位', 'error')
				this.$nextTick(_ => {
					this.autoFocusNext = true
				})
				return false
			}
			const res = await MesTongsStoreConfigLoadData({
				CODE: this.formData.STORE_CODE
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '查询夹具储位失败', 'error')
				this.$nextTick(_ => {
					this.formData.STORE_CODE = ''
					this.formData.StoreID = ''
					this.autoFocusNext = true
				})
				return false
			}
			if (res.Result) {
				this.formData.StoreID = (JSON.parse(res.Result || []) || {})[0].ID || ''
				this.$voice.success()
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '查询夹具储位失败', 'error')
				this.$nextTick(_ => {
					this.formData.STORE_CODE = ''
					this.formData.StoreID = ''
					this.autoFocusNext = true
				})
				return false
			}
			this.autoFocusNext = false
			this.submitForm()
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		}
	},

}
