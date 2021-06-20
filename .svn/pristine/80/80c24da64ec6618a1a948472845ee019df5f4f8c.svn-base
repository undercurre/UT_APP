import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import { mapState } from 'vuex'
import {
	ConfirmPDAFeederCheckData,
	SavePDAFeederCheckData,
	AuditFeederCheckData,
	LoadPDAFeederCheckInfo
} from '@/api/SmtFeeder.js'
export default {
	computed: {
		// isfilter() {
		// 	return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		// },
		...mapState({
				userInfo: state => state.user.userInfo
			})
	},
	
	data() {
		return {
			Form: {
				CHECK_CODE: '',// 飞达点检编号(新增不传)
				FEEDER_BODYMARK	: '', //飞达编号（必传）
				CHECK_USER: '', //点检人员（必传）
				CHECK_REMARKS: '',// 点检备注
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
			}
		 }
	},
	onLoad(e) {
		console.log(e,'eee MSTID')
		this.formData.ID = e.MSTID || 0
		this.Form.CHECK_CODE = e.EEDER || ''
		if(this.Form.CHECK_CODE){
			console.log('11111')
			this.getdata()
		} else{
			this.getLoadPDAFeederCheckInfo()
		}
	},
	methods: {
		async getLoadPDAFeederCheckInfo () {
			const res = await LoadPDAFeederCheckInfo(this.userInfo.USER_NAME)
			if (res.Result) {
				this.list = res.Result || []
			}
		},
		getFeida() {
			if (!this.Form.FEEDER_BODYMARK) {
			 	this.$voice.error()
			 	uni.showModal({
			 		title: '提示',
			 		content: '请输入飞达编号',
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
			this.getdata()
			
		},
		// 飞达回车
		 async getdata() {
			 this.Form.CHECK_USER = this.userInfo.USER_NAME
			this.autoFocus = false
		 	const res = await SavePDAFeederCheckData(this.Form)
			if (res.Result) {
				this.list = res.Result || []
				console.log(this.list)
			}
		 	if (res.ErrorInfo.Status) {
				// this.list = []
		 		this.$voice.error()
		 		uni.showModal({
		 			title: '提示',
		 			content: res.ErrorInfo.Message,
		 			showCancel: false,
		 			success: _ => {
		 			}
		 		})
		 		return false
		 	}

		 },
		 detailClick(item){
			 var MST = ''
			 if(item.ID){
				  MST = item.ID
			 } else {
				  MST = ''
			 }
			 uni.navigateTo({
			 	url: '/pages/FeidaInventory/recording?KEEP_HEAD_ID='+MST
			 })
		 },
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if(!this.formData.ID){
				this.list.map(v=>{
					this.formData.ID = v.KEEP_HEAD_ID
				})
			}
			if (this.formData.ID === 0) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入飞达编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}

			console.log(this.formData.ID, 'this.formData.ID')
			this.formData.AUDIT_REMARKS = this.Form.CHECK_REMARKS
			this.formData.AUDIT_USER = this.userInfo.USER_NAME
			const res = await AuditFeederCheckData(this.formData)
			if (res.Result) {
				this.formData.ID =  0
				this.Form.FEEDER_BODYMARK = ''
				this.Form.CHECK_REMARKS = ''
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {
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