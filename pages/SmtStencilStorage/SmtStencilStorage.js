import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	Index,
	LoadData,
	SaveData,
	ScrapStencilStore
} from '@/api/SmtStencilStorage.js'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			form: {
				STENCIL_NO: '',
				LOCATION: '',
				MANUFACTURE_TIME: '',
				REMARK: ''
			},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: true, // 钢网编号
			autoFocusLocation: false, // 钢网储位
			autoFocusRemark: false,
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		handleChooseMakeDate(row) {
			// console.log(JSON.stringify(row))
			// if(row){
			// 	this.form.MANUFACTURE_TIME = row.detail.value 
			// }
			plus.nativeUI.pickDate(e => {
				const d = e.date
				this.form.MANUFACTURE_TIME = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
				this.autoFocusRemark = true
				this.autoFocusLocation = this.autoFocus = false
			}, function () {}, {
				title: '请选择制造日期'
			})
		},
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
			this.autoFocus = this.autoFocusLocation = this.autoFocusRemark = false
			const map = {
				"STENCIL_NO": {
					"msg": "请输入钢网编号",
					"field": "autoFocus"
				},
				"LOCATION": {
					"msg": "请输入储位",
					"field": "autoFocusLocation"
				},
				"MANUFACTURE_TIME": {
					"msg": "请选择制造日期",
					"field": null
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
								
							}
						})
						this.$voice.error()
						throw Error(map[item].msg)
					}
				})
				const form = this.form
				form.UserName = this.userInfo.USER_NAME
				const res = await SaveData(form)
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
			} catch (e) {
				
			}
		},
		baofei() {
			if (!this.form.STENCIL_NO) {
				uni.showModal({
					title: '提示',
					content: '请输入钢网编号',
					showCancel: false,
					success: _ => {
						
					}
				})
				this.$voice.error()
				return false
			}
			uni.showModal({
				title: '提示',
				content: '确定要报废吗？',
				success: async _ => {
					if (_.confirm) {
						const res = await ScrapStencilStore({
							STENCIL_NO: this.form.STENCIL_NO,
							UserName: this.userInfo.USER_NAME
						})
						console.log(JSON.stringify(res))
						if (res.ErrorInfo.Status) {
							uni.showModal({
								title: '提示',
								content: res.ErrorInfo.Message || '报废失败',
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
								content: '报废成功',
								showCancel: false,
								success: _ => {
									if (_.confirm) {
										this.resetFormData()
									}
								}
							})
							this.$voice.success()
						}
					}
				}
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		this.form.MANUFACTURE_TIME=year+"-"+month+"-"+day
	}
}