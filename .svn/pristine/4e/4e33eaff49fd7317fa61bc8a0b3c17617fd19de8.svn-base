import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	get_printstr,
	printSocket
} from '@/utils/wifi_print.js'
export default {
	name: 'wifiPrintSet',
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			formData: {
				IP: ''
			},
			autoFocus: false
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		printTest() {
			if (!this.formData.IP) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入打印机IP',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			printSocket(get_printstr({
				VendorCode: "PRC00001",
				VendorName: "CSER电子有限公司电子有限公司",
				PartNo: "600014910-01-GP2",
				Qty: "800",
				Unit: "PCS",
				PartDescription: "水冷板CNC1(上盖+下盖+水嘴)-去油-Text测试一下测试一下去油-Text去油-DD",
				ReelCode: "M0000019100856608",
				MakerPN: "MP-600014910-02",
				MakerCode: "MP10108",
				MakerName: "SDRI制造电子有限公司",
				BatchNo: "msdo20023",
				COO: "中国广州",
				BOX_NUMBER: "8",
				Brand: "EKS",
				PO: "P600014910-02",
				ProductionDate: "20180613",
				DeliveryDate: "20180713",
				CartonSize: "10*12*9",
				BcdType: "S",
				GrossWeight: "100",
				NetWeight: "90",
				ENTRYID: "B00129-012",
				Bu: "P02",
				Sic: "SIC01",
				ZTYPE: "一般贸易",
				Remark: "IMSMF测试一下SSF",
				MakerAddress: "ABC东莞电子有限公司东莞电子有限公司",
				VendorAddress: "广州电子有限公司AVSSDD东莞电子有限公司",
				Sales_NUMBER: "FS02",
				Sales_Project_Number: "10292",
				ORDER_NUMBER: "SKIE0192313",
				QrCode: "Y:M0000019100856608:P600014910-01-GP2:Q800:9D2004:有限公司AVSSDD东莞电:1T1928100199:R:2T8888888888:KCM:广州电子有限公司",
			}), this.formData.IP)
		},
		submitForm() {
			this.autoFocus = false
			if (!this.formData.IP) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入打印机IP',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			uni.setStorage({
				key: 'printerip',
				data: this.formData.IP,
				success: () => {
					uni.showModal({
						title: '提示',
						content: '设置成功',
						showCancel: false
					})
				}
			})
		}
	},
	onLoad() {
		const printIp = uni.getStorageSync('printerip')
		this.formData = {
			IP: printIp || ''
		}
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}
