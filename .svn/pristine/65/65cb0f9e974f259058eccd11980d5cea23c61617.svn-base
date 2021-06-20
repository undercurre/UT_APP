import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	GetMesRouteInfo,
	// GetWoInfo
} from '@/api/production'
import {
	LoadRouteConfig,
	Index
} from '@/api/ProductLineMaterial/StartJob.js'
// import {
// 	Sites
// } from '@/api/CollectProducts.js'
import * as config from '@/utils/config.js'
import dayjs from 'dayjs'
import {
	TUOperationSave,
	LoadDataEX
} from '@/api/MakeUpPass.js'
import {
	mapGetters
} from 'vuex'
export default {
	name: 'MakeUpPass',
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	data() {
		return {
			part_no: '',
			formData: {
				woNo: '',
				routeId: '',
				sn: ''
			},
			processIndex: 0,
			processlist: [],
			processArr: [],
			autoFocus: false,
			currentActive: 0,
			msgContentHeight: 200,
			msgList: [],
			routeConfigList: [],
			CurrentOperationList: [],
			CurrentOperationListMap: {},
			snFocus: false,
			siteList: [],
			siteIndex: 0,
			disNoChooseRoute: false
		};
	},
	async onLoad() {
		await this.getZhiChengList()
		await this.GetMesRouteInfo()
		// await this.getSite()
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(290)

				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		})
	},
	methods: {
		async getSite() {
			const res = await Sites({
				OPERATION_LINE_ID: this.lineList[this.currentLine].SMT_LINE_ID
			})
			if (!res.ErrorInfo.Status && res.Result) {
				let data = res.Result || '[]'
				this.siteIndex = 0
				this.siteList = JSON.parse(data) || []
			} else {
				this.siteList = []
				this.siteIndex = 0
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
		handleChangeSub(index) {
			this.currentActive = index
		},
		// 回车触发获取工单信息
		async sendTextMsg() {
			this.autoFocus = false
			this.snFocus = false
			const wo_no = this.formData.woNo
			if (!wo_no) {
				this.$voice.error()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const result = await LoadDataEX({
				WO_NO: wo_no
			})
			if (result.ErrorInfo.Status) {
				this.$voice.error()
				this.currentActive = 0
				this.formData.woNo = ''
				this.part_no = ''
				this.formData.routeId = ''
				this.disNoChooseRoute = false
				this.handlePushMsgList(this.formData, result.ErrorInfo.Message || '获取工单信息失败', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			if (result.Result && result.Result.length) {
				const data = result.Result[0] || {}
				this.formData.woNo = data.WO_NO
				this.part_no = data.PART_NO || ''
				this.formData.routeId = data.ROUTE_ID || 0
				if (this.formData.routeId) {
					this.disNoChooseRoute = true
					this.processArr.map((v, k) => {
						if (v.ID === this.formData.routeId) {
							this.processIndex = k
						}
					})
					this.getRouterConfigs(this.formData.routeId)
				} else {
					this.disNoChooseRoute = false
				}
				this.$voice.success()
				this.$nextTick(() => {
					this.snFocus = true
				})
			} else {
				this.$voice.error()
				this.currentActive = 0
				this.formData.woNo = ''
				this.part_no = ''
				this.formData.routeId = ''
				this.disNoChooseRoute = false
				this.handlePushMsgList(this.formData, '获取工单信息失败', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
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
				this.processIndex = 0
				this.processlist = arr
				this.formData.routeId = this.processArr[0].ID
				// TODO 获取制程详情
				this.getRouterConfigs(this.formData.routeId)
			} else {
				this.formData.routeId = 0
				this.processlist = []
				this.processIndex = 0
				this.processArr = []
			}
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
			// this.$voice.success()
		},
		resetFormData(isVibrate = false) {
			this.part_no = ''
			this.formData = {
				woNo: '',
				routeId: '',
				sn: ''
			}
			this.processIndex = 0
			this.autoFocus = false
			this.currentActive = 1
			this.snFocus = false
			this.siteIndex = 0
			this.disNoChooseRoute = false
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		async handleSubmitForm() {
			this.autoFocus = false
			this.snFocus = false
			if (!this.formData.woNo) {
				this.$voice.error()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, '请输入工单', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.routeId) {
				this.$voice.error()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, '请选择制程', 'error')
				return false
			}
			
			if (!this.formData.sn) {
				this.$voice.error()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, '请输入SN', 'error')
				this.$nextTick(() => {
					this.snFocus = true
				})
				return false
			}
			const res = await TUOperationSave({
				ROUTE_ID: this.formData.routeId,
				WO_NO: this.formData.woNo,
				SN: this.formData.sn
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '提交失败', 'error')
				this.$nextTick(() => {
					this.snFocus = true
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, '提交成功', 'success')
				this.formData.sn = ''
				this.$nextTick(() => {
					this.snFocus = true
				})
			} else {
				this.$voice.error()
				this.currentActive = 0
				this.handlePushMsgList(this.formData, '提交失败', 'error')
				this.$nextTick(() => {
					this.snFocus = true
				})
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	}
}
