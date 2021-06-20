import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
const graceChecker = require('../../graceUI/jsTools/graceChecker.js');
import {
	CheckFeeder,
	GetReel,
	SupplyAndPlace
} from '../../api/supplyPlaceReel.js'
import {
	GetNextLocation
} from '../../api/materialsReset.js' // 自动获取下一个站点
import * as config from '../../utils/config.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				feeder: '',
				reelID: '',
				fullLocation: '',
				hiSupply: ''
			},
			autoFocus: true,
			checkFeederFlag: false,
			checkReelFlag: false,
			selection: false,
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			loadingLocation: 0,
			timer: null,
			auto: false,
			msgContentHeight: 200,
			msgList: []
		}
	},
	methods: {
		handleChangeBox(e) {
			if (e.detail.value[0]) {
				this.auto = true
			} else {
				this.auto = false
			}
		},
		async handleCheckFeeder(e) {
			this.autoFocus = false
			const feeder = e.detail.value
			if (!feeder) {
				this.$voice.error()
				this.handlePushMsgList(this.FormData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			this.loadingLocation = 0
			const result = await CheckFeeder(feeder)
			if (result.Code === config.SUCCESS_CODE) {
				this.autoFocus = false
				this.checkFeederFlag = true
			} else {
				this.$voice.error()
				this.autoFocus = false
				this.handlePushMsgList(this.FormData, result.Msg || '飞达检验失败', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
					this.selection = true
					this.formData.feeder = ''
					this.currentSelection = 'feeder'
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: result.Msg ? result.Msg : '飞达检验失败',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.autoFocus = true
				// 			this.selection = true
				// 			this.formData.feeder = ''
				// 			this.currentSelection = 'feeder'
				// 		}
				// 	}
				// })
			}
		},
		async handleCheckReel(e) {
			const reelCode = e.detail.value
			if (!reelCode) return false
			this.loadingLocation = 1
			const result = await GetReel(reelCode)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.autoFocus = false
				this.checkFeederFlag = false
				this.formData.reelID = result.Data.CODE
				if (this.auto && this.formData.fullLocation) {
					this.submitForm()
				} else {
					this.timer = setTimeout(() => {
						this.checkReelFlag = true
						clearTimeout(this.timer)
					})
				}
			} else {
				this.checkFeederFlag = false
				this.$voice.error() // 提示 现在都是声音+震动
				this.handlePushMsgList(this.FormData, result.Msg || '料卷检验失败', 'error')
				this.$nextTick(() => {
					this.selection = true
					this.checkFeederFlag = true
					this.currentSelection = 'reelID'
					this.formData.reelID = ''
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: result.Msg ? result.Msg : '料卷检验失败',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.selection = true
				// 			this.checkFeederFlag = true
				// 			this.currentSelection = 'reelID'
				// 			this.formData.reelID = ''
				// 		}
				// 	}
				// })
			}
		},
		async submitForm(e) {
			// 表单验证
			const rule = [{
				name: 'feeder',
				checkType: 'notnull',
				errorMsg: '请输入飞达'
			}, {
				name: 'reelID',
				checkType: 'notnull',
				errorMsg: '请输入料卷'
			}, {
				name: 'fullLocation',
				checkType: 'notnull',
				errorMsg: '请输入料站'
			}]
			const checkRes = graceChecker.check(this.formData, rule)
			if (checkRes) {
				const result = await SupplyAndPlace(this.formData)
				const currentFullSlot = this.formData.fullLocation
				if (result.Code === config.SUCCESS_CODE) {
					this.$voice.success()
					// TODO 记录消息
					this.handlePushMsgList(this.formData, '上料成功', 'success')
					this.resetFormData(false, async _ => {
						if (this.auto) {
							// TODO 获取下一个站点
							const res = await GetNextLocation(currentFullSlot)
							if (res.Code === config.SUCCESS_CODE) {
								this.formData.fullLocation = res.Data || ''
								this.autoFocus = false
								this.$nextTick(_ => {
									this.autoFocus = true
								})
							}
						}
					})
				} else {
					this.$voice.error()
					this.autoFocus = false
					this.checkFeederFlag = false
					this.handlePushMsgList(this.FormData, result.Msg || '上料失败', 'error')
					this.$nextTick(() => {
						this.checkReelFlag = true
					})
					// uni.showModal({
					// 	title: '提示',
					// 	content: result.Msg,
					// 	showCancel: false,
					// 	success: _ => {
					// 		if (_.confirm) {
					// 			this.checkReelFlag = true
					// 		}
					// 	}
					// })
				}
			} else {
				this.handlePushMsgList(this.FormData, graceChecker.error, 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: graceChecker.error,
				// 	showCancel: false
				// })
				this.$voice.error()
			}
		},
		resetFormData(isVibrate = false, backCall = null) {
			this.formData = {
				feeder: '',
				reelID: '',
				fullLocation: '',
				hiSupply: ''
			}
			this.autoFocus = false
			this.checkFeederFlag = false
			this.checkReelFlag = false

			this.timer = setTimeout(() => {
				this.autoFocus = true
				if (backCall) {
					backCall(true)
				}
				clearTimeout(this.timer)
			}, 200)
			if (isVibrate) this.$voice.vibrate()
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
			this.currentSelection = ref
			this.selectionStart = 0
			this.selectionEnd = value ? value.toString().length : 0
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {

	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(180)
			}
		})
	},
	watch: {
		formData: {
			handler(val, oldVal) {
				this.selection = false
			},
			deep: true
		}
	},
	onUnload() {
		clearTimeout(this.timer)
	}
}
