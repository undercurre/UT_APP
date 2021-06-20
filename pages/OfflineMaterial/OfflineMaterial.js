import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	SupplyAndPlaceByOffline_for_ruijing,
	SupplyAndPlaceByOffline,
	GetNextLocation
} from '@/api/OfflineMaterial.js'
import {
	GetFeeder
} from '@/api/feidaRepair.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				feeder: '',
				fullLocation: ''
			},
			autoFocus: false,
			checkReelFlag: false,
			msgContentHeight: 200,
			msgList: [],
			auto: false
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleChangeBox(e) {
			if (e.detail.value[0]) {
				this.auto = true
			} else {
				this.auto = false
			}
		},
		resetFormData(isVibrate = false, backCall = null) {
			this.formData = {
				feeder: '',
				fullLocation: ''
			}
			this.autoFocus = false
			this.checkReelFlag = false
			this.$nextTick(() => {
				if (backCall) {
					backCall(true)
				} else {
					this.autoFocus = true
				}
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async handleCheckFeeder() {
			this.autoFocus = false
			this.checkReelFlag = false
			if (!this.formData.feeder) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			const res = await GetFeeder(this.formData.feeder)
			this.$voice.success()
			if (res.Code === config.SUCCESS_CODE) {
				if (this.auto && this.formData.fullLocation) {
					this.submitForm()
				} else {
					this.checkReelFlag = true
				}
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.FormData, result.Msg || '飞达检验失败', 'error')
				this.formData.feeder = ''
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		async submitForm() {
			this.autoFocus = false
			this.checkReelFlag = false
			if (!this.formData.feeder) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入飞达', 'error')
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			if (!this.formData.fullLocation) {
				this.$voice.error()
				this.handlePushMsgList(this.formData, '请输入料站', 'error')
				this.$nextTick(() => {
					this.checkReelFlag = true
				})
				return false
			}
			let res = {}
			if (config.IS_RUIJING) {
				res = await SupplyAndPlaceByOffline_for_ruijing(this.formData)
			} else {
				res = await SupplyAndPlaceByOffline(this.formData)
			}
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.handlePushMsgList(this.formData, '离线上料成功', 'success')
				const currentFullSlot = this.formData.fullLocation
				this.resetFormData(false, async _ => {
					if (this.auto) {
						const _res = await GetNextLocation(currentFullSlot)
						if (_res.Code === config.SUCCESS_CODE && _res.Data) {
							this.formData.fullLocation = _res.Data
						} else {
							this.formData.fullLocation = ''
						}
						this.$nextTick(() => {
							this.autoFocus = true
						})
					} else {
						this.$nextTick(() => {
							this.autoFocus = true
						})
					}
				})
			} else {
				this.$voice.error()
				this.handlePushMsgList(this.formData, res.Msg || '离线上料失败', 'error')
			}
		}
	},
	onLoad() {
		
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(120) - uni.upx2px(180)
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		})
	},
	components: {
		graceHeader,
		gracePage
	}
}