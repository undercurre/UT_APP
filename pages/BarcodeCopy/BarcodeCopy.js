import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	ParseBarcodes,
	GetPartVendorList,
	DoCreateAndSaveBcd
} from '@/api/WMS/BarcodeCopy.js'
import {
	mapGetters
} from 'vuex'
import {
	print_barode
} from '@/utils/wifi_print.js'
import {
	isSetWMSService
} from '@/utils/utils.js'
export default {
	name: 'BarcodeCopy',
	components: {
		graceHeader,
		gracePage
	},
	computed: {
		...mapGetters([
			'token',
			'PDA_ID'
		])
	},
	data() {
		return {
			formData: {
				barCode: '',
				frame_qty: 1
			},
			autoFocus: false,
			focusNext: false,
			focusQty: false,
			netData: {},
			isInnerBoxLabel: true,
			Vendor: [],
			VendorIndex: -1,
			isDisabled: true
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		checkboxChange(e) {
			this.isInnerBoxLabel = e.detail.value ? true : false
		},
		async handleCheckBarCode() {
			this.autoFocus = false
			this.focusNext = false
			this.focusQty = false
			if (!this.formData.barCode) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入物料条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			console.log(this.formData.barCode)
			const res = await ParseBarcodes(this.formData.barCode).catch(_ => _(err => {
				this.formData.barCode = ''
				this.netData = {}
				this.isDisabled = true
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}))
			
			if (res) {
				this.$voice.success()
				this.isDisabled = false
				this.netData = res || {}
				if (this.netData.PartNo) {
					this.Vendor = []
					this.VendorIndex = -1
					const vendorList = await GetPartVendorList(this.netData.PartNo)
					if (vendorList) {
						vendorList.map(i => {
							if (i.CODE) {
								const tmpArr = this.Vendor.filter(j => j.value === i.CODE)
								if (!tmpArr || !tmpArr.length) {
									this.Vendor.push({
										value: i.CODE,
										text: i.CODE + ':' + i.NAME
									})
								}
							}
						})
						this.Vendor.map((v, k) => {
							if (v.value === this.netData.VendorCode) {
								this.VendorIndex = k
							}
						})
					}
				}
				this.$nextTick(() => {
					this.focusNext = true
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取条码信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.barCode = ''
							this.netData = {}
							this.isDisabled = true
							this.$nextTick(() => {
								this.autoFocus = true
							})
						}
					}
				})
			}
		},
		handleCheckFrameQty() {
			this.autoFocus = false
			this.focusNext = false
			this.focusQty = false
			if (!this.formData.frame_qty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '条码张数不能为空',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusNext = true
						}
					}
				})
				return false
			}
			const frame_qty = parseFloat(this.formData.frame_qty)
			if (isNaN(frame_qty) || frame_qty < 1) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '条码张数不能小于1',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusNext = true
						}
					}
				})
			}
		},
		handleChooseVendor(e) {
			this.VendorIndex = e.detail.value
			const VendorCode = this.netData.VendorCode
			this.netData.VendorCode = this.Vendor[this.VendorIndex] ? this.Vendor[this.VendorIndex].value : '';
			if (!this.netData.VendorCode) {
				this.VendorIndex = -1
				this.netData.VendorCode = VendorCode
			}
		},
		async toPrint() {
			this.autoFocus = false
			this.focusNext = false
			this.focusQty = false
			if (!this.netData.PartNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '料号不能为空',
					showCancel: false
				})
				return false
			}
			if (!this.netData.VendorCode) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '供应商不能为空',
					showCancel: false
				})
				return false
			}
			
			if (!this.formData.frame_qty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '条码张数不能为空',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusNext = true
						}
					}
				})
				return false
			}
			const frame_qty = parseFloat(this.formData.frame_qty)
			if (isNaN(frame_qty) || frame_qty < 1) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '条码张数不能小于1',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.focusNext = true
						}
					}
				})
			}
			
			const Qty = parseFloat(this.netData.Qty)
			if (!Qty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '数量不能为空',
					showCancel: false,
					success: _ => {
						if (_.confirm && !this.isDisabled) {
							this.focusQty = true
						}
					}
				})
				return false
			}
			if (isNaN(Qty) || Qty < 1) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '数量不能小于1',
					showCancel: false,
					success: _ => {
						if (_.confirm && !this.isDisabled) {
							this.focusQty = true
						}
					}
				})
				return false
			}
			let bcdType = this.netData.BcdType
			if (this.isInnerBoxLabel) {
				bcdType = 'S'
			}

			const params = {
				"ReelCode": this.netData.ReelCode,
				"PartNo": this.netData.PartNo,
				"VendorCode": this.netData.VendorCode,
				"LotCode": this.netData.LotCode,
				"BatchNo": this.netData.BatchNo,
				"DateCode": this.netData.DateCode,
				"Quantity": Qty,
				"Remark": this.netData.Remark,
				"BcdCount": frame_qty,
				"ExpireDate": '',
				"UserName": this.token,
				"DeviceId": this.PDA_ID,
				"BCD_TYPE": bcdType,
				"UNIT": this.netData.Unit,
				"GROSS_WEIGHT": this.netData.GrossWeight,
				"NET_WEIGHT": this.netData.NetWeight,
				"BU": this.netData.Bu,
				"SIC": this.netData.Sic,
				"PO": this.netData.PO,
				"CARTON_SIZE": this.netData.CartonSize,
				"CartonSize_L": this.netData.CartonSize_L,
				"CartonSize_W": this.netData.CartonSize_W,
				"CartonSize_H": this.netData.CartonSize_H,
				"BRAND": this.netData.Brand,
				"DELIVERY_DATE": this.netData.DeliveryDate,
				"ShippingDate": this.netData.DeliveryDate,
				"MAKER_PN": this.netData.MakerPN,
				"MakerPartNo": this.netData.MakerPN,
				"PRODUCTION_DATE": this.netData.ProductionDate,
				"MAKER_NAME": this.netData.MakerName,
				"COO": this.netData.COO,
				"BOX_NUMBER": this.netData.BOX_NUMBER,
				"ENTRYID": this.netData.ENTRYID,
				"ZTYPE": this.netData.ZTYPE,
				"ORDER_NUMBER": this.netData.ORDER_NUMBER,
				"Sales_NUMBER": this.netData.Sales_NUMBER,
				"Sales_Project_Number": this.netData.Sales_Project_Number,
				"InvoiceNo": this.netData.InvoiceNo,
				"Refrence": this.netData.Ref
			}

			const res = await DoCreateAndSaveBcd(params)
	
			if (res) {
				this.$voice.success()
				this.printdatas(res || [], 0)
			}
		},
		printdata(data) { // TODO 废弃
			if (!data) {
				return false
			}
			const result = print_barode(data)
			return result
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
		printdatas(datas, index) {
			const data = datas[index]
			if (data) {
				const result = print_barode(data)
				if (!result) {
					uni.showToast({
						title: '第' + (index + 1) + '张单据打印失败.'
					})
				}
			} else {
				uni.showToast({
					title: '第' + (index + 1) + '张单据信息不全，跳过打印.'
				})
			}
			if (index < datas.length) {
				const timer = setTimeout(() => {
					clearTimeout(timer)
					this.printdatas(datas, index + 1)
				}, 2000)
			} else {
				// TODO something
			}
		}
	},
	onLoad() {
		uni.getLocation({
			success() {
				
			}
		})
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
