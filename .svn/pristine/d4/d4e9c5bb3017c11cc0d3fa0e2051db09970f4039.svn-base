import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import {
	GetPickingListData,
	CheckPickingByReelCode
} from '@/api/MesPartShelf.js'

export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},

	data() {
		return {
			Form: {
				WoNo: '', //工单(*)
				REELCODE: '', //物料条码
				UserName: '', //用户(*)
				Page: 1,
				Limit: 15
			},
			totalCount: 0,
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			msgContentHeight:200
		}
	},
	onLoad(e) {
		
		// this.formData.ID = e.MSTID || 0
		// this.Form.CHECK_CODE = e.EEDER || ''
		// if(this.Form.CHECK_CODE){
		// 	this.getdata()
		// } else{
		// 	this.getGetPickingListData()
		// }
		this.getGetPickingListData()
	},
	onShow(){
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(220)
			}
		})
	},
	methods: {
		async getGetPickingListData() {
			const res = await GetPickingListData(this.Form)
			if (res.Result) {
				console.log(res)
				this.list = res.Result || []
			}
		},
		async getWoNo() {
			if (!this.Form.WoNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工单',
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
			this.Form.UserName = this.userInfo.USER_NAME
			const res = await GetPickingListData(this.Form)
			if (res.Result) {
				const data = res.Result || []
				// if (this.Form.Page === 1) {
				this.list = data
				console.log(this.list)
				// } else {
				// 	this.list = this.list.concat(data)
				// }
				// this.Form.Page++
				this.totalCount = res.TotalCount
			}
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
		// 分页
		changeReason3(e) {
			this.Form.Page = e.current
			this.getWoNo()
		},
		detailClick(item) {
			console.log(item, 'item')
			uni.navigateTo({
				url: '/pages/NuclearMaterial/NuclearDetails?HID=' + item.HID + '&&QTY=' + item.QTY + '&&CHECK_QTY=' + item.CHECK_QTY
			})
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if (!this.Form.WoNo) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入工单',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.autoFocusNext = false
						}
					}
				})
				return false
			}
			if (!this.Form.REELCODE) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入物料',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = false
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await CheckPickingByReelCode(this.Form)
			if (res.Result) {
				this.Form.REELCODE = ''
				this.Form.WoNo = ''
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {}
				})
			}
			if (res.ErrorInfo.Status) {
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
		gracePage,
		uniPagination
	}
}
