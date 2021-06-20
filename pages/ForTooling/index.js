import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	LoadData,
	BorrowTongs
} from '@/api/ForTooling.js'
import {
	mapState
} from 'vuex'
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
			form: {
				CODE: '',
				TongsID: 0, // 工装编号ID
				UserName: "",  //领用人
				remark: "", // 备注
			},
			autoFocus: true,
			disabled: false
		}
	},
	methods: {
		async getLoadData() {
			if (!this.form.CODE) {
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
			const res = await LoadData({
				CODE: this.form.CODE,
				IS_LIKE: 0
			})
			if (res.ErrorInfo.Status) {
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
				this.$voice.error()
				return false
			}
			if (res.Result) {
				const data = JSON.parse(res.Result)
				console.log(data, 'data===')
				if(data.length){
					
					this.$voice.success()
					if(data[0].ACTIVE === 'N'){
						uni.showModal({
							title: '提示',
							content: '当前工装未激活，无法领用！',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this.form.CODE = ''
									this.autoFocus = true
								}
							}
						})
						return false
					}
					if(data[0].STATUS !== 1 && data[0].STATUS !== 0){
						uni.showModal({
							title: '提示',
							content: '当前工装不是【待入库、存储中】状态，无法领用！',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this.form.CODE = ''
									this.autoFocus = true
								}
							}
						})
						return false
					}
					
					this.form.TongsID = data[0].ID
				} else{
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: '工装编号不存在，请重新输入！',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.form.CODE = ''
								this.autoFocus = true
							}
						}
					})
					return false
				}
			} else {
				this.$voice.error()
				this.resetFormData()
			}
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.form.TongsID) {
				this.$voice.error()
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
			const res = await BorrowTongs({
				TongsID: this.form.TongsID,
				UserName: this.form.UserName,
				remark: this.form.remark
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '工装领用失败',
					showCancel: false
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '工装领用成功',
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
					content: '工装领用失败',
					showCancel: false
				})
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			this.disabled = false
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
			this.form.UserName = this.userInfo.USER_NAME
		},
	},
	onLoad() {
		this.form.UserName = this.userInfo.USER_NAME
	}
}
