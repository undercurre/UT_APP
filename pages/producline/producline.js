import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import graceSelectMenu from '../../graceUI/components/graceSelectMenu.vue';
import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
const graceChecker = require('../../graceUI/jsTools/graceChecker.js');
import {
	GetMesRouteInfo,
	GetWoInfo,
	GetMesOperationLines,
	ProducLineBegin
} from '../../api/production.js'
import {
	LoadData
} from '@/api/SfcsProductConfig'
import * as config from '../../utils/config.js'
import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	data() {
		return {
			part_no: '',
			name: '',
			formData: {
				woNo: '', //工单号 
				multNo: 0, //拼板数 
				routeId: '', //制程ID
				keepWo: false //是否续接工单
			},
			processIndex: -1,
			processlist: [],
			listIndex: -1,
			Lineolist: [],

			processArr: [],
			lineArr: [],

			stations: 0, // 为什么定义这个东西

			puzzles: 0,
			loading: false,
			checkbox: 1,

			autoFocus: false,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null
		};
	},
	onLoad() {
		this.GetMesRouteInfo()
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onHide() {
		clearTimeout(this.timer)
	},
	methods: {
		// 回车触发获取工单信息
		async sendTextMsg() {
			this.autoFocus = false
			const wo_no = this.formData.woNo
			if (!wo_no) {
				this.$voice.error()
				uni.showModal({
					title: "提示",
					content: "请输入工单号",
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const result = await GetWoInfo(wo_no)
			const data = result.Data
			if (data && result.Code === config.SUCCESS_CODE) {
				this.formData.woNo = data.WO_NO
				this.part_no = data.PART_NO
				this.name = data.MODEL
				this.getLoadData()
				// this.GetMesOperationLines()
			} else {
				uni.showModal({
					title: '提示',
					content: result.Msg || '请输入正确工单',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.formData.woNo = ''
						}
					}
				})
				this.$voice.error()
			}
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
					// this.getRouterConfigs(data[0].CONFIG_VALUE)
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
		// （废弃）
		// async GetMesOperationLines() {
		// 	const result = await GetMesOperationLines(this.formData.woNo)

		// 	const arr = []
		// 	const lineList = result.Data || []
		// 	this.lineArr = result.Data
		// 	lineList.map(item => {
		// 		arr.push(item.LINE_NAME)
		// 	})
		// 	this.Lineolist = arr
		// },
		// 选择制程
		processClick(e) {
			this.processIndex = e.detail.value;
			this.processArr.map((i, v) => {
				if (this.processIndex == v) {
					this.formData.routeId = i.ID
				}
			})
		},
		// LineoClick(e) {
		// 	if (this.formData.woNo == '') {
		// 		uni.showModal({
		// 			title: '提示',
		// 			content: '请先输入工单',
		// 			showCancel: false
		// 		})
		// 	} else {
		// 		this.listIndex = e.detail.value;
		// 		this.lineArr.map((i, v) => {
		// 			if (this.listIndex == v) {
		// 				this.formData.lineId = i.SMT_LINE_ID
		// 			}
		// 		})
		// 	}
		// },
		// 拼接数量
		handleChange(e) {
			this.puzzles = e[0];
			this.formData.multNo = this.puzzles
		},
		// 续接工单
		checkAllHelper(e) {
			this.stations = e.detail.value
			if (this.stations == 1) {
				this.stations = 1
				this.formData.keepWo = true
			} else {
				this.stations = 0
				this.formData.keepWo = false
			}
		},
		async submitForm(e) {
			const rule = [{
				name: 'woNo',
				checkType: 'notnull',
				errorMsg: '请输入工单'
			}, ]
			const checkRes = graceChecker.check(this.formData, rule)
			if (checkRes) {
				if (this.processIndex < 0) {
					uni.showModal({
						title: '提示',
						content: '请选择制程',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
				// if (this.listIndex < 0) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '请选择线别',
				// 		showCancel: false
				// 	})
				// 	this.$voice.vibrate()
				// 	return false
				// }
				if (this.formData.multNo <= 0) {
					uni.showModal({
						title: '提示',
						content: '请输入拼板数',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
				uni.showModal({
					title: '确认',
					content: '是否要提交产线开工？',
					success: async _res => {
						if (_res.confirm) {
							const result = await ProducLineBegin(this.formData)
							if (result.Code === config.SUCCESS_CODE) {
								this.$voice.success()
								uni.showModal({
									title: '提示',
									content: '提交成功',
									showCancel: false,
									success: _ => {
										if (_.confirm) {
											this.resetFormData()
										}
									}
								})
							} else {
								this.$voice.error()
								uni.showModal({
									title: '提示',
									content: result.Msg || '产线开工失败',
									showCancel: false
								})
							}
						}
					}
				})
			} else {
				uni.showModal({
					title: '提示',
					content: graceChecker.error,
					showCancel: false
				})
				this.$voice.error()
			}
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				woNo: '', //工单号
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
			this.$nextTick(_ => {
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
		handleFocus() {
			const value = this.formData.woNo
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceNumberBox,
		graceSelectMenu,
		graceCheckBtn
	}
}
