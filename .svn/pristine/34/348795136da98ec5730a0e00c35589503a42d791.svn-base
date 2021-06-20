import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	GetReel,
	GetReelHistory
} from '@/api/rollInfo.js'
import * as config from '../../utils/config.js'
export default {
	data() {
		return {
			netData: {
				PART_NO: ' ',
				LotCode: ' ',
				VendorName: ' ',
				DateCode: ' ',
				PART_NAME: ' ',
				Quantity: ' ',
				PART_DESC: ' ',
				STATUS_NAME: ' '
			},
			formData: {
				reelCode: ''
			},
			autoFocus: false,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleFocus() {
			const value = this.formData.reelCode
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
			this.selectionStart = 0
			this.selectionEnd = value ? value.toString().length : 0
		},
		async handleCheckReel() {
			this.autoFocus = false
			if (!this.formData.reelCode) {
				return false
			}
			const result = await GetReel(this.formData.reelCode)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.netData = result.Data
				this.formData.reelCode = result.Data.CODE
				this.$voice.success()
			} else {
				uni.showModal({
					title: '提示',
					content: result.Msg || '料卷错误',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.formData.reelCode = ''
						}
					}
				})
				this.$voice.error()
				this.netData = {
					PART_NO: ' ',
					LotCode: ' ',
					VendorName: ' ',
					DateCode: ' ',
					PART_NAME: ' ',
					Quantity: ' ',
					PART_DESC: ' ',
					STATUS_NAME: ' '
				}
			}
		},
		resetForm(isVibrate = false) {
			this.netData = {
				PART_NO: ' ',
				LotCode: ' ',
				VendorName: ' ',
				DateCode: ' ',
				PART_NAME: ' ',
				Quantity: ' ',
				PART_DESC: ' ',
				STATUS_NAME: ' '
			}
			this.formData = {
				reelCode: ''
			}
			this.autoFocus = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				clearTimeout(this.autoFocus)
			}, 200)
			this.selection = false
			this.selectionStart = 0
			this.selectionEnd = 0
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
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}
