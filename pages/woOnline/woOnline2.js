import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import * as config from '../../utils/config.js'
import {
	GetStation,
	GetWoInfo,
	DoWoOnline,
	RecordWoMultNo
} from '@/api/work.js'
import {
	GetWoList
} from '@/api/ProductLineMaterial/StartJob.js'
export default {
	data() {
		return {
			wo_no: '',
			list: [], // 机台
			checkedList: [], // 机台已选
			MBlist: ['板面', '板底'],
			MBlistIndex: -1,
			isXujie: false,
			isAll: false,
			pingBan_num: 1,
			workInfo: {
				PART_NO: ' ',
				MODEL: ' '
			}, // 工单信息
			autoFocus: false,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			woList: [],
			woIndex: -1,
			wo_code: '',
			autoFocus_2: false
		};
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
			this.wo_no = this.woList[this.woIndex] ? this.woList[this.woIndex].CODE : '';
			if (this.wo_no) {
				this.checkWorkInfo()
			}
		},
		pickerMB(e) {
			this.MBlistIndex = parseInt(e.detail.value)
		},
		checkIsXujie(e) {
			this.isXujie = e[0]
		},
		async checkIsAll(e) {
			this.isAll = e[0]
			if (e[0]) {
				this.checkedList = []
				this.list.map(item => {
					this.checkedList.push(item.SMT_NAME)
				})
			} else {
				this.checkedList = []
			}
		},
		handleChange(e) {
			this.pingBan_num = e[0];
		},
		handleCheckBox(id) {
			const index = this.checkedList.indexOf(id)
			if (index === -1) {
				this.checkedList.push(id)
			} else {
				this.checkedList.splice(index, 1)
			}
			if (this.checkedList.length === this.list.length) {
				this.isAll = true
			} else {
				this.isAll = false
			}
		},
		// 检查工单号是否正确
		async checkWorkInfo(e) {
			this.autoFocus = false
			this.autoFocus_2 = false
			const wo_no = this.wo_no
			this.wo_no = wo_no
			if (!wo_no) {
				this.$voice.error()
				this.$nextTick(() => {
					if (!this.wo_code) {
						this.autoFocus_2 = true
					}
				})
				return false
			}
			const result = await GetWoInfo(wo_no)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.workInfo = result.Data
				this.$voice.success()
			} else {
				uni.showModal({
					title: '提示',
					content: result.Msg || '工单号错误',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.wo_no = ''
							this.woIndex = -1
							this.$nextTick(() => {
								if (!this.wo_code) {
									this.autoFocus_2 = true
								}
							})
						}
					}
				})
				this.$voice.error()
			}
		},
		// 获取机台
		async getStationList() {
			const lineList = this.$store.getters.lineList
			const currentLine = this.$store.getters.currentLine
			const lineId = lineList[currentLine].SMT_LINE_ID
			const result = await GetStation(lineId)
			if (result.Code === config.SUCCESS_CODE) {
				this.list = result.Data
			} else {
				uni.showModal({
					title: '提示',
					content: JSON.stringify(result.Msg),
					showCancel: false
				})
				this.$voice.error()
				this.list = []
			}
		},
		async submitForm() {
			if (!this.workInfo.WO_NO) {
				uni.showModal({
					title: '提示',
					content: '请先扫描工单并通过工单号验证',
					showCancel: false
				})
				this.$voice.vibrate()
				return false
			}
			if (!this.MBlistIndex < 0) {
				uni.showModal({
					title: '提示',
					content: '请选择面板',
					showCancel: false
				})
				this.$voice.vibrate()
				return false
			}
			if (this.pingBan_num < 0) {
				uni.showModal({
					title: '提示',
					content: '请输入拼板数',
					showCancel: false
				})
				this.$voice.vibrate()
				return false
			}
			if (this.checkedList.length === 0) {
				uni.showModal({
					title: '提示',
					content: '请选择机台',
					showCancel: false
				})
				this.$voice.vibrate()
				return false
			}
			const formData = {
				stations: this.checkedList,
				wo: this.workInfo.WO_NO,
				multNo: this.pingBan_num
			}
			const result = await DoWoOnline({
				stations: this.checkedList,
				wo: this.workInfo.WO_NO,
				multNo: this.pingBan_num,
				pcb_side: this.MBlistIndex + 1,
				continueWo: this.isXujie
			})
			if (result.Code !== config.SUCCESS_CODE) {
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			const resultNext = await RecordWoMultNo(formData)
			if (resultNext.Code === config.SUCCESS_CODE) {
				uni.showModal({
					title: '提示',
					content: '工单上线成功',
					showCancel: false,
					success: (_) => {
						if (_.confirm) {
							this.resetData()
						}
					}
				})
				this.$voice.success()
			} else {
				uni.showModal({
					title: '提示',
					content: resultNext.Msg,
					showCancel: false
				})
				this.$voice.error()
			}
		},
		resetData(isVibrate = false) {
			this.workInfo = {
				PART_NO: ' ',
				MODEL: ' '
			}
			this.autoFocus = false
			this.checkedList = []
			this.MBlistIndex = -1
			this.isXujie = false
			this.isAll = false
			this.pingBan_num = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				clearTimeout(this.timer)
			}, 200)
			this.wo_no = ''
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
			const value = this.wo_no
			this.selectionStart = this.selectionEnd = 0;
			this.autoFocus = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				this.selection = true
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0;
				clearTimeout(this.timer)
			}, 200)
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceCheckBtn,
		graceNumberBox
	},
	onLoad() {
		
	},
	async onShow() {
		await this.getStationList()
		this.$nextTick(() => {
			this.autoFocus = true
		})
	},
	onUnload() {
		clearTimeout(this.timer)
	}
};
