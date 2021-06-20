import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	GetStencilInfo,
	LoadData,
	SaveData
} from '@/api/SmtStencilClean.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	components: {
		gracePage,
		graceHeader
	},
	data() {
		return {
			form: {
				STENCIL_NO: '',
				InspectResult: '',
				WorkNo: '',
				UserName: '',
				PrintCount: '',
				type: true
			},
			isNG: false,
			INSPECT_RESULT: [],
			netData: {},
			autoFocus: true
		}
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
				this.form.WorkNo = this.userInfo.USER_NAME
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getStencilInfo() {
			this.autoFocus = false
			if (!this.form.STENCIL_NO) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await GetStencilInfo(this.form.STENCIL_NO)
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
			if (res.Result) {
				this.netData = res.Result
				if (this.netData.UnUsed) {
					uni.showModal({
						title: '提示',
						content: '该钢网从未使用过，是否继续清洗？',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.form = {
									...this.netData,
									UserName: this.userInfo.USER_NAME,
									InspectResult: '',
									WorkNo: this.userInfo.USER_NAME,
									type: true,
									STENCIL_NO: this.form.STENCIL_NO
								}
							} else {
								this.resetFormData()
							}
						}
					})
				} else {
					this.form = {
						...this.netData,
						UserName: this.userInfo.USER_NAME,
						InspectResult: '',
						WorkNo: this.userInfo.USER_NAME,
						type: true,
						STENCIL_NO: this.form.STENCIL_NO
					}
				}
			} else {
				this.form.STENCIL_NO = ''
				this.autoFocus = true
			}
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.form.STENCIL_NO) {
				uni.showModal({
					title: '提示',
					content: '请输入钢网编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			this.form.InspectResult = this.INSPECT_RESULT.join(',')
			const formData = JSON.parse(JSON.stringify(this.form))
			delete formData.type
			delete formData.UnUsed
			delete formData.LAST_CLEAN_TIME
			formData.PrintCount = parseFloat(formData.PrintCount)
			const res = await SaveData(formData)
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '钢网清洗失败',
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
					content: '钢网清洗成功',
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
					content: '钢网清洗失败',
					showCancel: false
				})
			}
		},
		handleChangeCheckBox(e) {
			this.INSPECT_RESULT = e.detail.value
		}
	},
	onLoad() {

	},
	watch: {
		INSPECT_RESULT: {
			handler(val, oldVal) {
				if (oldVal.indexOf('OK') === -1 && val.indexOf('OK') !== -1) {
					// 原数组没有ok 新数组有 ok
					this.INSPECT_RESULT = ['OK']
				} else if (oldVal.indexOf('OK') !== -1 && val.length > 1) {
					const arr = []
					val.map(item => {
						if (item !== 'OK') arr.push(item)
					})
					this.INSPECT_RESULT = arr
				}
				this.INSPECT_RESULT = this.INSPECT_RESULT
			},
			deep: false
		},
		isNG: {
			handler(val, oldVal) {
				if (val) {
					// this.INSPECT_RESULT = ['有钢网张力异常（正常范围30-50Ncm²）']
				} else {
					this.INSPECT_RESULT = []
				}
			}
		},
		form: {
			handler(val, oldVal) {
				try {
					arr.forEach(item => {
						
						if (item > 50 || item < 30) {
							this.isNG = true
							// 抛出错误终止foreach
							throw new Error(new Date().toLocaleString())
						} else {
							this.isNG = false
						}
						if (this.form.TENSION_CONTROL_FLAG === 'Y') {
							if (item < this.form.TENSION_CONTROL_VALUE) {
								this.isNG = true
								// 抛出错误终止foreach
								throw new Error(new Date().toLocaleString())
							} else {
								this.isNG = false
							}
						}
					})
				} catch (e) {
					console.log(e.message)
				}
			},
			deep: true
		}
	}
}
