import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	mapGetters
} from 'vuex'
import {
	GetMesRouteInfo,
	GetWoInfo
} from '@/api/production'
import dayjs from 'dayjs'
import {
	LoadRouteConfig,
	ProducLineBegin,
	Index
} from '@/api/ProductLineMaterial/StartJob.js'
import {
	LoadData
} from '@/api/SfcsProductConfig'
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
				woNo: ''
			},
			// config.IS_HTL ? 'WORK' :
			part_no: '',
			name: '',
			netData: {},
			autoFocus: false,
			currentActive: 0,
			msgContentHeight: 200,
			msgList: [],
			routeConfigList: [],
			CurrentOperationList: [],
			CurrentOperationListMap: {}
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
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
			}
		},
		// 回车触发获取工单信息
		async sendTextMsg() {
			this.autoFocus = false
			const wo_no = this.formData.woNo
			if (!wo_no) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.currentActive = 0
				this.$nextTick(_ => {
					this.autoFocus = true
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
				this.getLoadData()
			} else {
				this.$voice.error()
				this.formData.woNo = ''
				this.handlePushMsgList(this.formData, res.Msg || '请输入正确工单', 'error')
				this.currentActive = 0
				this.$nextTick(_ => {
					this.autoFocus = true
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
		// 获取制程
		async getLoadData(){
			var obj = {
				PART_NO: this.part_no, 
				CONFIG_TYPE: 147
			}
			const res = await LoadData(obj)
			if (res.Result) {
				var data = res.Result || []
				if(data.length !== 0){
					this.formData.routeId = Number(data[0].CONFIG_VALUE)
					this.getRouterConfigs(data[0].CONFIG_VALUE)
					this.processArr.map((item, index) => {
						if (item.ID === this.formData.routeId) {
							this.processIndex = index
						}
					})
				} else{
					this.processIndex = -1
					this.formData.routeId = ''
				}
				
			}
			console.log(res, 'resres')
		},
		// 选择制程
		processClick(e) {
			this.processIndex = e.detail.value;
			console.log(this.processIndex,'this.processIndex')
			this.processArr.map((i, v) => {
				if (this.processIndex == v) {
					this.formData.routeId = i.ID
					this.getRouterConfigs(i.ID)
				}
			})
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
				multNo: 0,
				routeId: this.formData.routeId,
				keepWo: true
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
				woNo: '', //工单号 config.IS_HTL ? 'WORK' : 
				lineId: '', //线体ID
				multNo: 0, //拼板数 
				routeId: '', //制程ID
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
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(280)
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
		gracePage
	}
}