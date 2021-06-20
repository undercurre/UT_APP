import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	CartonOmissionCheck
} from '@/api/SfcsContainerList.js'

export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			// 保存站点
			SiteFrom: {
				carton_no: '',
				sn: ''
			},
			NewsInfo: '',
			statusBarHeight: 0,
			checkStatusIndex: 0,
			statusList: [{
				ID: '2',
				SBU_CHINESE: '消息区'
			}, ],
			autoFocus: true
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

		// this.SiteFrom.UserName = this.userInfo.USER_NAME
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async RevokeFormData() {

		},
		async submitData() {
			if (this.SiteFrom.carton_no && this.SiteFrom.sn) {
				var res = await CartonOmissionCheck(this.SiteFrom)
				if (res.Result) {
					console.log(res.Result, 'res.Result')
                    this.NewsInfo= res.ResultInfo
					// uni.showModal({
					// 	title: '提示',
					// 	content: tit,
					// 	showCancel: false,
					// 	success: _ => {
					// 		if (_.confirm) {
					// 			this.resetFormData()
					// 		}
					// 	}
					// })
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
			}

		},
		handleChangeStatus(index) {
			this.checkStatusIndex = index
		},
		resetFormData(isVibrate = false) {
			this.NewsInfo = ''
			this.SiteFrom = {
				carton_no: '',
				sn: ''
			},
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		}
	}
}
