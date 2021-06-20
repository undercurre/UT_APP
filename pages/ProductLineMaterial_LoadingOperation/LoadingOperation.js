import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	mapGetters
} from 'vuex'
import dayjs from 'dayjs'
import {
	GetWoInfo
} from '@/api/production'
import {
	CheckHIReel
} from '@/api/ProductLineMaterial/StartJob.js'
import {
	GetReel
} from '@/api/supplyPlaceReel.js'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine',
			'token'
		])
	},
	data() {
		return {
			formData: {
				woNo: '',
				ReelId: ''
			},
			autoFocus: false,
			autoFocusNext: false,
			msgContentHeight: 200,
			msgList: [],
			part_no: '',
			name: '',
			netData: {}
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				woNo: config.IS_HTL ? 'WORK' : '',
				ReelId: ''
			}
			this.autoFocus = false
			this.autoFocusNext = false
			this.netData = {}
			this.part_no = ''
			this.name = ''
			this.$nextTick(_ => {
				this.autoFocus = true
			})
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
		},
		// 回车触发获取工单信息
		async sendTextMsg() {
			this.autoFocus = false
			this.autoFocusNext = false
			const wo_no = this.formData.woNo
			if (!wo_no) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			const res = await GetWoInfo(wo_no)
			const data = res.Data
			if (res.Code === config.SUCCESS_CODE && data) {
				this.netData = data
				this.formData.woNo = data.WO_NO
				this.part_no = data.PART_NO
				this.name = data.MODEL
				this.autoFocusNext = true
			} else {
				this.$voice.error()
				this.formData.woNo = ''
				this.handlePushMsgList(this.formData, res.Msg || '请输入正确工单', 'error')
				this.$nextTick(_ => {
					this.autoFocus = true
				})
			}
		},
		async handlerCheckReel() {
			this.autoFocus = false
			this.autoFocusNext = false
			if (!this.formData.ReelId) {
				this.handlePushMsgList(this.formData, '请输入物料', 'error')
				this.$voice.error()
				this.$nextTick(_ => {
					this.autoFocusNext = true
				})
				return false
			}
			const res = await GetReel(this.formData.ReelId)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.formData.ReelId = res.Data.CODE
				this.submitForm()
			} else {
				this.formData.ReelId = ''
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '物料检验失败', 'error')
				this.$nextTick(_ => {
					this.autoFocusNext = true
				})
			}
		},
		async submitForm() {
			this.autoFocus = false
			this.autoFocusNext = false
			if (!this.formData.woNo) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入工单号', 'error')
				this.$nextTick(_ => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.ReelId) {
				this.handlePushMsgList(this.formData, '请输入物料', 'error')
				this.$voice.error()
				this.$nextTick(_ => {
					this.autoFocusNext = true
				})
				return false
			}
			const res = await CheckHIReel({
				OperationLineId: this.lineList[this.currentLine].SMT_LINE_ID,
				User: this.token,
				WoNo: this.formData.woNo,
				ReelId: this.formData.ReelId
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.ErrorInfo.Message || '上料作业失败', 'error')
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, '上料作业成功', 'success')
				// this.resetFormData()
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '上料作业失败', 'error')
			}
		},
		handleToChosenWoNo() {
			uni.navigateTo({
				url: '/pages/ProductLineMaterial_Search/index'
			})
		}
	},
	components: {
		gracePage,
		graceHeader
	},
	onLoad(e) {
		if (config.IS_HTL) {
			this.formData.woNo = e.checkedWoNo || 'WORK'
			if (this.formData.woNo && this.formData.woNo !== 'WORK') {
				this.sendTextMsg()
			}
		} else {
			this.formData.woNo = e.checkedWoNo || ''
			if (this.formData.woNo) {
				this.sendTextMsg()
			}
		}
		
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(240)
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		})
	}
}