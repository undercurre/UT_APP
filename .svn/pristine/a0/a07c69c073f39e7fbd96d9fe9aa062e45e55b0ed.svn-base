import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	GetWo,
	GetWoInfo,
	TraceStencil,
	TraceScraper
} from '@/api/stencil.js'
import * as config from '@/utils/config.js'
export default {
	data() {
		return {
			formData: {
				stencil_no: '',
				scraper_no_one: '',
				scraper_no_two: ''
			},
			loading: false,
			wo_no: '',
			netData: {
				WO_NO: ' ',
				MODEL: ' ',
				PART_NO: ' '
			},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			autoFocus: true,
			autoNextOne: false,
			autoNextTwo: false,
			timer: null
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async resetFormData(isVibrate = false) {
			this.formData = {
				stencil_no: '',
				scraper_no: ''
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
			this.autoNextOne = false
			this.autoNextTwo = false
			this.currentSelection = ''
			await this.initPage()
			await this.getPageData()
			if (isVibrate) {
				this.$voice.vibrate()
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
				this.netData = result.Data
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
		// 提交钢网作业
		async handleSubmitStencil() {
			this.autoFocus = false
			if (!this.formData.stencil_no) {
				return false
			}
			const result = await TraceStencil({
				stencil_no: this.formData.stencil_no,
				wo_no: this.wo_no
			})
			if (result.Code === config.SUCCESS_CODE) {
				if (result.Data) {
					this.$voice.success()
					uni.showModal({
						title: '提示',
						content: '处理成功',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoNextOne = true
								this.autoNextTwo = false
							}
						}
					})
				} else {
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: '处理失败',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoNextOne = this.autoNextTwo = false
								this.autoFocus = true
								this.formData.stencil_no = ''
							}
						}
					})
				}
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoNextOne = this.autoNextTwo = false
							this.autoFocus = true
							this.formData.stencil_no = ''
						}
					}
				})
			}
		},
		async handleSubmitScraper(e, ref) {
			if (!this.formData[ref]) {
				return false
			}
			switch (ref) {
				case 'scraper_no_one': // 后刮刀
					this.autoNextOne = false
					if (this.formData[ref].substr(0, 3) !== 'GDR') {
						this.$voice.error()
						uni.showModal({
							title: '提示',
							content: '请正确输入后刮刀编号',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this.autoNextTwo = this.autoFocus = false
									this.autoNextOne = true
									this.formData.scraper_no_one = ''
								}
							}
						})
						return false
					}
					break
				case 'scraper_no_two': // 前刮刀
					this.autoNextTwo = false
					if (this.formData[ref].substr(0, 3) !== 'GDF') {
						this.$voice.error()
						uni.showModal({
							title: '提示',
							content: '请正确输入前刮刀编号',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this.autoNextOne = this.autoFocus = false
									this.autoNextTwo = true
									this.formData.scraper_no_two = ''
								}
							}
						})
						return false
					}
					break
				default:
					return false
					break
			}
			const obj = {
				scraper_no_one: 'autoNextOne',
				scraper_no_two: 'autoNextTwo'
			}
			const result = await TraceScraper({
				scraper_no: this.formData[ref],
				wo_no: this.wo_no
			})
			if (result.Code === config.SUCCESS_CODE) {
				if (result.Data) {
					this.$voice.success()
					uni.showModal({
						title: '提示',
						content: '处理成功',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								if (obj[ref] === 'scraper_no_one') {
									this.autoNextOne = false
									this.autoNextTwo = true
								}
							}
						}
					})
				} else {
					this.$voice.error()
					this.autoNextOne = this.autoNextTwo = this.autoFocus = false
					uni.showModal({
						title: '提示',
						content: '处理失败',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this[obj[ref]] = true
								this.formData[ref] = ''
							}
						}
					})
				}
			} else {
				this.$voice.error()
				this.autoNextOne = this.autoNextTwo = this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this[obj[ref]] = true
							this.formData[ref] = ''
						}
					}
				})
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
	},
	onUnload() {
		clearTimeout(this.timer)
	}
}
