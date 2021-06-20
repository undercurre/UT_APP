import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	QueryByNewFeeder,
	LoadData,
	SaveData
} from '@/api/SmtFeederReplace.js'
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
				USER_ID: '', //用户ID
				FEEDER: '',
			},
			FormSave: {
				ID: -1,
				FEEDER: ''
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
		async feederclick() {
			if (this.form.FEEDER) {
				const feeder = await LoadData(this.form)
				if (feeder.ErrorInfo.Status) {
					console.log(feeder.ErrorInfo.Status, 'feeder.ErrorInfo.Status')
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
				if (feeder.Result) {
					feeder.Result.map(item => {
						this.FormSave.ID = item.ID
					})
					// this.FormSave.ID = feeder.Result.ID
				}
			}

		},
		async submitForm() {
			if (!this.form.FEEDER) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入原条码',
					showCancel: false
				})
				return false
			}
			if (!this.FormSave.FEEDER) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入新条码',
					showCancel: false
				})
				return false
			}

			const feeder = await QueryByNewFeeder(this.FormSave.FEEDER)
			if (feeder.ErrorInfo.Status) {
				console.log(feeder.ErrorInfo.Status, 'feeder.ErrorInfo.Status')
				uni.showModal({
					title: '提示',
					content: feeder.ErrorInfo.Message,
					showCancel: false,
					success: _ => {

					}
				})
				this.FormSave.FEEDER = ''
				return false
			}

			const res = await SaveData(this.FormSave)
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
							this.FormSave.FEEDER = ''
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
		this.form.USER_ID = this.userInfo.ID
	}
}
