import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import { GetWo, GetWoInfo, TraceSolderPaste } from '../../api/excipientsOperation.js'
import * as config from '../../utils/config.js'
import {
	GetReel
} from '@/api/supplyPlaceReel.js'
export default {
	data() {
		return {
			formData: {
				solder_no: ''
			},
			wo_no: '',
			netData: {
				WO_NO: ' ',
				MODEL: ' ',
				PART_NO: ' '
			},
			selection: '',
			selectionStart: 0,
			selectionEnd: 0,
			autoFocus: false,
			loading: false,
			timer: null
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async initPage() {
			const result = await GetWo()
			if (result.Code === config.SUCCESS_CODE) {
				this.wo_no = result.Data
				this.getPageData()
			} else {
				this.netData = {
					WO_NO: ' ',
					MODEL: ' ',
					PART_NO: ' '
				}
				this.wo_no = ''
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false,
					success: res => {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		async getPageData() {
			const result = await GetWoInfo(this.wo_no)
			if (result.Code === config.SUCCESS_CODE) {
				this.netData = result.Data || {
					WO_NO: ' ',
					MODEL: ' ',
					PART_NO: ' '
				}			
			} else {
				this.netData = {
					WO_NO: ' ',
					MODEL: ' ',
					PART_NO: ' '
				}
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false,
					success: res => {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		handleFocus() {
			const value = this.formData.solder_no
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		},
		async handleSubmit() {
			this.autoFocus = false
			if (!this.formData.solder_no) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入辅料',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			
			const _res = await GetReel(this.formData.solder_no)
			if (_res.Code === config.SUCCESS_CODE && _res.Data) {
				this.formData.solder_no = _res.Data.CODE
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '格式化条码失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.solder_no = ''
							this.autoFocus = true
						}
					}
				})
				return false
			}
		
			const result = await TraceSolderPaste({
				solder_no: this.formData.solder_no,
				wo_no: this.wo_no
			})
			if (result.Code === config.SUCCESS_CODE) {
				uni.showModal({
					title: '提示',
					content: '辅料绑定成功, 剩余报废时间: ' + result.Data + '分钟',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							this.resetFormData()
						}
					}
				})
				this.$voice.success()
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg || '辅料绑定失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
			}
		},
		async resetFormData(isVibrate = false) {
			this.formData = {
				solder_no: ''
			}
			this.wo_no = ''
			this.netData = {
				WO_NO: ' ',
				MODEL: ' ',
				PART_NO: ' '
			}
			this.selection = ''
			this.selectionStart = 0
			this.selectionEnd = 0
			this.autoFocus = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				clearTimeout(this.timer)
			}, 200)
			await this.initPage()
			await this.getPageData()
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
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	},
	onUnload() {
		clearTimeout(this.timer)
	}
}