import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	ReturnLoadData,
	ReturnSaveData
} from '@/api/SmtStencilReturn.js'
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
				STENCIL_NO: '',
				LOCATION: '',
				WorkNo: '',
				UserName:''
			},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: true, // 钢网编号
			autoFocusLocation: false,
			autoFocusWorkNo: false
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
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getLoadData() {
			this.autoFocus = false
			if (!this.form.STENCIL_NO) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await ReturnLoadData(this.form.STENCIL_NO)
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
				this.form.WorkNo = this.form.UserName = this.userInfo.USER_NAME
			} else {
				this.form.STENCIL_NO = ''
				this.autoFocus = true
			}
		},
		async submitForm() {
			this.autoFocus = this.autoFocusLocation = this.autoFocusWorkNo = false
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
			if (!this.form.LOCATION) {
				uni.showModal({
					title: '提示',
					content: '请输入归还储位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusLocation = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			if (!this.form.WorkNo) {
				uni.showModal({
					title: '提示',
					content: '请输入归还者',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusWorkNo = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			const res = await ReturnSaveData({
				STENCIL_NO: this.form.STENCIL_NO,
				LOCATION: this.form.LOCATION,
				WorkNo: this.form.WorkNo,
				UserName: this.form.WorkNo
			})
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '归还失败',
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
					content: '归还成功',
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
					content: '归还失败',
					showCancel: false,
					success: _ => {
				
					}
				})
				this.$voice.error()
			}
		}
	},
	onLoad() {
		this.form.WorkNo=this.userInfo.USER_NAME
	}
}
