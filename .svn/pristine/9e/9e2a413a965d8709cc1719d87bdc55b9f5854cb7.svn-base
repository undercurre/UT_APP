import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
var tsc = require('@/components/gprint/tsc.js')
import {
	mapState
} from 'vuex'
import {
	Sites,
	SaveSite, // 保存站点
	CollectPalletData,
	SetPalletFull,
	GetPrintDataById
} from '@/api/CollectProducts.js'

export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			Pallet_NO: '', // 栈板
			DefinedQty: '', // 容量
			CurrentQty: '', // 已刷数量
			// 保存站点
			SiteFrom: {
				SiteId: '',
				UserName: ''
			},
			SiteObj: '',
			enterVal: '', // 输入数据
			NewsInfo: '',
			statusBarHeight: 0,
			checkStatusIndex: 0,
			statusList: [
				// {
				// 	ID: '1',
				// 	SBU_CHINESE: '采集数据'
				// },
				{
					ID: '2',
					SBU_CHINESE: '消息区'
				},
			],
			collectList: [],
			autoFocus: true,
			zhichengList: [],
			zhichengIndex: -1,
			LINEID: '',
			currDev: null
		}
	},

	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getSites() {
			console.log(this.LINEID, 'this.LINEID')
			var obj = {
				OPERATION_LINE_ID: this.LINEID,
				Page: 1,
				Limit: 1000000
			}
			const res = await Sites(obj)
			const data = JSON.parse(res.Result) || []
			data.map(v => {
				if (v.OPERATION_ID === 86408) {
					this.zhichengList.push(v)
				}
			})
			// this.zhichengList = data || []
		},
		handleChangeZhiCheng(e) {
			this.zhichengIndex = e.detail.value
			this.SiteFrom.SiteId = this.zhichengList[this.zhichengIndex].ID || ''
			this.getSaveSite()
		},
		async getSaveSite() {
			const res = await SaveSite(this.SiteFrom)
			this.SiteObj = res.Result || {}
			console.log(res, 'resresresb保存站点')

		},
		// 回车
		async EnterCheckRee(e) {
			if (!this.SiteFrom.SiteId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择工位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.autoFocus = false
			this.SiteObj.data = this.enterVal
			const res = await CollectPalletData(this.SiteObj)
			console.log(res, 'CollectData')
			const data = res.Result
			console.log(data, 'datadata')
			if (data) {
				this.SiteObj = data
				this.NewsInfo = data.msg || ''
				this.collectList = data.collectDataViews || []
				if (data.pallet) {
					this.Pallet_NO = data.pallet.Pallet_NO
					this.DefinedQty = data.pallet.DefinedQty
					this.CurrentQty = data.pallet.CurrentQty
					// Pallet_NO: '', // 栈板
					// DefinedQty: '', // 容量
					// CurrentQty: '', // 已刷数量
				}
				// 打印条件
				if (data.printer) {
					if (data.printer.isPrint) {
						this.GetPrint(data.printer.printTaskId)
						// this.downSomething({ PrintTaskId: data.printer.printTaskId, Printer: this.userinfo.USER_NAME })
					}
				}

				// this.collectList = [
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				//    },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// },
				// {
				//  OBJECT_NAME: '1',
				//  NEED_ASSEMBLY_QTY: '2',
				//  COLLECTED_QTY: '3',
				//  DATA_FORMAT: '4',
				//  PART_NO: '5'
				// }
				// ]
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}


		},
		// 置满
		async FullClick() {
			// this.GetPrint(53)
			if (!this.SiteFrom.SiteId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择工位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.enterVal) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入数据',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.DefinedQty) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入容量',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.SiteObj.pallet.DefinedQty = this.DefinedQty
			this.SiteObj.data = this.enterVal
			const res = await SetPalletFull(this.SiteObj)
			console.log(data,'data----')
			const data = res.Result
			if (res.Result) {
				this.SiteObj = data
				this.NewsInfo = data.msg || ''
				this.collectList = data.collectDataViews || []
				if (data.pallet) {
					this.Pallet_NO = data.pallet.Pallet_NO
					this.DefinedQty = data.pallet.DefinedQty
					this.CurrentQty = data.pallet.CurrentQty
				}
				// 打印条件
				if (data.printer) {
					if (data.printer.isPrint) {
						this.GetPrint(data.printer.printTaskId)
					}
				}
				console.log(res, 'res')
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		},
		// 获取打印数据
		async GetPrint(e) {
			var print = {
				printId: e
			}
			const res = await GetPrintDataById(print)
			console.log(res, '获取数据')
			var str = res.Result.PRINT_DATA
			console.log(str, 'strstr')
			var temp = str.split(/[\n,]/g);
			console.log(temp, 'temp')
			for (var i = 0; i < temp.length; i++) {
				if (temp[i] == "") {
					temp.splice(i, 1);
					//删除数组索引位置应保持不变
					i--;
				}
			}
			console.log(temp,'打印数据')
			var printerid = uni.getStorageSync('ble_printerId')
			if (printerid) {
				if (printerid != null && printerid.length > 0) {
					var vendorName = "";
					var partNo = "";
					var qty = "";
					var partDesc = "";
					var reelCode = "";
					var dShippingDate = "";
					var dateCode = "";
					var shippingDate = "";
					var dDateCode = "";
					var qrcode = "";
					var vendorCode = "";
					var data = {
						VendorCode: temp[8].toString(), // "PRC00001"
						VendorName: temp[9].toString(), // "讯强电子(惠州)有限公司"
						PartNo: temp[10].toString(), // 600014910-01-GP2
						Qty: temp[11].toString(), // 800
						PartDescription: temp[12].toString(), // 水冷板CNC1(上盖+下盖+水嘴)-去油-Text测试一下测试一下
						ReelCode: temp[13].toString(), // M0000019100856608
						DShippingDate: temp[14].toString(), // 2020-04-11
						QrCode: temp[15].toString(), //SM0000019100856608|P600014910-01-GP2|Q800|9D2004|1T1928100199|R|2T8888888888|KCM
					};
					this.print(printerid, data);
				}
			} else {
				uni.showModal({
					title: '提示',
					content: '请先选择已配对的蓝牙打印机, 再进行测试.',
					showCancel: false
				})
			}
		},
		print(mac_address, data) {
			var that = this
			if (!mac_address) {
				uni.showModal({
					title: '提示',
					content: '请选择蓝牙打印机',
					showCancel: false
				})
				return;
			}
			if (!data) {
				uni.showModal({
					title: '提示',
					content: '请提供打印数据.',
					showCancel: false
				})
				return;
			}

			that.main = plus.android.runtimeMainActivity();
			that.BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
			var UUID = plus.android.importClass("java.util.UUID");
			that.uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
			that.BAdapter = that.BluetoothAdapter.getDefaultAdapter();
			if (!that.BAdapter.isEnabled()) {
				uni.showModal({
					title: '提示',
					content: '蓝牙处于关闭状态，是否打开？',
					success: _ => {
						if (_.confirm) {
							BAdapter.enable();
						}
					}
				})
				console.log("蓝牙处于关闭状态，正在打开...");
				return;
			}

			that.device = that.BAdapter.getRemoteDevice(mac_address);
			plus.android.importClass(that.device);
			that.bluetoothSocket = that.device.createInsecureRfcommSocketToServiceRecord(that.uuid);
			plus.android.importClass(that.bluetoothSocket);

			if (!that.bluetoothSocket.isConnected()) {
				console.log('检测到设备未连接，尝试连接....');
				that.bluetoothSocket.connect();
			}

			console.log('设备已连接');

			if (that.bluetoothSocket.isConnected()) {
				var outputStream = that.bluetoothSocket.getOutputStream();
				plus.android.importClass(outputStream);

				outputStream.write([0x1B, 0x40]); //打印复位
				outputStream.flush();
				var vendorName = "";
				var partNo = "";
				var qty = "";
				var partDesc = "";
				var reelCode = "";
				var dShippingDate = "";
				var dateCode = "";
				var shippingDate = "";
				var dDateCode = "";
				var qrcode = "";
				var vendorCode = "";
				if (data.VendorName) {
					vendorName = data.VendorName;
				}
				if (data.PartNo) {
					partNo = data.PartNo;
				}
				if (data.Qty) {
					qty = data.Qty;
				}
				if (data.PartDescription) {
					partDesc = data.PartDescription;
				}
				if (data.ReelCode) {
					reelCode = data.ReelCode;
				}
				if (data.DShippingDate) {
					dShippingDate = data.DShippingDate;
				}
				if (data.DateCode) {
					dateCode = data.DateCode;
				}
				if (data.ShippingDate) {
					shippingDate = data.ShippingDate;
				}
				if (data.DDateCode) {
					dDateCode = data.DDateCode;
				}
				if (data.VendorCode) {
					vendorCode = data.VendorCode;
				}
				if (data.QrCode) {
					qrcode = data.QrCode;
				}
				var str = " ! 0 200 200 400 1 " + '\r\n';
				str += "PAGE-WIDTH 640" + '\r\n';


				str += "SETBOLD 0" + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				// str += "TEXT 55 0 147 30 CoolerMaster(现品票)" + '\r\n';
				str += "TEXT 57 0 10 20 箱号" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 130 20 " + vendorCode + '\r\n';
				// str += "SETMAG 2 2" + '\r\n';
				// str += "TEXT 57 0 10 55 工单号" + '\r\n';
				// str += "SETMAG 1 1" + '\r\n';
				// str += "TEXT 24 0 130 55 " + vendorName + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 10 55 料号" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 130 55 " + partNo + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 10 90 型号" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 130 90 " + qty + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 10 130 线别" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 130 130 " + partDesc + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 10 170 生产时间" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 130 170 " + reelCode + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 10 205 数量" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 130 205 " + dShippingDate + '\r\n';

				str += "SETMAG 2 2" + '\r\n';
				str += "B QR 220 275 M 4 U 4" + '\r\n';
				str += "MA," + qrcode + '\r\n';
				str += "ENDQR" + '\r\n';

				/*标签检测 begin*/
				str += "GAP-SENSE" + '\r\n';
				str += "FORM " + '\r\n';
				/*标签检测 end*/


				str += "PRINT " + '\r\n';
				var bytes = plus.android.invoke(str, 'getBytes', 'gbk');
				outputStream.write(bytes);
				outputStream.flush();
				that.device = null //这里关键  
				that.bluetoothSocket.close();
			}
		},
		handleChangeStatus(index) {
			this.checkStatusIndex = index
		},
		resetFormData(isVibrate = false) {

			this.zhichengIndex = -1
			this.enterVal = ''
			this.NewsInfo = ''
			this.collectList = []
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'currDev',
				success: res => {
					this.currDev = res.data
					console.log(this.currDev)
				}
			})
			// currentLine
			console.log(this.$store.state.system)
			var lineBox = this.$store.state.system.lineList
			lineBox.map((v, i) => {
				// console.log(v,'VVV',i,'iiii')
				if (this.$store.state.system.currentLine === i) {
					this.LINEID = v.SMT_LINE_ID
					this.getSites()
				}
			})
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.SiteFrom.UserName = this.userInfo.USER_NAME
		}
	}
}
