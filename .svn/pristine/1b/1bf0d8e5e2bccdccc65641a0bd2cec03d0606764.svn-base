import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	isSetWMSService
} from '@/utils/utils.js'
import {
	FormatBarcode,
	GetReelInfoByReelCode,
	SplitStock,
	GetReel
} from '@/api/WMS/BarcodeInventoryCut.js'
import {
	mapGetters
} from 'vuex'
import {
	print_barode
} from '@/utils/wifi_print.js'
export default {
	name: 'BarcodeInventoryCut',
	components: {
		graceHeader,
		gracePage
	},
	computed: {
		...mapGetters(['token'])
	},
	data() {
		return {
			formData: {
				reelCode: '',
				splitQty: 1,
				caseQty: 1
			},
			autoFocus: false,
			focusNext: false,
			focusThree: false,
			netData: {},
			isInnerBoxLabel: true,
			timer: null
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data())
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		},
		async handleConfirmReelCode() {
			this.autoFocus = false
			this.focusNext = false
			this.focusThree = false
			if (!this.formData.reelCode) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入原条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await FormatBarcode(this.formData.reelCode).catch(_ => {
				_((err) => {
					this.formData.reelCode = ''
					this.$nextTick(() => {
						this.autoFocus = true
					})
				})
			})
			if (res) {
				this.$set(this.formData, 'reelCode', res)
				const _res = await GetReelInfoByReelCode(res).catch(_ => {
					_(() => {
						this.formData.reelCode = ''
						this.netData = {}
						this.$nextTick(() => {
							this.autoFocus = true
						})
					})
				})
				if (!_res || !_res[0]) {
					uni.showModal({
						title: '提示',
						content: '没有找到条码: ' + res + '的库存!',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.formData.reelCode = ''
								this.$nextTick(() => {
									this.autoFocus = true
								})
							}
						}
					})
					this.$voice.error()
					return false
				} else {
					this.netData = _res[0] || {}
					this.$nextTick(() => {
						this.focusNext = true
					})
					this.$voice.success()
				}
			}
		},
		handleCheckBoxSplitQty() {
			this.autoFocus = false
			this.focusNext = false
			this.focusThree = false
			if (!this.formData.splitQty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入切出的数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusNext = true
						}
					}
				})
				return false
			}
			if (!this.formData.reelCode || !this.netData.ID) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入并校验原条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (isNaN(this.formData.splitQty)) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入正确的切出的数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.splitQty = ''
							this.$nextTick(() => {
								this.focusNext = true
							})
						}
					}
				})
				return false
			}
			if (parseFloat(this.formData.splitQty) > parseFloat(this.netData.STOCK_QTY)) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '切出的数量超出当前切出条码的库存量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.splitQty = ''
							this.$nextTick(() => {
								this.focusNext = true
							})
						}
					}
				})
				return false
			}
			this.focusThree = true
		},
		async handleCheckCaseQty() {
			this.autoFocus = false
			this.focusNext = false
			this.focusThree = false
			if (!this.formData.caseQty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入正确的最小包装数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusThree = true
						}
					}
				})
				return false
			}
			if (!this.formData.reelCode || !this.netData.ID) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入并校验原条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.formData.splitQty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入切出的数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusNext = true
						}
					}
				})
				return false
			}
			if (isNaN(this.formData.splitQty)) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入正确的切出的数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.splitQty = ''
							this.$nextTick(() => {
								this.focusNext = true
							})
						}
					}
				})
				return false
			}
			if (isNaN(this.formData.caseQty)) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入正确的最小包装数量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.caseQty = ''
							this.$nextTick(() => {
								this.focusThree = true
							})
						}
					}
				})
				return false
			}
			const res = await SplitStock({
				srcStockId: this.netData.ID,
				srcReelCode: this.formData.reelCode,
				partNo: this.netData.PART_NO,
				splitQty: this.formData.splitQty,
				caseQty: this.formData.caseQty,
				userName: this.token,
				boxCode: ''
			}).catch(_ => {
				_(() => {
					this.$nextTick(() => {
						this.focusThree()
					})
				})
			})
			if (res) {
				this.formData = {
					reelCode: this.formData.reelCode
				}
				this.$voice.success()
				this.netData = {}
				this.bcdPrints(res || [], 0)
			} else {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '库存切分失败',
					success: _ => {
						
					}
				})
				this.$voice.error()
			}
		},
		checkboxChange(e) {
			this.isInnerBoxLabel = e.detail.value[0] ? true : false
		},
		bcdPrint(barcode) { // TODO 废弃
			return new Promise(async (resolve, reject) => {
				const res = await GetReel(barcode).catch(_ => _())
				if (!res) {
					resolve("未找到条码：" + barcode + "的信息。\n\r")
					return false
				}
				if (this.isInnerBoxLabel) {
					let bcdtype = 'S'
					if (res.BcdType === 'J') {
						res.PartNo += '          J'
					}
					res.BcdType = bcdtype
				}
				const result = print_barode(res)
				if (result) {
					resolve("条码：" + barcode + "打印成功。\n\r")
				} else {
					resolve("条码：" + barcode + "打印失败。\n\r")
				}
			})
		},
		async bcdPrints(barcodes, index) {
			const barcode = barcode[index]
			if (barcode) {
				const res = await GetReel(barcode).catch(_ => _())
				if (!res) {
					uni.showToast({
						title: "未找到条码：" + barcode + "的信息."
					})
				} else {
					if (this.isInnerBoxLabel) {
						let bcdtype = 'S'
						if (res.BcdType === 'J') {
							res.PartNo += '          J'
						}
						res.BcdType = bcdtype
					}
					const result = print_barode(res)
					if (!result) {
						uni.showToast({
							title: "条码：" + barcode + "打印失败."
						})
					}
				}
			} else {
				uni.showToast({
					title: '第' + (index + 1) + '张单据信息不全，跳过打印.'
				})
			}
			if (index < barcodes.length) {
				const timer = setTimeOut(() => {
					clearTimeout(timer) // 清除定时器
					this.bcdPrints(barcodes, index + 1)
				}, 2000)
			} else {
				this.handleConfirmReelCode()
				this.focusNext = true
			}
		}
	},
	onLoad() {
		if (!isSetWMSService()) {
			uni.showModal({
				title: '提示',
				content: '请先设置WMS服务器',
				confirmText: '去设置',
				success: _ => {
					if (_.confirm) {
						uni.navigateTo({
							url: '/pages/WMSServiceSet/index'
						})
					}
				}
			})
			return false
		}
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}
