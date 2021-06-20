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
				feeder: 'FT001',
				reelID: '',
				fullLocation: '',
				hiSupply: ''
			},
			autoFocus: false,
			checkFeederFlag: true,
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
		async handleCheckReel(e) {
			this.checkFeederFlag = false
			this.checkReelFlag = false
			const reelCode = e.detail.value
			this.formData.reelID = reelCode
			if (!reelCode) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.checkReelFlag = true
				})
				return false
			}
			const result = await GetReel(reelCode)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.formData.reelID = result.Data.CODE
				this.submitForm2()
			} else {
				this.$voice.error() // 提示 现在都是声音+震动
				this.handlePushMsgList(this.formData, result.Msg || '料卷检验失败', 'error')
				this.$nextTick(() => {
					this.formData.reelID = ''
					this.$nextTick(_ => {
						this.checkReelFlag = true
					})
				})
			}
		},
		async submitForm(e) {
			this.checkReelFlag = false
			this.checkFeederFlag = false
			const value = e.detail.value
			this.formData.fullLocation = value
			if (!value) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料站', 'error')
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				return false
			}
			this.$nextTick(() => {
				this.checkReelFlag = true
			})
		},
		async submitForm2(e) {
			// 表单验证
			const rule = [{
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
				const currentFullSlot = this.formData.fullLocation
				const result = await SupplyAndPlace(this.formData)
				if (result.Code === config.SUCCESS_CODE) {
					this.$voice.success()
					// TODO 记录消息
					this.handlePushMsgList(this.formData, '备料成功', 'success')
					this.resetFormData(false, async _ => {
						if (this.auto) {
							// TODO 获取下一个站点
							const res = await GetNextLocation(currentFullSlot)
							if (res.Code === config.SUCCESS_CODE) {
								this.formData.fullLocation = res.Data || ''
								this.formData.reelID = ''
								this.$nextTick(_ => {
									this.checkReelFlag = true
								})
							} else {
								this.checkFeederFlag = true
							}
						} else {
							this.checkFeederFlag = true
						}
					})
				} else {
					this.autoFocus = false
					this.checkReelFlag = false
					this.handlePushMsgList(this.formData, result.Msg || '上料失败', 'error')
					this.$nextTick(() => {
						this.checkReelFlag = true
					})
				}
			} else {
				this.handlePushMsgList(this.formData, graceChecker.error, 'error')
				this.$voice.error()
			}
		},
		resetFormData(isVibrate = false, backCall = null) {
			this.formData = {
				feeder: 'FT001',
				reelID: '',
				fullLocation: '',
				hiSupply: ''
			}
			this.autoFocus = false
			this.checkFeederFlag = false
			this.checkReelFlag = false
			this.timer = setTimeout(() => {
				if (backCall) {
					backCall(true)
				} else {
					this.checkFeederFlag = true
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
				type
			}))
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(100)
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
