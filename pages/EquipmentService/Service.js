import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	AuditEquipmentValidationData,
	SavePDAEquipmentValidationData,
	LoadPDAEquipmentValidationInfo,
	QueryPDAEquipmentValidationBy
} from '@/api/SfcsEquipment.js'
export default {
	computed: {
		isfilter() {
			return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		},
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},

	data() {
		return {
			Form: {
				CHECK_USER: '', //点检人员（必传）
				CHECK_REMARKS: '', // 备注
				EQUIPMENT_BODYMARK: '', //设备编号 （必传）
				EQUIPMENT_MAINTAIN_ID: 0 //设备保养记录ID
			},
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			totalCount: 0,
			formData: {
				ID: 0, // 表ID
				STATUS: 1, // 审核状态 1：确认 2：审核
				AUDIT_USER: '', // 审核人员
				AUDIT_REMARKS: '', //审核备注
			},
		}
	},
	onLoad(e) {
		this.formData.ID = e.MSTID || 0
		this.Form.EQUIPMENT_MAINTAIN_ID = e.MSTID || 0
		if (e.MSTID) {
			this.Form.CHECK_CODE = e.CHECK_CODE || ''
			// this.Form.EQUIPMENT_BODYMARK = e.CHECK_CODE
			this.getdata(e.CHECK_CODE)
		} else {
			this.getLoadPDAFeederCheckInfo()
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getLoadPDAFeederCheckInfo() {
			const res = await LoadPDAEquipmentValidationInfo({
				CHECK_USER: this.userInfo.USER_NAME
			})
			if (res.Result) {
				this.list = res.Result || []
				this.hid = this.list[0].VDID
			}
		},
		async getFeida() {
			if (!this.Form.EQUIPMENT_BODYMARK) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入设备编号回车',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.autoFocus = false

			// const res = await QueryPDAEquipmentValidationBy({
			// 	check_code: this.Form.EQUIPMENT_BODYMARK, //设备验证编号
			// 	hid: this.hid
			// })
			// if(res.Result){
			this.getdata()
			// }
			// if (res.ErrorInfo.Status) {
			// 	this.$voice.error()
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: res.ErrorInfo.Message,
			// 		showCancel: false,
			// 		success: _ => {}
			// 	})
			// 	return false
			// }
		},
		async getdata(e) {
			var obj = {
				CHECK_USER: this.userInfo.USER_NAME,
				CHECK_REMARKS: this.Form.CHECK_REMARKS,
				CHECK_CODE: e || '',
				EQUIPMENT_MAINTAIN_ID: this.Form.EQUIPMENT_MAINTAIN_ID || 0,
				EQUIPMENT_BODYMARK: this.Form.EQUIPMENT_BODYMARK || '' //设备编号 （必传）
			}
			this.Form.CHECK_USER = this.userInfo.USER_NAME
			this.autoFocus = false
			const res = await SavePDAEquipmentValidationData(obj)
			this.list = res.Result || []
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}
		},
		async submitForm() {
			if (!this.formData.ID) {
				// this.list.map(v => {
					this.formData.ID = this.list[0].VDID || 0
				// })
			}
			if(this.formData.ID === 0){
				if (!this.Form.EQUIPMENT_BODYMARK) {
					this.$voice.error()
					this.autoFocus = false
					uni.showModal({
						title: '提示',
						content: '请输入设备编号回车',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoFocus = true
							}
						}
					})
					return false
				}
			}
			
			this.formData.AUDIT_REMARKS = this.Form.CHECK_REMARKS
			this.formData.AUDIT_USER = this.userInfo.USER_NAME
			this.formData.ID = Number(this.formData.ID)
			const res = await AuditEquipmentValidationData(this.formData)
			if (res.Result) {
				this.Form = {}
				this.StorageIndex = -1
				// this.Form.CHECK_REMARKS = ''
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {
						this.Form = {}
						this.Storage = ''
					}
				})
			}
			if (res.ErrorInfo.Status) {
				this.NewsInfo = res.ErrorInfo.Message
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		},

	},

	components: {
		graceHeader,
		gracePage
	},
	onShow() {

	},
	onPullDownRefresh() {

	},
	onReachBottom() {

	}
}
