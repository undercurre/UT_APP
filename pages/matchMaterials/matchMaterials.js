import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import {
	Compare,
	GetNextLocationEx
} from '../../api/materialsReset.js'
import {
	GetReel
} from '../../api/modifyQuantity.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				feederOrReel: '',
				fullLocation: '',
				auto: false
			},
			autoFocus: false,
			currentSelection: '',
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			loading: false,
			checkFeederFlag: false,
			timer: null,
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
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
			this.currentSelection = ref
			this.selectionStart = 0
			this.selectionEnd = value ? value.toString().length : 0
		},
		handleChangeBox(e) {
			if (e.detail.value[0]) {
				this.formData.auto = true
			} else {
				this.formData.auto = false
			}
		},
		handleCheckSteepOne(e) {
			this.autoFocus = false
			this.checkFeederFlag = false
			const value = e.detail.value
			this.formData.fullLocation = value
			if (!value) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料站', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			this.$nextTick(() => {
				this.checkFeederFlag = true
			})
			
		},
		async handleCheckSteepTwo(e) {
			this.autoFocus = false
			this.checkFeederFlag = false
			const value = e.detail.value
			this.formData.feederOrReel = value
			this.$voice.vibrate()
			if (!this.formData.fullLocation) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料站', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '请输入料站',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.autoFocus = true
				// 		}
				// 	}
				// })
				return false
			}
			if (!value) {
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
			// 这里应该少了个检验料卷步骤
			const _res = await GetReel(value)
			if (_res.Code !== config.SUCCESS_CODE || !_res.Data) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, _res.Msg || '料卷错误', 'error')
				this.$nextTick(() => {
					this.formData.feederOrReel = ''
					this.$nextTick(_ => {
						this.checkFeederFlag = true
					})
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: result.Msg || '料卷错误',
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.checkFeederFlag = true
				// 			this.formData.feederOrReel = ''
				// 		}
				// 	}
				// })
				return false
			}
			this.formData.feederOrReel = _res.Data.CODE
			
			const currentFullSlot = this.formData.fullLocation
			const result = await Compare(this.formData)
			if (result.Code === config.SUCCESS_CODE) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, '对料成功', 'success')
				this.resetFormData(false, async _ => {
					// TODO 判断是否开启自动 如果开启了自动 拉取接口
					if (this.formData.auto) {
						// TODO 拉取下一个料站信息
						const res = await GetNextLocationEx(currentFullSlot)
						if (res.Code === config.SUCCESS_CODE) {
							this.formData.fullLocation = res.Data || ''
							this.formData.feederOrReel = ''
							this.$nextTick(_ => {
								this.checkFeederFlag = true
							})
						} else {
							this.autoFocus = true
						}
					} else {
						this.autoFocus = true
					}
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: '对料成功',
				// 	showCancel: false,
				// 	success: (_) => {
				// 		if (_.confirm) {
							
				// 		}
				// 	}
				// })
			} else {
				this.checkFeederFlag = false
				this.handlePushMsgList(this.formData, result.Msg || '对料失败', 'error')
				this.$nextTick(() => {
					this.checkFeederFlag = true
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: result.Msg,
				// 	showCancel: false,
				// 	success: _ => {
				// 		if (_.confirm) {
				// 			this.checkFeederFlag = true
				// 		}
				// 	}
				// })
				this.$voice.error()
			}
		},
		resetFormData(isVibrate = false, backCall = null) {
			this.formData = {
				feederOrReel: '',
				fullLocation: '',
				auto: this.formData.auto
			}
			this.autoFocus = false
			this.currentSelection = ''
			this.selection = false
			this.selectionStart = 0
			this.selectionEnd = 0
			this.checkFeederFlag = false
			this.timer = setTimeout(() => {
				if (backCall) {
					backCall(true)
				} else {
					this.autoFocus = true
				}
				clearTimeout(this.timer)
			}, 200)
			if (isVibrate) {
				this.$voice.vibrate()
				this.formData.auto = false
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
	onLoad() {
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(300)
			}
		})
		this.$nextTick(_ => {
			this.autoFocus = true
		})
	},
	onUnload() {
		clearTimeout(this.timer)
	}
}
