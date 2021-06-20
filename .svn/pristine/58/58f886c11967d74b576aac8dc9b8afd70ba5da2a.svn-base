import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import {
	CheckOfflineMaterials,
	LoadData
} from '@/api/OffLinePreparation.js'
import {
	CheckFeeder,
	GetReel
} from '../../api/supplyPlaceReel.js'
import * as config from '@/utils/config.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				FEED_ID: '',
				FEED_TYPE: 1,
				REEL_ID: ''
			},
			autoFocus: true,
			checkFeederFlag: false,
			list: [],
			msgContentHeight: 200,
			msgList: [],
			msgContentHeight2: 100
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
				autoFocus: false,
				msgContentHeight2: this.msgContentHeight2,
				msgContentHeight: this.msgContentHeight
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		handleChange(e) {
			this.formData.FEED_TYPE = e[0];
		},
		async handleCheckFeeder() {
			this.autoFocus = false
			if (!this.formData.FEED_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入飞达',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.autoFocus = true
				// 		}
				// 	}
				// })
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
					this.list = result.Result || []
					this.formData.FEED_TYPE = this.list.length + 1
				} else {
					this.list = []
				}
				this.checkFeederFlag = true
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '飞达检验失败', 'error')
				this.$nextTick(() => {
					this.formData.FEED_ID = ''
					this.checkFeederFlag = false
					this.autoFocus = true
					this.list = []
				})
				
				// uni.showModal({
				// 	title: '提示',
				// 	content: res.Msg || '飞达检验失败',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.formData.FEED_ID = ''
				// 			this.checkFeederFlag = false
				// 			this.autoFocus = true
				// 			this.list = []
				// 		} 
				// 	}
				// })
			}
		},
		async handleCheckReel() {
			this.checkFeederFlag = false
			if (!this.formData.REEL_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入料卷',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.checkFeederFlag = true
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
					this.checkFeederFlag = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: res.Msg || '料卷检验失败',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.formData.REEL_ID = ''
				// 			this.checkFeederFlag = true
				// 		}
				// 	}
				// })
			}
		},
		async handleSubmitForm() {
			this.autoFocus = this.checkFeederFlag = false
			if (!this.formData.FEED_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入飞达',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.autoFocus = true
				// 		}
				// 	}
				// })
				return false
			}
			if (!this.formData.FEED_TYPE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请选择位置', 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请选择位置',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
							
				// 		}
				// 	}
				// })
				return false
			}
			if (!this.formData.REEL_ID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料卷', 'error')
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入料卷',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.checkFeederFlag = true
				// 		}
				// 	}
				// })
				return false
			}
			const res = await CheckOfflineMaterials(this.formData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '离线备料失败', 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: res.ErrorInfo.Message || '离线备料失败',
				// 	showCancel: false,
				// 	success: _ => {
						
				// 	}
				// })
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.formData.FEED_TYPE += 1
				this.formData.REEL_ID = ''
				this.checkFeederFlag = true
				this.handlePushMsgList(this.formData, '离线备料成功', 'success')
				// TODO 重新拉取列表
				const result = await LoadData({
					FEED_ID: this.formData.FEED_ID,
					Page: 1,
					Limit: 10000
				})
				if (!result.ErrorInfo.Status && result.Result) {
					this.list = result.Result || []
				} else {
					this.list = []
				}
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '离线备料失败', 'error')
				// uni.showModal({
				// 	title: '提示',
				// 	content: '离线备料失败',
				// 	showCancel: false,
				// 	success: _ => {
						
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
		gracePage,
		graceHeader,
		graceNumberBox
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(680)
				this.msgContentHeight2 = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(340)
			}
		})
	}
}
