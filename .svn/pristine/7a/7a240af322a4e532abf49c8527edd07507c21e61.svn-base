import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import dayjs from 'dayjs'
import {
	ConnectReelByQty
} from '@/api/ProductLineChaLiao.js'
import {
	GetReel
} from '../../api/rollInfo.js'
export default {
	data() {
		return {
			autoFocus: true,
			formData: {
				newReelID: '',
				feederReelLocation: ''
			},
			checkReelFlag: false,
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
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		resetFormData(isVibrate = false) {
			if (isVibrate) this.$voice.vibrate()
			this.autoFocus = false
			this.formData = {
				newReelID: '',
				feederReelLocation: ''
			}
			this.checkReelFlag = false
			this.$nextTick(_ => {
				this.autoFocus = true
			})
		},
		async handleCheckReel() {
			this.autoFocus = false
			this.checkReelFlag = false
			if (!this.formData.newReelID) {
				this.handlePushMsgList(this.formData, '请输入新料卷', 'error')
				this.$voice.error()
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			const res = await GetReel(this.formData.newReelID)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.formData.newReelID = res.Data.CODE
				this.checkReelFlag = true
			} else {
				this.handlePushMsgList(this.formData, res.Msg || '解析料卷条码失败', 'error')
				this.$voice.error()
				this.formData.newReelID = ''
				this.$nextTick(_ => {
					this.autoFocus = true
				})
			}
		},
		async handleConnectReel() {
			this.autoFocus = false
			this.checkReelFlag = false
			if (!this.formData.feederReelLocation) {
				this.handlePushMsgList(this.formData, '请输入旧料卷', 'error')
				this.$voice.error()
				this.$nextTick(_ => {
					this.checkReelFlag = true
				})
				return false
			}
			const res = await GetReel(this.formData.feederReelLocation)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.formData.feederReelLocation = res.Data.CODE
				this.handlerSubmitForm()
			} else {
				this.handlePushMsgList(this.formData, res.Msg || '解析料卷条码失败', 'error')
				this.$voice.error()
				this.formData.feederReelLocation = ''
				this.$nextTick(_ => {
					this.checkReelFlag = true
				})
			}
		},
		async handlerSubmitForm() {
			this.autoFocus = false
			this.checkReelFlag = false
			if (!this.formData.newReelID) {
				this.handlePushMsgList(this.formData, '请输入新料卷', 'error')
				this.$voice.error()
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.feederReelLocation) {
				this.handlePushMsgList(this.formData, '请输入旧料卷', 'error')
				this.$voice.error()
				this.$nextTick(_ => {
					this.checkReelFlag = true
				})
				return false
			}
			const res = await ConnectReelByQty(this.formData)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, 'SMT插料成功', 'success')
				this.resetFormData()
			} else {
				this.$voice.success()
				this.handlePushMsgList(this.formData, res.Msg || 'SMT插料失败', 'error')
			}
		}
	},
	onLoad() {

	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(180)
			}
		})
	},
	components: {
		graceHeader,
		gracePage
	}
}
