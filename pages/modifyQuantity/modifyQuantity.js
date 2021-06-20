import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	GetReel,
	UpdateReelOnhandQty
} from '@/api/modifyQuantity.js'
export default {
	data() {
		return {
			formData: {
				reelID: '',
				qty: ''
			},
			autoFocus: false,
			currentSelection: '',
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			checkReelFLag: false,
			netData: {
				PART_NO: ' ',
				Quantity: ' '
			},
			timer: null
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
		async handleCheckReel() {
			this.autoFocus = false
			if (!this.formData.reelID) {
				return false
			}
		
			const result = await GetReel(this.formData.reelID)
			if (result.Code !== config.SUCCESS_CODE || !result.Data) {
				uni.showModal({
					title: '提示',
					content: result.Msg || '料卷错误',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.formData.reelID = ''
						}
					}
				})
				this.netData = {
					PART_NO: ' ',
					Quantity: ' '
				}
				this.$voice.error()
				return false
			}
			this.formData.reelID = result.Data.CODE
			this.netData = result.Data
			this.checkReelFLag = true
		},
		handleCheckQty() {
			this.checkReelFLag = false
			if (!this.formData.qty) {
				return false
			}
			if (!(/(^[1-9]\d*$)/.test(this.formData.qty))) {
				uni.showModal({
					title: '提示',
					content: '请输入整数',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.checkReelFLag = true
							this.formData.qty = ''
						}
					}
				})
				this.$voice.error()
				return false
			}
		},
		async submitForm() {
			if (!this.formData.reelID) {
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入料盘',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				this.$voice.vibrate()
				return false
			}
			if (!this.netData.PART_NO) {
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '料盘检验不通过',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.netData = {
								PART_NO: ' ',
								Quantity: ' '
							}
							this.formData.reelID = ''
						}
					}
				})
				this.$voice.vibrate()
				return false
			}
			if (!this.formData.qty) {
				this.checkReelFLag = false
				uni.showModal({
					title: '提示',
					content: '请输入新数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.checkReelFLag = true
						}
					}
				})
				this.$voice.vibrate()
				return false
			}
	
			const result = await UpdateReelOnhandQty(this.formData)
			if (result.Code !== config.SUCCESS_CODE || result.Data !== true) {
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: result.Msg || '修改数量失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '修改数量成功',
				showCancel: false,
				success: (_) => {
					if (_.confirm) {
						this.resetFormData()
					}
				}
			})
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				reelID: '',
				qty: ''
			}
			this.autoFocus = false
			this.currentSelection = ''
			this.selection = false
			this.selectionStart = 0
			this.selectionEnd = 0
			this.checkReelFLag = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				clearTimeout(this.timer)
			}, 200)
			this.netData = {
				PART_NO: ' ',
				Quantity: ' '
			}
			if (isVibrate) {
				this.$voice.vibrate()
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onLoad() {
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}
