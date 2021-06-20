import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	mapGetters
} from 'vuex'
import {
	GetStation
} from '@/api/work.js'
import {
	GetWo,
	GetWoInfo
} from '@/api/stencil.js'
import {
	GetSMTWoInfo
} from '@/api/ProductionInformation.js'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	data() {
		return {
			netData: {},
			stationList: [],
			stationIndex: 0,
			wo_no: '',
			netDataNext: {},
			MBlist: ['板面', '板底']
		}
	},
	methods: {
		async GetStation() {
			const lineId = this.lineList[this.currentLine].SMT_LINE_ID
			const res = await GetStation(lineId)
			if (res.Code === config.SUCCESS_CODE) {
				this.stationList = res.Data || []
				this.stationIndex = 0
				this.GetSMTWoInfo()
			} else {
				this.stationList = []
				this.stationIndex = 0
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取机台失败',
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
		async initPage() {
			const res = await GetWo()
			if (res.Code === config.SUCCESS_CODE) {
				this.wo_no = res.Data
				this.getPageData()
			} else {
				this.netData = {}
				this.wo_no = ''
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取在线工单号失败',
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
		async getPageData() {
			const res = await GetWoInfo(this.wo_no)
			if (res.Code === config.SUCCESS_CODE) {
				this.netData = res.Data || {}
			} else {
				this.netData = {}
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg || '获取工单信息失败',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async GetSMTWoInfo() {
			const lineId = this.lineList[this.currentLine].SMT_LINE_ID || 0
			const stationId = this.stationList[this.stationIndex].ID || 0
			if (!lineId || !stationId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '缺少参数',
					showCancel: false
				})
				return false
			}
			const res = await GetSMTWoInfo({
				lineID: lineId,
				stationID: stationId
			})
			if (res.Code === config.SUCCESS_CODE) {
				this.netDataNext = res.Data || {}
				let index = this.netDataNext.PCB_SIDE
				if (index == 1) {
					this.netDataNext.PCB_SIDE = '板底'
				} else if (index == 0) {
					this.netDataNext.PCB_SIDE = '板面'
				}
			} else {
				this.netDataNext = {}
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取工单机台信息失败',
					showCancel: false,
					success: _ => {
						
					}
				})
			}
		},
		handleChangeStation(e) {
			this.stationIndex = e.detail.value
			this.GetSMTWoInfo()
		}
	},
	onLoad() {
		this.GetStation()
		this.initPage()
	},
	onShow() {
		
	},
	components: {
		graceHeader,
		gracePage
	}
}