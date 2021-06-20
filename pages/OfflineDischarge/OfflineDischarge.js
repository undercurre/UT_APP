import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import dayjs from 'dayjs'
import * as config from '@/utils/config.js'
import {
	FormatBarcode
} from '@/api/takeOff.js'
import {
	OfflineUnloading
} from '@/api/OfflineDischarge.js'
export default {
	data() {
		return {
			formData: {
				feederOrReel: ''
			},
			autoFocus: false,
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
				autoFocus: false,
				msgContentHeight: this.msgContentHeight
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		async handleBlur() {
			this.autoFocus = false
			if (!this.formData.feederOrReel) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达/料卷', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await FormatBarcode(this.formData.feederOrReel)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.formData.feederOrReel = res.Data
				this.submitForm()
			} else {
				this.handlePushMsgList(this.formData, res.Msg || '格式化条码失败', 'error')
				this.$voice.error()
				this.formData.feederOrReel = ''
				this.autoFocus = true
			}
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.formData.feederOrReel) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达/料卷', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await OfflineUnloading(this.formData.feederOrReel)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '离线卸料失败', 'error')
				this.formData.feederOrReel = ''
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, '离线卸料成功', 'success')
				this.formData.feederOrReel = ''
				this.$nextTick(() => {
					this.autoFocus = true
				})
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '离线卸料失败', 'error')
				this.formData.feederOrReel = ''
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
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
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}