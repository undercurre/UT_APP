import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	Sites,
	CollectData,
	GetKanbanWoData,
	PostToUncodedReport,
	ClearUncodedReport
} from '@/api/CollectProducts.js'

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
			// 保存站点
			SiteFrom: {
				SiteId: '', // 站点ID
				WO_NO: '', // 工单号
				CapacityReportQty: '', // 报工数量
				DefectReportQty: '', // 不良数量
				DEFECT_CODE: '',// 不良代码
				UserName: ''
			},
			NewsInfo: '',
			statusBarHeight: 0,
			checkStatusIndex: 0,
			statusList: [
				{
					ID: '2',
					SBU_CHINESE: '消息区'
				},
			],
			collectList: [],
			autoFocus: true,
			zhichengList: [],
			zhichengIndex: -1,
			LINEID: ''
		}
	},
	onLoad() {
		// currentLine
		console.log(this.$store.state.system)
		var lineBox = this.$store.state.system.lineList
		lineBox.map((v, i) => {
			// console.log(v,'VVV',i,'iiii')
			if (this.$store.state.system.currentLine === i) {
				this.LINEID = v.SMT_LINE_ID
				this.getwo()
				this.getSites()
			}
		})
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

		this.SiteFrom.UserName = this.userInfo.USER_NAME
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 获取工单信息
		async getwo() {
			const res = await GetKanbanWoData({
				lineId: this.LINEID
			})
			const data = JSON.parse(res.Result)
			console.log(data, 'datadata')
			if (data.length !== 0) {
				this.SiteFrom.WO_NO = data[0].WO_NO
				console.log(res, 'res')
			} else {
				uni.showModal({
					title: '提示',
					content: res.Msg || '请先开工单',
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
		async getSites() {
			console.log(this.LINEID, 'this.LINEID')
			var obj = {
				OPERATION_LINE_ID: this.LINEID,
				Page: 1,
				Limit: 1000000
			}
			const res = await Sites(obj)
			const data = JSON.parse(res.Result)
			this.zhichengList = data || []
		},
		handleChangeZhiCheng(e) {
			this.zhichengIndex = e.detail.value
			this.SiteFrom.SiteId = this.zhichengList[this.zhichengIndex].ID || ''
		},
		async RevokeFormData() {

		},
		// 撤销、提交
		async submitForm(row) {
			if (!this.SiteFrom.SiteId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择工位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.SiteFrom.CapacityReportQty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入产能数据',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.SiteFrom.DefectReportQty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入不良数据',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.SiteFrom.DEFECT_CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入不良代码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if(row === 1) {
				var res = await ClearUncodedReport(this.SiteFrom)
			} else {
				var res = await PostToUncodedReport(this.SiteFrom)
			}
			
			if (res.Result) {
				// console.log(res.Result, 'res.Result')
				var tit = ''
				if(row === 1) {
					tit = '撤销成功'
				} else {
					tit = '提交成功'
				}
				uni.showModal({
					title: '提示',
					content: tit,
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
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
		handleChangeStatus(index) {
			this.checkStatusIndex = index
		},
		resetFormData(isVibrate = false) {
			this.zhichengIndex = -1
			this.NewsInfo = ''
			this.SiteFrom.CapacityReportQty = ''
			this.SiteFrom.DefectReportQty = ''
			this.SiteFrom.DEFECT_CODE = ''
			this.collectList = []
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		}
	}
}
