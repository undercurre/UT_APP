import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	LoadData,
	MesTongsStoreConfigLoadData,
	ChangeStore
} from '@/api/FixtureQuery.js'
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
				STORE_CODE: '',
			},
			netData: {
				STORE_CODE: '',
			},
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
		cleanClick() {
			this.formData = {
				CODE: '',
				STORE_CODE: '',
			}
			this.netData = {
				STORE_CODE: '',
			}
			this.autoFocus = true
			this.autoFocusNext = false
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
					content: res.ErrorInfo.Message || '获取工装信息失败',
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
				this.autoFocusNext = true
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取工装信息失败',
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
			if (!this.formData.STORE_CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装储位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await MesTongsStoreConfigLoadData({
				CODE: this.formData.STORE_CODE
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '查询夹具储位失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			if (res.Result) {
				console.log(res.Result)
				this.formData.StoreID = (JSON.parse(res.Result || []) || {})[0].ID || ''
				console.log(this.formData.StoreID)
				this.$voice.success()
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '查询夹具储位失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
			}
		},
		async submitForm() {
			this.autoFocus = false
			this.autoFocusNext = false
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
			if (!this.formData.STORE_CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装储位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await await ChangeStore({
				TongsID: this.netData.ID || '',
				StoreID: this.formData.StoreID || '',
				UserName: this.userInfo.USER_NAME
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '转储失败',
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
					content: '转储成功',
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
					content: '转储失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		}
	}
}
