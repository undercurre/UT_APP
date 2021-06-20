import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	BorrowTongs,
	LoadData
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
				IS_LIKE:0, //是否模糊查询
				CODE: '',
				UserName: ''
			},
			autoFocus: false,
			netData: {

			}
		}
	},
	onShow() {
		this.$nextTick(_ => {
			this.autoFocus = true
			this.formData.UserName = this.userInfo.USER_NAME
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
				this.formData.UserName = this.userInfo.USER_NAME
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getMesTongsInfo() {
			this.autoFocus = false
			if (!this.formData.CODE) {
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
			const res = await LoadData(this.formData)
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
				this.netData = JSON.parse(res.Result || [])[0] || {}
				console.log(this.netData)
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
		async submitForm() {
			this.autoFocus = false
			if (!this.formData.CODE) {
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
			const res = await BorrowTongs({
				TongsID: this.netData.ID || '',
				UserName: this.userInfo.USER_NAME
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '领用失败',
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
				uni.showModal({
					title: '提示',
					content: '领用成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '领用失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		}
	},
	onLoad() {

	},
	components: {
		graceHeader,
		gracePage
	}
}
