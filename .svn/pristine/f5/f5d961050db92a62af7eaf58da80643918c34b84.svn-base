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
	GetWoList
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
			autoFocus_2: false
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
				this.currentActive = 0
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
				this.currentActive = 0
				this.$nextTick(_ => {
					if (!this.wo_code) {
						this.autoFocus_2 = true
					}
				})
				return false
			}
			const res = await GetWoInfo(wo_no)
			const data = res.Data
			if (res.Code === config.SUCCESS_CODE && data) {
				this.netData = data
				this.formData.woNo = data.WO_NO
				this.part_no = data.PART_NO
				this.name = data.MODEL
				this.formData.TARGET_QTY = data.TARGET_QTY || 1
				await GetReplacePn(wo_no)
			} else {
				this.$voice.error()
				this.formData.woNo = ''
				this.woIndex = -1
				this.handlePushMsgList(this.formData, res.Msg || '请输入正确工单', 'error')
				this.currentActive = 0
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
				this.currentActive = 0
				return false
			}
			this.routeConfigList = res.Result || []
			this.routeConfigList.map(i => {
				i.CURRENT_DESC = this.CurrentOperationListMap[i.CURRENT_OPERATION_ID] || ''
			})
			this.currentActive = 1
			this.$voice.success()
		},
		handleChangeSub(index) {
			this.currentActive = index
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.formData.woNo) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.currentActive = 0
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.routeId) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择制程', 'error')
				this.currentActive = 0
				return false
			}
			const res = await ProducLineBegin({
				woNo: this.formData.woNo,
				lineId: this.lineList[this.currentLine].SMT_LINE_ID,
				user: this.token,
				multNo: this.formData.multNo,
				routeId: this.formData.routeId,
				TARGET_QTY: this.formData.TARGET_QTY,
				keepWo: this.formData.keepWo
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '操作失败', 'error')
				this.currentActive = 0
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, '开工成功', 'success')
				this.currentActive = 0
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '操作失败', 'error')
				this.currentActive = 0
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
				const { CurrentOperationList } = res.Result
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
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(450)
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