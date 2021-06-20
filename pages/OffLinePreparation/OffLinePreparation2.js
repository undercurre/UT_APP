import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import {
	CheckOfflineMaterialsEx,
	LoadData
} from '@/api/OffLinePreparation.js'
import {
	CheckFeeder,
	GetReel
} from '@/api/supplyPlaceReel.js'
import * as config from '@/utils/config.js'
import {
	GetStation
} from '@/api/work.js'
import dayjs from 'dayjs'
import {
	mapGetters
} from 'vuex'
import {
	GetWoList
} from '@/api/ProductLineMaterial/StartJob.js'
import {
	OfflineUnloading
} from '@/api/OfflineDischarge.js'
import {
	GetReplacePn
} from '@/api/work.js'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	data() {
		return {
			formData: {
				WO_NO: "",
				PCB_Side: 1,
				StationID: "",
				Stage: 2,
				SLOT: "",
				FEED_ID: '',
				FEED_TYPE: 1,
				REEL_ID: ''
			},
			autoFocus: false,
			checkSolt: false,
			checkFEED_ID: false,
			checkFeederFlag: false,
			StageList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			msgContentHeight: 200,
			msgList: [],
			stationList: [],
			stationIndex: -1,
			MBlist: ['', '板面', '板底'],
			subsection: [{name: '基础配置'}, {name: '备料配置'}],
			subsectionIndex: 0,
			wo_code: '',
			woList: [],
			woIndex: -1,
			autoFocus_2: false
		}
	},
	methods: {
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
		handleChooseWo(e) {
			this.woIndex = e.detail.value
			this.formData.WO_NO = this.woList[this.woIndex] ? this.woList[this.woIndex].CODE : '';
			this.handleScanWoNo()
		},
		async GetStation() {
			const lineId = this.lineList[this.currentLine].SMT_LINE_ID
			const res = await GetStation(lineId)
			if (res.Code === config.SUCCESS_CODE) {
				this.stationList = res.Data || []
				this.stationIndex = 0
				this.formData.StationID = this.stationList[this.stationIndex] ? this.stationList[this.stationIndex].ID : 0
			} else {
				this.stationList = []
				this.stationIndex = 0
				this.formData.StationID = 0
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '获取机台失败', 'error')
			}
		},
		handleChangeStation(e) {
			this.stationIndex = e.detail.value
			this.formData.StationID = this.stationList[this.stationIndex] ? this.stationList[this.stationIndex].ID : 0
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			if (this.subsectionIndex === 0) {
				this.formData.WO_NO = ''
				this.formData.PCB_Side = 1
				this.stationIndex = 0
				this.formData.StationID = this.stationList[this.stationIndex] ? this.stationList[this.stationIndex].ID : 0;
				this.formData.Stage = 2
				this.wo_code = ''
				this.woIndex = -1
			} else if (this.subsectionIndex === 1) {
				this.formData.SLOT = ''
				this.formData.FEED_ID = ''
				this.formData.FEED_TYPE = 1
				this.formData.REEL_ID = ''
			}
			this.$nextTick(() => {
				if (this.subsectionIndex === 0) {
					this.autoFocus = true
				} else {
					this.checkSolt = true
				}
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		handleChangePCB_Side(e) {
			this.$set(this.formData, 'PCB_Side', e.detail.value)
		},
		handleChangeStage(e) {
			this.$set(this.formData, 'Stage', e.detail.value)
		},
		handleChange(e) { // 改变飞达位置
			this.formData.FEED_TYPE = e[0];
		},
		async handleCheckFeeder() {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			if (!this.formData.FEED_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.checkFEED_ID = true
				})
				return false
			}
			const res = await CheckFeeder(this.formData.FEED_ID)
			if (res.Code === config.SUCCESS_CODE) {
				this.$voice.success()
				// TODO 带出飞达的列表信息
				const result = await LoadData({
					FEED_ID: this.formData.FEED_ID,
					Page: 1,
					Limit: 10000
				})
				if (!result.ErrorInfo.Status && result.Result) {
					const list = result.Result || []
					this.formData.FEED_TYPE = list.length + 1
				} else {
					this.formData.FEED_TYPE = 1
				}
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '飞达检验失败', 'error')
				this.formData.FEED_ID = ''
				this.checkFeederFlag = false
				this.$nextTick(() => {
					this.checkFEED_ID = true
				})
				this.formData.FEED_TYPE = 1
			}
		},
		async handleCheckReel() {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			if (!this.formData.REEL_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				return false
			}
			const res = await GetReel(this.formData.REEL_ID)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.formData.REEL_ID = res.Data.CODE
				this.handleSubmitForm()
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '料卷检验失败', 'error')
				this.formData.REEL_ID = ''
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
			}
		},
		async handleSubmitForm() {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			if (!this.formData.WO_NO) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.PCB_Side) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择板面', 'error')
				return false
			}
			if (!this.formData.StationID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择机台', 'error')
				return false
			}
			if (!this.formData.Stage && this.formData.Stage !== 0) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择模组', 'error')
				return false
			}
			if (!this.formData.SLOT) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料槽', 'error')
				this.$nextTick(() => {
					this.checkSolt = true
				})
				return false
			}
			if (!this.formData.FEED_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.checkFEED_ID = true
				})
				return false
			}
			if (!this.formData.FEED_TYPE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择位置', 'error')
				return false
			}
			if (!this.formData.REEL_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				return false
			}
			const res = await CheckOfflineMaterialsEx(this.formData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '离线备料失败', 'error')
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.formData.SLOT = ''
				this.formData.FEED_ID = ''
				this.formData.REEL_ID = ''
				this.autoFocus = false
				this.checkSolt = false
				this.checkFEED_ID = false
				this.checkFeederFlag = false
				this.handlePushMsgList(this.formData, '离线备料成功', 'success')
				this.$nextTick(() => {
					this.checkSolt = true
				})
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '离线备料失败', 'error')
				return false
			}
		},
		async handleScanWoNo() {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			this.autoFocus_2 = false
			if (!this.formData.WO_NO) {
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocus_2 = true
				})
				return false
			}
			const res = await GetReplacePn(this.formData.WO_NO)
			if (res.Code !== config.SUCCESS_CODE) {
				this.handlePushMsgList(this.formData, '请输入正确的工单号', 'error')
				this.$voice.error()
				this.formData.WO_NO = ''
				this.woIndex = -1
				this.$nextTick(() => {
					if (this.wo_code) {
						
					} else {
						this.autoFocus_2 = true
					}
				})
			}
		},
		handleScanSlot() {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			this.$nextTick(() => {
				this.checkFEED_ID = true
			})
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		handleChangeSubsection(e) {
			this.subsectionIndex = e
			this.autoFocus = false
			this.checkSolt = false
			if (e === 0) {
				this.$nextTick(() => {
					this.autoFocus = true
				})
			} else {
				this.$nextTick(() => {
					this.checkSolt = true
				})
			}
		},
		/**
		 * 离线卸料功能
		 * 要求清空料槽、飞达、位置、料卷
		 */
		async clearFeederLot() {
			this.autoFocus = false
			this.checkSolt = false
			this.checkFEED_ID = false
			this.checkFeederFlag = false
			if (!this.formData.FEED_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.checkFEED_ID = true
				})
				return false
			}
			const res = await CheckFeeder(this.formData.FEED_ID)
			if (res.Code === config.SUCCESS_CODE) {
				const _res = await OfflineUnloading(this.formData.FEED_ID)
				if (_res.ErrorInfo.Status) {
					this.$voice.error()
					this.handlePushMsgList(this.formData, _res.ErrorInfo.Message || '离线卸料失败', 'error')
					this.formData.FEED_ID = ''
					this.$nextTick(() => {
						this.checkFEED_ID = true
					})
					return false
				}
				if (_res.Result) {
					this.$voice.success()
					this.handlePushMsgList(this.formData, '飞达卸料成功', 'success')
					this.resetFormData()
				} else {
					this.$voice.error()
					this.handlePushMsgList(this.formData, '飞达卸料成功', 'error')
					this.formData.FEED_ID = ''
					this.$nextTick(() => {
						this.checkFEED_ID = true
					})
					return false
				}
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '飞达检验失败', 'error')
				this.formData.FEED_ID = ''
				this.$nextTick(() => {
					this.checkFEED_ID = true
				})
			}
		}
	},
	onShow() {
		
	},
	onLoad() {
		this.GetStation()
	},
	components: {
		gracePage,
		graceHeader,
		graceNumberBox
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(760)
			}
		})
		this.$nextTick(_ => {
			this.autoFocus = true
		})
	}
}
