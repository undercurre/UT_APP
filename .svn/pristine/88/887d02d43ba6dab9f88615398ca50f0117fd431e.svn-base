import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	GetTongsInfoByWoNo
} from '@/api/FixtureQuery.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			formData: {
				WoNo: '',
				PartNo: ''
			},
			List: [],
			autoFocus: false,
			autoFocusNext: false,
		}
	},
	onShow() {
		this.$nextTick(_ => {
			this.autoFocus = true
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
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		ReceiveClick() {
			uni.navigateTo({
				url: '/pages/FixtureCollar/index2'
			})
		},
		async getMesTongsInfo() {
			this.autoFocus = this.autoFocusNext = false
			if (!this.formData.WoNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工单号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await GetTongsInfoByWoNo(this.formData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.List = res.Result || []
				this.autoFocusNext = true
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
		async getMesStoreInfo() {
			this.autoFocusNext = false
			if (!this.formData.PartNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入产品编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await GetTongsInfoByWoNo(this.formData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.List = res.Result || []
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
	},
	onLoad() {

	},
	components: {
		graceHeader,
		gracePage
	}
}
