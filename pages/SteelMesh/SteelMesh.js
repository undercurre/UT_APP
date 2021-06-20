import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	GetWo,
	GetWoInfo
} from '@/api/stencil.js'
import * as config from '@/utils/config.js'
import {
	GetStenciLOC,
	TraceStencilFindPartNo
} from '@/api/SteelMesh.js'
export default {
	data() {
		return {
			formData: {
				stencil_no: '',
				wo_no: '',
				Tag: ''
			},
			netData: {},
			wo_no: '',
			autoFocus: true,
			locList: [],
			locIndex: -1,
			IS_UT:false
		}
	},
	methods: {
		async initPage() {
			const res = await GetWo()
			if (res.Code === config.SUCCESS_CODE) {
				this.wo_no = res.Data
				this.formData.wo_no = res.Data
				this.getPageData()
				this.getLOC()
			} else {
				this.netData = {
					WO_NO: ' ',
					MODEL: ' ',
					PART_NO: ' '
				}
				this.wo_no = ''
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取在线工单号失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		async getPageData() {
			const res = await GetWoInfo(this.wo_no)
			if (res.Code === config.SUCCESS_CODE) {
				this.netData = res.Data || {}
			} else {
				this.netData = {
					WO_NO: ' ',
					MODEL: ' ',
					PART_NO: ' '
				}
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg || '获取工单信息失败',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			this.netData = {
				WO_NO: ' ',
				MODEL: ' ',
				PART_NO: ' '
			}
			this.formData = {
				stencil_no: '',
				wo_no: '',
				Tag: ''
			}
			this.wo_no = ''
			this.autoFocus = false
			this.locList = []
			this.locIndex = -1
			this.$nextTick(_ => {
				this.autoFocus = true
			})
			this.initPage()
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.formData.stencil_no) {
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
			if (!this.wo_no) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '工单号信息错误'
				})
				this.$voice.error()
				return false
			}
			if(!this.IS_UT){
				if (!this.formData.Tag) {
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: '请选择位号',
						showCancel: false
					})
					return false
				}
			}

			const res = await TraceStencilFindPartNo({
				stencil_no: this.formData.stencil_no || '',
				wo_no: this.formData.wo_no || '',
				Tag: this.formData.Tag || ''
			})
			if (res.Code === config.SUCCESS_CODE) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '钢网绑定工单成功',
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
					content: res.Msg || '钢网工单绑定失败',
					showCancel: false
				})
			}
		},
		async getLOC() {
			if(this.IS_UT)return
			const res = await GetStenciLOC()
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取位号失败',
					showCancel: false
				})
				this.locList = []
				this.locIndex = -1
				return false
			}
			if (res.Result) {
				this.locList = res.Result || []
				this.locIndex = -1
			} else {
				this.locIndex = -1
				this.locList = []
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取位号失败',
					showCancel: false
				})
			}
		},
		pickLoc(e) {
			this.locIndex = parseInt(e.detail.value)
			this.formData.Tag = this.locList[this.locIndex].VALUE || ''
		}
	},
	onLoad() {
		this.initPage()
		this.IS_UT = config.IS_UT
	},
	onShow() {
		
	},
	components: {
		graceHeader,
		gracePage
	}
}