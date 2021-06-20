import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import {
	mapState
} from 'vuex'
import {
	LoadData,
	LoadPDATongsValidationInfo,
	AuditTongsValidationData,
	QueryPDATongsValidationBy,
	SavePDATongsValidationData
} from '@/api/MesTongsInfo.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	
	data() {
		return {
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			totalCount: 0,
			formData: {
				ID: 0, // 表ID
				STATUS: 1, // 审核状态 1：确认 2：审核
				AUDIT_USER: '', // 审核人员
				AUDIT_REMARKS: '', //审核备注
			},
			form: {
				TONGS_BODYMARK: '',
				hid: 0
			},
			Form: {
				CHECK_USER: '',
				Page: 1,
				Limit: 10
			},
			totalCount: 0,
			subData: {
				CHECK_CODE: '',
				TONGS_BODYMARK: '',
				CHECK_USER: '',
				Page: 1,
				Limit: 10
			},
			totalCountdata: 0,
			msgContentHeight:200

		}
	},
	onShow(){
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(150)
			}
		})
	},
	onLoad(e) {
		if (e.CODE) {
			this.subData.CHECK_CODE = e.CODE
			this.SavePDATongsValidationData()
		}
		else {
			this.getLoadPDAFeederCheckInfo()
		}
		if (e.ID) {
			this.formData.ID = e.ID
		}

	},
	methods: {
		async getLoadPDAFeederCheckInfo() {
			this.Form.CHECK_USER = this.userInfo.USER_NAME
			const res = await LoadPDATongsValidationInfo(this.Form)
			this.list = res.Result || []
			this.list.map(res => {
				this.form.hid = res.VDID
			})
			this.totalCount = res.TotalCount
		},
		// 分页
		changeReason3(e) {
			this.Form.Page = e.current
			this.getLoadPDAFeederCheckInfo()
		},
		async SavePDATongsValidationData() {
			this.subData.TONGS_BODYMARK = this.form.TONGS_BODYMARK || ''
			this.subData.CHECK_USER = this.userInfo.USER_NAME
			const res = await SavePDATongsValidationData(this.subData)
			this.list = res.Result || []
			this.list.map(res => {
				this.form.hid = res.VDID
			})
			console.log(this.list)
			this.totalCountdata = res.TotalCount
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}
		},
		changeReason4(e) {
			this.subData.Page = e.current
			this.SavePDATongsValidationData()
		},

		// 工装回车
		async getFeida(e) {
			let code = e.detail.value
			console.log(e, 'eeeeee')
			if (!code) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.autoFocus = false
			const row = await LoadData({
				CODE: code,
				IS_LIKE: 0,
				Page: 1,
				Limit: 15
			})
			const data = JSON.parse(row.Result) || []
			if (data.length) {
				const res = await QueryPDATongsValidationBy(this.form)
				if (!res.Result) {
					uni.showModal({
						title: "提示",
						content: "当前工装编码未保养，请确定保养！",
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/ToolingVerification/recording?CODE=' + code
								})
							} else if (res.cancel) {}
						}
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '当前工装已进行保养了！',
						showCancel: false,
						success: _ => {}
					})
					return false
					// this.SavePDATongsValidationData()
				}
				if (res.ErrorInfo.Status) {
					// this.list = []
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: res.ErrorInfo.Message,
						showCancel: false,
						success: _ => {}
					})
					return false
				}
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: this.form.TONGS_BODYMARK + '工装编码不存在，请重新输入！',
					showCancel: false,
					success: _ => {
						this.form.TONGS_BODYMARK = ''
					}
				})
			}
			if (row.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}

		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if (!this.formData.ID) {
				this.list.map(v => {
					this.formData.ID = v.VDID || 0
				})
			}
			this.formData.AUDIT_USER = this.userInfo.USER_NAME
			if (this.formData.ID === 0) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入工装编号回车',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.formData.ID = Number(this.formData.ID)
			const res = await AuditTongsValidationData(this.formData)
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {}
				})
			}
			if (res.ErrorInfo.Status) {
				this.NewsInfo = res.ErrorInfo.Message
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		},
	},
	components: {
		graceHeader,
		gracePage,
		uniPagination
	}
}
