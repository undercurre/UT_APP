import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	CheckSiteByMac,
	CheckHiReel,
	SyncHiReel
} from '@/api/pluginFeeding.js'
import {
	GetReel
} from '@/api/rollInfo.js'
import { mapGetters } from 'vuex'
import {
	GetHiProduct
} from '@/api/producOffline.js'
import * as config from '@/utils/config.js'
export default {
	data() {
		return {
			netData: {
				WO_NO: ' ',
				PCB_PN: ' ',
				MODEL: ' '
			},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			autoFocus: false,
			autoNextFocus: false,
			formData: {
				MAC: '',
				ReelId: ''
			}
		}
	},
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 同步料单
		async submitForm() {
			const res = await SyncHiReel()
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '同步料单成功',
					showCancel: false
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '同步料单失败',
					showCancel: false
				})
			}
		},
		async initPage() {
			const res = await GetHiProduct()
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.netData = res.Data
				this.autoFocus = true
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取工单信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.currentSelection = ref
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		},
		// 检查站位
		async handleCheckMAC() {
			this.autoFocus = false
			if (!this.formData.MAC) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入站位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await CheckSiteByMac(this.formData.MAC)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.autoNextFocus = true
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '站位不存在',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.MAC = ''
							this.autoFocus = true
						}
					}
				})
			}
		},
		// 检查料卷并提交
		async handleCheckReel() {
			this.autoNextFocus = false
			if (!this.formData.ReelId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入料卷',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoNextFocus = true
						}
					}
				})
			}
			const result = await GetReel(this.formData.ReelId)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.formData.ReelId = result.Data.CODE
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg || '料卷校验失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.ReelId = ''
							this.autoNextFocus = true
						}
					}
				})
				return false
			}
			const res = await CheckHiReel({
				WoNo: this.netData.WO_NO,
				ReelId: this.formData.ReelId,
				MAC: this.formData.MAC
			})
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '备料成功!产线正常开工!',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '还有未备完物料，产线未能开工!',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.ReelId = ''
							this.autoNextFocus = true
						}
					}
				})
			}
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				netData: this.netData
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.initPage()
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onHide() {
		clearTimeout(this.timer)
	}
}