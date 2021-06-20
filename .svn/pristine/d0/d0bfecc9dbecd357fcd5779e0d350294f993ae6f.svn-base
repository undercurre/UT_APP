import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	IsRuncardExist,
	ReplaceMultiPanelSN
} from '@/api/replaceBarcode.js'
import * as config from '@/utils/config.js'
export default {
	name: 'replaceBarcode',
	data() {
		return {
			autoFocus: false,
			autoFocusNext: false,
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			loading: false,
			formData: {
				sn: '',
				newSN: ''
			},
			timer: null
		}
	},
	components: {
		graceHeader, gracePage
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
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
		// 检查旧条码
		async handleCheckSn() {
			this.autoFocus = false
			if (!this.formData.sn) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入旧条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			
			const res = await IsRuncardExist(this.formData.sn)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.autoFocusNext = true
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '条码不存在',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.sn = ''
							this.autoFocus = true
						}
					}
				})
			}
		},
		// 检查新条码
		async handleCheckNewSn() {
			this.autoFocusNext = false
			if (!this.formData.newSN) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入新条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await IsRuncardExist(this.formData.newSN)
			if (res.Code !== config.SUCCESS_CODE || !res.Data) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '条码不存在',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.newSN = ''
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			// 替换条码
			const _res = await ReplaceMultiPanelSN(this.formData)
			if (_res.Code === config.SUCCESS_CODE && _res.Data) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '产品替换条码成功',
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
					content: res.Msg || '产品替换条码失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.newSN = ''
							this.autoFocusNext = true
						}
					}
				})
			}
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (isVibrate) this.$voice.vibrate()
		}
	},
	onLoad() {
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onHide() {
		clearTimeout(this.timer)
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}