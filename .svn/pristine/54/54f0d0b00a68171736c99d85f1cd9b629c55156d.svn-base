import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	ChangeLocationSave,
	ChangeLocationLoadData
} from '@/api/SmtStencilChange.js'
import {
	mapState
} from 'vuex'
export default {
	data() {
		return {
			form: {
				STENCIL_NO: '',
				LOCATION: '',
				NewLocation: '',
				UserName: ''
			},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: true, // 钢网编号
			autoFocusLocation: false, // 旧储位
			autoFocusNewLocation: false // 新储位
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.currentSelection = ref
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		},
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
		async submitForm() {
			this.autoFocus = this.autoFocusLocation = this.autoFocusNewLocation = false
			const map = {
				"STENCIL_NO": {
					"msg": "请输入钢网编号",
					"field": "autoFocus"
				},
				"NewLocation": {
					"msg": "请输入新储位",
					"field": "autoFocusNewLocation"
				}
			}
			try {
				Object.keys(map).forEach(item => {
					if (!this.form[item]) {
						uni.showModal({
							title: '提示',
							content: map[item].msg || '',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this[map[item].field] = true
								}
							}
						})
						this.$voice.errro()
						throw Error(map[item].msg)
					}
				})
				const res = await ChangeLocationSave({
					STENCIL_NO: this.form.STENCIL_NO,
					NewLocation: this.form.NewLocation,
					UserName: this.userInfo.USER_NAME
				})
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
				}
			} catch (e) {

			}
		},
		async getLoadScraperData() {
			this.autoFocus = false
			if (!this.form.STENCIL_NO) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await ChangeLocationLoadData(this.form.STENCIL_NO)
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取钢网信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.STENCIL_NO = ''
						}
					}
				})
				this.$voice.error()
				return false
			}
			if (!res.ErrorInfo.Status && res.Result) {
				this.form.LOCATION = res.Result
				this.autoFocusNewLocation = true
			} else {
				this.form.STENCIL_NO = ''
				this.autoFocus = true
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {

	}
}
