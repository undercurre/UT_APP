import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	Index,
	GetStencilInfo,
	LoadData,
	SaveData
} from '@/api/SmtStencilMaintain.js'
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
				STENCIL_NO: '',
				Remark: '',
				UserName: '',
				ResultStatus: ''
			},
			StatusList: [],
			statusIndex: -1,
			SCRAPER_NO: '',
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: true, // 钢网编号
			IsRun: false
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
		async getLoadScraperData() {
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
			if (!res.ErrorInfo.Status && res.Result) {
				this.form.Status = res.Result.STATUS ?
					res.Result.STATUS.toString() :
					''
				this.StatusList.map((item, index) => {
					if (item.ID.toString() === this.form.Status) {
						this.statusIndex = index
					}
				})
				this.form.Remark = res.Result.Remark || ''
				this.IsRun = res.Result.IsRun || false
				this.SCRAPER_NO = this.form.STENCIL_NO
			} else {
				this.form.STENCIL_NO = ''
				this.autoFocus = true
			}
		},
		async getIndex() {
			const res = await Index()
			this.StatusList = res.Result.StatusList
		},
		radioChange(e) {
			this.form.ResultStatus = parseInt(e.detail.value)
		},
		submitForm() {
			this.autoFocus = false
			if (!this.form.STENCIL_NO) {
				this.$voice.error()
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
				return false
			}
			if (!this.form.ResultStatus) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择维护后状态',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
						}
					}
				})
				return false
			}
			if (this.IsRun === false && this.form.ResultStatus === 2) {
				uni.showModal({
					title: '提示',
					content: '钢网没有投入使用，是否需要强制报废？',
					success: _ => {
						if (_.confirm) {
							this.saveDataApi()
						}
					}
				})
			} else {
				this.saveDataApi()
			}
		},
		async saveDataApi() {
			const form = this.form
			form.UserName = this.userInfo.USER_NAME
			const res = await SaveData(form)
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '钢网保养失败',
					showCancel: false,
					success: _ => {
			
					}
				})
				this.$voice.error()
				return false
			}
			if (res.Result.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '钢网保养成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			} else {
				uni.showModal({
					title: '提示',
					content: '钢网保养失败',
					showCancel: false,
					success: _ => {
							
					}
				})
				this.$voice.error()
			}
		}
	},
	onLoad() {
		this.getIndex()
	}
}
