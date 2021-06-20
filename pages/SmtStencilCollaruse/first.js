import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	LoadDataPDA,
	WoNoLoadData,
	getSmtWoByNo
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
	data() {
		return {
			listQuery1: {
				USER_ID: '',
				PartNo: '',
				Page: 1,
				Limit: 10,
				Key: ''
			},
			listQuery2: {
				WO_NO: '',
				PART_NO: '',
				MODEL1: '',
				DESCRIPTION: '',
				Page: 1,
				Limit: 10,
				Key: ''
			},
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			totalCount: 0
		}
	},
	methods: {
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
		async getSmtStencilConfig() {
			this.autoFocusNext = false
			if (!this.listQuery1.PartNo) {
				this.$voice.error()
				this.$nextTick(_ => {
					this.autoFocusNext = true
				})
				return false
			}
			this.listQuery1.USER_ID = this.userInfo.ID
			const res = await LoadDataPDA(this.listQuery1)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '查询产品编号失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.list = res.Result || []
				this.totalCount = res.TotalCount || 0
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '查询产品编号失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
		async getSmtWo() {
			this.autoFocus = false
			if (!this.listQuery2.WO_NO) {
				this.$voice.error()
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			const res = await getSmtWoByNo({
				wo_no: this.listQuery2.WO_NO || ''
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '查询工单号失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				const data = res.Result
				const PART_NO = data.PART_NO
				this.listQuery1.PartNo = PART_NO
				this.getSmtStencilConfig()
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '查询工单号失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
		submitForm() {
			uni.navigateTo({
				url: '/pages/SmtStencilCollaruse/index'
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	}
}