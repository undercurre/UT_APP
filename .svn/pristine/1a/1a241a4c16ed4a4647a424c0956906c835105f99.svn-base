import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import * as config from '@/utils/config.js'
import {
	mapGetters
} from 'vuex'
import {
	GetMesRouteInfo,
	GetWoInfo
} from '@/api/production'
import {
	GetReplacePn
} from '@/api/work.js'
import dayjs from 'dayjs'
import {
	LoadRouteConfig,
	ProducLineBegin,
	Index,
	GetWoList,
	ProducLineBeginCopy
} from '@/api/ProductLineMaterial/StartJob.js'
// const defaultProcessId = 2854896
const defaultProcessId = 0
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine',
			'token'
		])
	},
	data() {
		return {
			processlist: [],
			processIndex: -1,
			formData: {
				woNo: '',
				multNo: 1,
				TARGET_QTY: 1
			},
			part_no: '',
			order_no: '',
			name: '',
			netData: {},
			autoFocus: false,
			currentActive: 0,
			msgContentHeight: 200,
			msgList: [],
			routeConfigList: [],
			CurrentOperationList: [],
			CurrentOperationListMap: {},
			wo_code: '',
			woList: [],
			woIndex: -1,
			autoFocus_2: false,
			dataList: [],
			checkedList: [],
			currentRow: -1
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		checkAllHelper(e) {
			this.formData.keepWo = e.detail.value[0] ? true : false
		},
		// 获取制程信息
		async GetMesRouteInfo() {
			const result = await GetMesRouteInfo()
			if (result.Code === config.SUCCESS_CODE) {
				const arr = []
				const lineList = result.Data || []
				this.processArr = result.Data
				lineList.map(item => {
					arr.push(item.ROUTE_NAME)
				})
				this.processlist = arr
				this.processArr.map((i, v) => {
					if (i.ID == defaultProcessId) {
						this.formData.routeId = i.ID
						this.processIndex = v
						this.getRouterConfigs(i.ID)
					}
				})
			}
		},
		async handleSearchWoCode() {
			const wo_code = this.wo_code
			this.autoFocus = false
			if (!wo_code) {
				this.currentActive = 1
				this.handlePushMsgList(this.formData, '请输入出库单号', 'error')
				this.$voice.error()
				return false
			}
			const res = await GetWoList(wo_code)
			this.woList = res.Result || []
			this.woIndex = -1
			this.$voice.success()
		},
		// 回车触发获取工单信息
		async sendTextMsg() {
			this.autoFocus_2 = false
			const wo_no = this.formData.woNo
			if (!wo_no) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.currentActive = 1
				this.$nextTick(_ => {
					if (!this.wo_code) {
						this.autoFocus_2 = true
					}
				})
				return false
			}
			const res = await GetWoInfo(wo_no)
			const data = res.Data
			console.log(data)
			if (res.Code === config.SUCCESS_CODE && data) {
				this.netData = data
				this.formData.woNo = data.WO_NO
				this.part_no = data.PART_NO
				this.name = data.MODEL
				this.order_no = data.ORDER_NO
				this.formData.TARGET_QTY = data.TARGET_QTY || 0
				this.formData.MaxTAGET_QTY = data.TARGET_QTY || 0
				await GetReplacePn(wo_no)
			} else {
				this.$voice.error()
				this.formData.woNo = ''
				this.woIndex = -1
				this.handlePushMsgList(this.formData, res.Msg || '请输入正确工单', 'error')
				this.currentActive = 1
				this.$nextTick(_ => {
					if (!this.wo_code) {
						this.autoFocus_2 = true
					}
				})
			}
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		// 选择制程
		processClick(e) {
			this.processIndex = e.detail.value;
			this.processArr.map((i, v) => {
				if (this.processIndex == v) {
					this.formData.routeId = i.ID
					this.getRouterConfigs(i.ID)
				}
			})
		},
		handleChooseWo(e) {
			this.woIndex = e.detail.value
			this.formData.woNo = this.woList[this.woIndex] ? this.woList[this.woIndex].CODE : '';
			if (this.formData.woNo) {
				this.sendTextMsg()
			}
		},
		// 根据routeId来获取制程详情
		async getRouterConfigs(routeId) {
			if (!routeId) {
				return false
			}
			const res = await LoadRouteConfig(routeId)
			if (res.ErrorInfo.Status) {
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '获取制程详情失败', 'error')
				this.$voice.error()
				this.currentActive = 1
				return false
			}
			this.routeConfigList = res.Result || []
			this.routeConfigList.map(i => {
				i.CURRENT_DESC = this.CurrentOperationListMap[i.CURRENT_OPERATION_ID] || ''
			})
			this.currentActive = 2
			this.$voice.success()
		},
		handleChangeSub(index) {
			this.currentActive = index
		},
		submitForm() {
			this.autoFocus = false
			if (!this.formData.woNo) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.currentActive = 1
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.routeId) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择制程', 'error')
				this.currentActive = 1
				return false
			}
			// TODO 检查工单是否已存在
			let flag = false
			let flagIndex = -1
			this.dataList.map((i, k) => {
				if (i.woNo === this.formData.woNo) {
					flag = true
					flagIndex = k
				}
			})
			if (flag) {
				uni.showModal({
					title: '提示',
					content: '工单：' + this.formData.woNo + '已存在，是否覆盖？',
					success: _ => {
						if (_.confirm) {
							this.submitFormPush(flagIndex)
						}
					}
				})
				return false
			} else {
				this.submitFormPush()
			}
			
			// const res = await ProducLineBegin({
			// 	woNo: this.formData.woNo,
			// 	lineId: this.lineList[this.currentLine].SMT_LINE_ID,
			// 	user: this.token,
			// 	multNo: this.formData.multNo,
			// 	routeId: this.formData.routeId,
			// 	TARGET_QTY: this.formData.TARGET_QTY,
			// 	keepWo: this.formData.keepWo
			// })
			// if (res.ErrorInfo.Status) {
			// 	this.$voice.error()
			// 	this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '操作失败', 'error')
			// 	this.currentActive = 1
			// 	return false
			// }
			// if (res.Result) {
			// 	this.$voice.success()
			// 	this.handlePushMsgList(this.formData, '开工成功', 'success')
			// 	this.currentActive = 1
			// } else {
			// 	this.$voice.error()
			// 	this.handlePushMsgList(this.formData, '操作失败', 'error')
			// 	this.currentActive = 1
			// }
		},
		submitFormPush(flagIndex) {

			if (flagIndex > -1) {
				this.dataList[flagIndex] = {
					woNo: this.formData.woNo,
					partNo: this.part_no,
					name: this.name,
					lineId: this.lineList[this.currentLine].SMT_LINE_ID,
					user: this.token,
					multNo: this.formData.multNo,
					routeId: this.formData.routeId,
					TARGET_QTY: this.formData.TARGET_QTY,
					keepWo: this.formData.keepWo,
					processIndex: this.processIndex || 0,
					routeConfigList: this.routeConfigList || [],
					woList: this.woList || [],
					woIndex: this.woIndex || 0,
					wo_code: this.wo_code || '',
					ORDER_NO:this.order_no
				}
			} else {
				this.dataList.push({
					woNo: this.formData.woNo,
					partNo: this.part_no,
					name: this.name,
					lineId: this.lineList[this.currentLine].SMT_LINE_ID,
					user: this.token,
					multNo: this.formData.multNo,
					routeId: this.formData.routeId,
					TARGET_QTY: this.formData.TARGET_QTY,
					keepWo: this.formData.keepWo??false,
					processIndex: this.processIndex || 0,
					routeConfigList: this.routeConfigList || [],
					woList: this.woList || [],
					woIndex: this.woIndex || 0,
					wo_code: this.wo_code || '',
					ORDER_NO:this.order_no
				})
			}
			this.$voice.success()
			this.handlePushMsgList(this.formData, '已选工单：' + this.formData.woNo, 'success')
			this.formData = {
				woNo: '', //工单号
				lineId: '', //线体ID
				multNo: 1, //拼板数 
				routeId: '', //制程ID
				TARGET_QTY: 1,
				MaxTAGET_QTY:0,//最大数量
				keepWo: false //是否续接工单
			}
			this.part_no = ''
			this.name = ''
			this.processIndex = -1
			this.routeConfigList = []
			this.autoFocus_2 = false
			this.autoFocus = false
			this.currentRow = -1
			this.checkedList = this.dataList.map(i => i.woNo)
			this.currentActive = 0
			if (this.wo_code) {
				this.woIndex = -1
			} else {
				this.$nextTick(_ => {
					this.autoFocus_2 = true
				})
			}
		},
		// 批量提交
		handleSubmitData() {
			if (!this.dataList.length) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择工单', 'error')
				this.currentActive = 1
				return false
			}
			uni.showModal({
				title: '提示',
				content: "已选工单数：" + this.checkedList.length + "\r\n确定要提交？",
				success: async _ => {
					if (_.confirm) {
						const res = await ProducLineBeginCopy({
							ProductionList:this.dataList.filter(i => {
							if (i.woNo && this.checkedList.indexOf(i.woNo) !== -1) {
								delete i.routeConfigList
								delete i.woList
								return i
							} else {
								return false
							}}),
							keepWo:false})
						if (res.ErrorInfo.Status) {
							this.$voice.error()
							this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '提交失败', 'error')
							this.currentActive = 1
							return false
						}
						if (res.Result) {
							this.$voice.success()
							this.currentActive = 1
							this.handlePushMsgList(this.formData, '提交成功', 'success')
							this.resetFormData()
						} else {
							this.$voice.error()
							this.currentActive = 1
							this.handlePushMsgList(this.formData, '提交失败', 'error')
						}
					}
				}
			})
		},
		handleChangeCheckBox(e, item, index) {
			const val = e.detail.value[0]
			if (val) { // 选中
				this.checkedList.push(val)
			} else { // 反选
				this.checkedList.splice(this.checkedList.indexOf(item.woNo), 1)
			}
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				woNo: '', //工单号
				lineId: '', //线体ID
				multNo: 1, //拼板数 
				routeId: '', //制程ID
				TARGET_QTY: 1,
				keepWo: false //是否续接工单
			}
			this.autoFocus = false
			this.autoFocus_2 = false
			this.part_no = ''
			this.puzzles = 0
			this.name = ''
			this.processIndex = -1
			this.listIndex = -1
			this.stations = 0
			this.routeConfigList = []
			this.currentActive = 0
			this.woList = []
			this.woIndex = -1
			this.wo_code = ''
			this.currentRow = -1
			this.checkedList = []
			this.dataList = []
			this.$nextTick(_ => {
				this.autoFocus = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getZhiChengList() {
			const res = await Index()
			if (res.Result) {
				const {
					CurrentOperationList
				} = res.Result
				this.CurrentOperationList = CurrentOperationList || []
				this.CurrentOperationListMap = {}
				this.CurrentOperationList.map(i => {
					this.CurrentOperationListMap[i.ID] = i.DESCRIPTION
				})
			} else {
				this.CurrentOperationList = []
				this.CurrentOperationListMap = {}
			}
		},
		// 拼接数量
		handleChange(e) {
			this.formData.multNo = e[0]
		},
		handleChangeQty(e) {
			this.formData.TARGET_QTY = e[0]
		},
		handleClickTr(item, index) {
			this.currentRow = index
			this.formData = {
				woNo: item.woNo,
				lineId: item.lineId,
				multNo: item.multNo || 1,
				routeId: item.routeId || '',
				TARGET_QTY: item.TARGET_QTY || 1,
				keepWo: item.keepWo || false
			}
			this.part_no = item.partNo || ''
			this.name = item.name || ''
			this.processIndex = item.processIndex
			this.routeConfigList = item.routeConfigList || []
			this.woList = item.woList || []
			this.woIndex = item.woIndex
			this.wo_code = item.wo_code || ''
		}
	},
	onLoad() {
		this.GetMesRouteInfo()
		this.getZhiChengList()
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(390)
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		})
	},
	onUnload() {

	},
	onHide() {

	},
	components: {
		graceHeader,
		gracePage,
		graceNumberBox
	}
}
