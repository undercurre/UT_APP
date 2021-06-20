import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	CheckOfflineMaterials
} from '@/api/HandPlugOfflinePreparation.js'
import {
	GetReel
} from '../../api/supplyPlaceReel.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				REEL_ID: ''
			},
			autoFocus: false,
			autoFocusNext: true,
			msgContentHeight: 200,
			msgList: []
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocusNext: false,
				msgContentHeight: this.msgContentHeight
			})
			this.$nextTick(() => {
				this.autoFocusNext = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async handleBlur() {
			this.autoFocusNext = false
			if (!this.formData.REEL_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.autoFocusNext = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入料卷',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.autoFocusNext = true
				// 		}
				// 	}
				// })
				return false
			}
			const res = await GetReel(this.formData.REEL_ID)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.formData.REEL_ID = res.Data.CODE
				this.handleSubmitForm()
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '料卷检验失败', 'error')
				this.$nextTick(() => {
					this.formData.REEL_ID = ''
					this.autoFocusNext = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: res.Msg || '料卷检验失败',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.formData.REEL_ID = ''
				// 			this.autoFocusNext = true
				// 		}
				// 	}
				// })
			}
		},
		async handleSubmitForm() {
			this.autoFocusNext = false
			if (!this.formData.REEL_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.autoFocusNext = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入料卷',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.autoFocusNext = true
				// 		}
				// 	}
				// })
				return false
			}
			const res = await CheckOfflineMaterials(this.formData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || 'DIP离线备料失败', 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: res.ErrorInfo.Message || 'DIP离线备料失败',
				// 	showCancel: false,
				// 	success: _ => {
						
				// 	}
				// })
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.resetFormData()
				// TODO 重新拉取列表
				
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, 'DIP离线备料失败', 'error')
				this.resetFormData()
				
				// uni.showModal({
				// 	title: '提示',
				// 	content: 'DIP离线备料失败',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.resetFormData()
				// 		}
				// 	}
				// })
				return false
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
	onLoad() {
		
	},
	components: {
		graceHeader,
		gracePage
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(100)
			}
		})
	}
}