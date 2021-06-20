import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	LoadData,
	SaveData
} from '@/api/SmtStencilCollaruse.js'
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
		gracePage,
		graceHeader
	},
	data() {
		return {
			form: {
				STENCIL_NO: '', // 刮刀号
				WorkNo: '', // 领用者工号
				UserName: '',
				PrintCount: '',
				TENSION_A: '',
				TENSION_B: '',
				TENSION_C: '',
				TENSION_D: '',
				TENSION_E: '',
				InspectResult: ''
			},
			INSPECT_RESULT: [],
			isNG: true,
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: true, // 钢网编号
            IS_UT:false
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
			this.IS_UT = config.IS_UT
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
			const res = await LoadData({
				stencil_no: this.form.STENCIL_NO
			})
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
				const data = res.Result
				this.form.PrintCount = data.PrintCount
				// this.form.TENSION_A = data.TENSION_A
				// this.form.TENSION_B = data.TENSION_B
				// this.form.TENSION_C = data.TENSION_C
				// this.form.TENSION_D = data.TENSION_D
				// this.form.TENSION_E = data.TENSION_E
				this.form.TENSION_A = 35
				this.form.TENSION_B = 35
				this.form.TENSION_C = 35
				this.form.TENSION_D = 35
				this.form.TENSION_E = 35
				this.form.TENSION_CONTROL_FLAG = data.TENSION_CONTROL_FLAG
				this.form.TENSION_CONTROL_VALUE = data.TENSION_CONTROL_VALUE
			} else {
				this.form.STENCIL_NO = ''
				this.autoFocus = true
			}
		},
		handleChangeCheckBox(e) {
			this.INSPECT_RESULT = e.detail.value
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
			this.form.TENSION_A = this.form.TENSION_A ?
				parseInt(this.form.TENSION_A) :
				''
			this.form.TENSION_B = this.form.TENSION_B ?
				parseInt(this.form.TENSION_B) :
				''
			this.form.TENSION_C = this.form.TENSION_C ?
				parseInt(this.form.TENSION_C) :
				''
			this.form.TENSION_D = this.form.TENSION_D ?
				parseInt(this.form.TENSION_D) :
				''
			this.form.TENSION_E = this.form.TENSION_E ?
				parseInt(this.form.TENSION_E) :
				''
			const res = await SaveData({
				STENCIL_NO: this.form.STENCIL_NO,
				InspectResult: this.form.InspectResult,
				WorkNo: this.form.WorkNo || this.userInfo.USER_NAME,
				UserName: this.form.UserName,
				PrintCount: this.form.PrintCount,
				TENSION_A: this.form.TENSION_A,
				TENSION_B: this.form.TENSION_B,
				TENSION_C: this.form.TENSION_C,
				TENSION_D: this.form.TENSION_D,
				TENSION_E: this.form.TENSION_E
			})
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '领用失败',
					showCancel: false,
					success: _ => {

					}
				})
				this.$voice.error()
				return false
			}
			if (res.Result) {
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
				this.$voice.success()
			} else {
				uni.showModal({
					title: '提示',
					content: '领用失败',
					showCancel: false,
					success: _ => {
				
					}
				})
				this.$voice.error()
			}
		}
	},
	onLoad() {
		this.IS_UT = config.IS_UT
		this.form.WorkNo = this.userInfo.USER_NAME
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
					this.INSPECT_RESULT = ['有钢网张力异常（正常范围30-50Ncm²）']
				} else {
					this.INSPECT_RESULT = []
				}
			}
		},
		form: {
			handler(val, oldVal) {
				const {
					TENSION_A,
					TENSION_B,
					TENSION_C,
					TENSION_D,
					TENSION_E
				} = this.form
				let max = TENSION_A
				let min = TENSION_A
				const arr = [TENSION_A, TENSION_B, TENSION_C, TENSION_D, TENSION_E]
				try {
					arr.forEach(item => {
						if (item > max) {
							max = item
						}
						if (item < min) {
							min = item
						}
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
					if (max - min > 10) {
						this.isNG = true
					}
				} catch (e) {
					console.log(e.message)
				}
			},
			deep: true
		}
	}
}
