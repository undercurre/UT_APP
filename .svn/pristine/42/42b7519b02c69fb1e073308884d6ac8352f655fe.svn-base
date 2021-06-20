import graceHeader from '../../graceUI/components/graceHeader.vue'
import gracePage from '../../graceUI/components/gracePage.vue'
import {
	CloneReel,
	ConnectReel
} from '../../api/connectReel.js'
import {
	GetReel
} from '../../api/rollInfo.js'
import * as config from '../../utils/config.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			autoFocus: false,
			formData: {
				newReelID: '',
				feederReelLocation: ''
			},
			checkReelFlag: false,
			selection: false,
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			msgContentHeight: 200,
			msgList: []
		}
	},
	methods: {
		async handleCheckReel(e) {
			this.autoFocus = false
			this.checkReelFlag = false
			const reelID = e.detail.value
			this.formData.newReelID = reelID
			if (!reelID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入新料卷', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			// 先执行 料卷/料卷校验 
			const result = await GetReel(reelID)
			if (result.Code !== config.SUCCESS_CODE || !result.Data) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '料卷错误', 'error')
				this.formData.newReelID = ''
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			this.formData.newReelID = result.Data.CODE
			this.$nextTick(async _ => {
				// 复制料卷
				const _result = await CloneReel(this.formData.newReelID)
				if (_result.Code !== config.SUCCESS_CODE || _result.Data !== true) {
					this.$voice.error()
					this.handlePushMsgList(this.formData, _result.Msg, 'error')
					this.$nextTick(() => {
						this.autoFocus = true
					})
					return false
				}
				this.checkReelFlag = true
			})
			
			// 检查ReelID的合法性
			// const resultNext = await CheckReel(this.formData.newReelID)
			// if (resultNext.Code !== config.SUCCESS_CODE || resultNext.Data !== true) {
			// 	this.handlePushMsgList(this.formData, resultNext.Msg, 'error')
			// 	this.$nextTick(() => {
			// 		this.autoFocus = true
			// 		this.formData.newReelID = ''
			// 	})
			// 	// uni.showModal({
			// 	// 	title: '提示',
			// 	// 	content: resultNext.Msg,
			// 	// 	showCancel: false,
			// 	// 	success: _ => {
			// 	// 		if (_.confirm) {
			// 	// 			this.autoFocus = true
			// 	// 			this.formData.newReelID = ''
			// 	// 		}
			// 	// 	}
			// 	// })
			// 	this.$voice.error()
			// 	return false
			// }
			
		},
		async handleConnectReel(e) {
			this.autoFocus = false
			this.checkReelFlag = false
			const reelID = e.detail.value
			this.formData.feederReelLocation = reelID
			if (!reelID) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入旧料卷', 'error')
				this.$nextTick(() => {
					this.checkReelFlag = true
				})
				return false
			}
			
			const result = await GetReel(reelID)
			if (result.Code !== config.SUCCESS_CODE || !result.Data) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, result.Msg || '料卷错误', 'error')
				this.$nextTick(() => {
					this.checkReelFlag = true
					this.formData.feederReelLocation = ''
				})
				return false
			}
			this.formData.feederReelLocation = result.Data.CODE
			// this.$set(this.formData, 'feederReelLocation', result.Data.CODE)
			// 接料
			const _result = await ConnectReel(this.formData)
			if (_result.Code !== config.SUCCESS_CODE) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, _result.Msg || '接料失败', 'error')
				this.$nextTick(() => {
					this.checkReelFlag = true
				})
				return false
			}
			this.handlePushMsgList(this.formData, '接料成功', 'success')
			this.$voice.success()
			this.resetFormData()
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			if (isVibrate) this.$voice.vibrate()
			this.autoFocus = false
			this.formData = {
				newReelID: '',
				feederReelLocation: ''
			}
			this.checkReelFlag = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				clearTimeout(this.timer)
			}, 200)
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
	},
	onLoad() {
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(260)
				this.$nextTick(_ => {
					this.autoFocus = true
				})
			}
		})
	}
}
