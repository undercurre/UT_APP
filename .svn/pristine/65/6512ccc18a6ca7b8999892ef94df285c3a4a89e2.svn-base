import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	Index,
	QueryByNewFeeder,
	SaveData
} from '@/api/SmtFeederMaintain.js'
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
				MAINTAIN_KIND: '', // 维护类型(已保养、已校正、已保养+校正 分别对应数字1,2,3):
				FEEDER_ID: '', // 料架编号
				DESCRIPTION: '', //描述
				MAINTAIN_BY: '' //维护人对应用户名
			},
			autoFocus: true,
			zhichengList: [],
			zhichengIndex: -1,
			disabled: true
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
			this.form.MAINTAIN_KIND = ''
		},
		async submitForm() {
			if (!this.form.MAINTAIN_KIND) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择维护类型',
					showCancel: false
				})
				return false
			}
			if (!this.form.FEEDER_ID) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入料架编号',
					showCancel: false
				})
				return false
			}
			this.form.MAINTAIN_BY = this.userInfo.USER_NAME
			const feeder = await QueryByNewFeeder(this.form.FEEDER_ID)
			if (feeder.ErrorInfo.Status) {
				console.log(feeder.ErrorInfo.Status,'feeder.ErrorInfo.Status')
				uni.showModal({
					title: '提示',
					content: feeder.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
			
					}
				})
				this.form.FEEDER_ID = ''
				return false
			}
			if (feeder.Result) {
				this.form.FEEDER_ID = feeder.Result.ID
			}
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
							this.form.MAINTAIN_KIND = ''
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
