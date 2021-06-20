import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	FormatBarcode,
	TakeOff
} from '../../api/takeOff.js'
import * as config from '../../utils/config.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			focusFlag: true,
			formData: {
				feederOrReel: '',
				endReel: false
			},
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			msgContentHeight: 200,
			msgList: []
		}
	},
	methods: {
		handleFocus() {
			const value = this.formData.feederOrReel
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
			this.selectionStart = 0
			this.selectionEnd = value ? value.toString().length : 0
		},
		handleChangeBox(e) {
			if (e.detail.value.length > 0) {
				this.formData.endReel = true
			} else {
				this.formData.endReel = false
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async handleBlur(e) {
			this.focusFlag = false
			const barcode = e.detail.value
			if (!barcode) return false
			const result = await FormatBarcode(barcode)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.formData.feederOrReel = result.Data
			} else {
				this.handlePushMsgList(this.formData, result.Msg, 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: result.Msg,
				// 	showCancel: false
				// })
				this.selection = true
				this.$voice.error()
				this.focusFlag = false
				this.timer = setTimeout(() => {
					this.focusFlag = true
					clearTimeout(this.timer)
				})
				return false
			}
			const _result = await TakeOff(this.formData)
			if (_result.Code === config.SUCCESS_CODE) {
				this.resetFormData()
				this.handlePushMsgList(this.formData, '卸料成功', 'success')
				// uni.showModal({
				// 	title: '提示',
				// 	content: '卸料成功',
				// 	showCancel: false,
				// 	success: (_) => {
				// 		if (_.confirm) {
				// 			this.resetFormData()
				// 		}
				// 	}
				// })
				// TODO 播放成功的声音
				this.$voice.success()
			} else {
				this.handlePushMsgList(this.formData, _result.Msg, 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: _result.Msg,
				// 	showCancel: false
				// })
				// TODO 播放失败的声音
				this.selection = true
				this.$voice.error()
				this.focusFlag = false
				this.timer = setTimeout(() => {
					this.focusFlag = true
					clearTimeout(this.timer)
				})
			}
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				feederOrReel: '',
				endReel: false
			}
			this.focusFlag = false
			this.timer = setTimeout(() => {
				this.focusFlag = true
				clearTimeout(this.timer)
			}, 200)
			if (isVibrate) {
				this.$voice.vibrate()
			}
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
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200)
			}
		})
	},
	onUnload() {
		clearTimeout(this.timer)
	}
}
