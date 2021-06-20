import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	LoadData,
	SaveData
} from '@/api/SmtFeederScrap.js'
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
			form: {
				FEEDER: '',//飞达编号
				SCRAP_REASON: '', // 报废原因
				UserName: '' //用户
			},
			autoFocus: true,
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		radioChange(e) {
			this.form.MAINTAIN_KIND = parseInt(e.detail.value)
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
		async submitForm() {
			if (!this.form.FEEDER) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入料架编号',
					showCancel: false
				})
				return false
			}
			if (!this.form.SCRAP_REASON) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入报废原因',
					showCancel: false
				})
				return false
			}

			const feeder = await LoadData(this.form.FEEDER)
			if (feeder.ErrorInfo.Status) {
				console.log(feeder.ErrorInfo.Status,'feeder.ErrorInfo.Status')
				uni.showModal({
					title: '提示',
					content: feeder.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
			
					}
				})
				this.form.FEEDER = ''
				return false
			}
			this.form.UserName = this.userInfo.USER_NAME
			const res = await SaveData(this.form)
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '保存失败',
					showCancel: false,
					success: _ => {
                    
					}
				})
				this.$voice.error()
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '保存成功',
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
					content: '保存失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {

						}
					}
				})
			}

		},
	},
	onLoad() {
		
	}
}
