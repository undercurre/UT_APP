import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	get_printstr,
	printSocket
} from '@/utils/wifi_print.js'
export default {
	name: 'DefaultPrintSet',
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			device: null,
			BAdapter: null,
			BluetoothAdapter: null,
			uuid: null,
			main: null,
			bluetoothSocket: null,
			OutputStreamWriter: null,
			btfind: '搜索设备',
			isLoading: false,
			vlist1: [],
			vlist2: [],
			printerList: [{label: 'WIFI打印机', value: 1}, {label: '蓝牙打印机', value: 2}],
			printerIndex: 0,
			defaultPrinterType: 1,
			formData: {
				IP: ''
			},
			autoFocus: false
		}
	},
	methods: {
		handleChosenType(e) {
			this.printerIndex = e.detail.value
			this.defaultPrinterType = this.printerList[this.printerIndex].value
			uni.setStorageSync('printer_type', this.defaultPrinterType)
			if (this.defaultPrinterType === 1) {
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		searchDevices(address) {
			var that = this
			//注册类  
			var main = plus.android.runtimeMainActivity();
			var IntentFilter = plus.android.importClass('android.content.IntentFilter');
			var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
			var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
			var BAdapter = BluetoothAdapter.getDefaultAdapter();
		
			if (!BAdapter.isEnabled()) {
				uni.showModal({
					title: '提示',
					content: '蓝牙处于关闭状态，是否打开？',
					success: _ => {
						BAdapter.enable();
					}
				})
				console.log("蓝牙处于关闭状态，正在打开...");
				return;
			}
		
			console.log("开始搜索设备");
			var filter = new IntentFilter();
			var bdevice = new BluetoothDevice();
			this.vlist1 = [] //注册容器用来显示未配对设备  
		
			this.vlist2 = [] //注册容器用来显示未配对设备  		
			
			this.isLoading = true;
			this.btfind = '正在搜索...';
		
			BAdapter.startDiscovery(); //开启搜索  
			var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
				onReceive: function(context, intent) { //实现onReceiver回调函数  
					plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作  
					console.log(intent.getAction()); //获取action  
					if (intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED") {
						main.unregisterReceiver(receiver) //取消监听  
						that.isLoading = false
						that.btfind = '搜索设备'
						console.log("搜索结束")
					} else {
						console.log('操你妈')
						var BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
						if (!BleDevice || !BleDevice.getAddress() || !BleDevice.getName()) {
							return;
						}
						var cur_address = BleDevice.getAddress();
						var find_obj = that.vlist2.find(i => i && i.id == cur_address) // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						//判断是否配对  
						if (BleDevice.getBondState() == bdevice.BOND_NONE) {
							console.log("未配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
							//参数如果跟取得的mac地址一样就配对  
							if (address == BleDevice.getAddress()) {
								if (BleDevice.createBond()) { //配对命令.createBond()  
									uni.showModal({
										title: '提示',
										content: '配对成功',
										showCancel: false
									})
									let flag = false
									that.vlist2.map(i => {
										if (i.id == BleDevice.getAddress()) {
											flag = true
										}
									})
									if (!flag) {
										that.vlist2.push({
											id: BleDevice.getAddress(),
											label: BleDevice.getName(),
											isSet: false
										})
									}
								}
							} else {
								if (cur_address && !find_obj) { //判断防止重复添加  
									let flag = false
									that.vlist1.map(i => {
										if (i.id == BleDevice.getAddress()) {
											flag = true
										}
									})
									if (!flag) {
										that.vlist1.push({
											id: BleDevice.getAddress(),
											label: BleDevice.getName()
										})
									}
								}
							}
						} else {
							//if (BleDevice.getName() != un) { //判断防止重复添加  
							if (cur_address && !find_obj) { //判断防止重复添加 
								console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
								var printerid = BleDevice.getAddress();
								uni.setStorage({
									key: 'printerid',
									data: printerid
								})
								let flag = false
								that.vlist2.map(i => {
									if (i.id == BleDevice.getAddress()) {
										flag = true
									}
								})
								if (!flag) {
									that.vlist2.push({
										id: BleDevice.getAddress(),
										label: BleDevice.getName(),
										isSet: true
									})
								}
							}
						}
					}
				}
			});
		
			filter.addAction(bdevice.ACTION_FOUND);
			filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
			filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
			filter.addAction(BAdapter.ACTION_STATE_CHANGED);
		
			main.registerReceiver(receiver, filter); //注册监听  
		},
		setprinter(mac_address) {
			if (mac_address) {
				uni.setStorage({
					key: 'ble_printerId',
					data: mac_address,
					success: _ => {
						uni.showModal({
							title: '提示',
							content: '蓝牙打印机设置成功, 可以点击打印测试, 进行测试.'
						})
					}
				})
			}
		},
		PrinterIsReady() {
			var that = this
			var printerid = uni.getStorageSync('ble_printerId')
			if (printerid) {
		
				try {
					that.BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
					var UUID = plus.android.importClass("java.util.UUID");
					that.uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
					that.BAdapter = that.BluetoothAdapter.getDefaultAdapter();
					that.BAdapter.enable();
			
					that.device = that.BAdapter.getRemoteDevice(printerid);
					plus.android.importClass(that.device);
					that.bluetoothSocket = that.device.createInsecureRfcommSocketToServiceRecord(that.uuid);
					plus.android.importClass(that.bluetoothSocket);
			
					if (!that.bluetoothSocket.isConnected()) {
						that.bluetoothSocket.connect();
					}
			
				} catch (e) {
					uni.showModal({
						title: '提示',
						content: ex.message,
						showCancel: false
					})
					return false;
				}
			} else {
				uni.showModal({
					title: '提示',
					content: '请先选择已配对的蓝牙打印机.',
					showCancel: false
				})
				return false;
			}
			
			
			return true;
		},
		print_label(data) {
			var printerid = uni.getStorageSync('ble_printerId')
			if (printerid) {
				if (printerid != null && printerid.length > 0) {
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
		printTest() {
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
						VendorCode:"PRC00001",
						VendorName: "讯强电子(惠州)有限公司",
						PartNo: "600014910-01-GP2",
						Qty: "800",
						PartDescription: "水冷板CNC1(上盖+下盖+水嘴)-去油-Text测试一下测试一下",
						ReelCode: "M0000019100856608",
						DShippingDate: "2020-04-11",
						DateCode: "200408",
						ShippingDate: "20200411",
						DDateCode: "4月",
						QrCode: "SM0000019100856608|P600014910-01-GP2|Q800|9D2004|1T1928100199|R|2T8888888888|KCM",
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
			
				var str = " ! 0 200 200 672 1 " + '\r\n';
				str += "PAGE-WIDTH 624" + '\r\n';
			
				str += "BOX  12 0 567 636 2" + '\r\n';
			
				str += "LINE 12 80 567 80 2" + '\r\n';
				str += "LINE 12 155 567 155 2" + '\r\n';
				str += "LINE 12 232 567 232 2" + '\r\n';
				str += "LINE 12 309 567 309 2" + '\r\n';
				str += "LINE 12 479 567 479 2" + '\r\n';
				str += "LINE 12 555 567 555 2" + '\r\n';
			
				str += "LINE 152 80 152 636 2" + '\r\n'; // 竖线
				str += "LINE 379 155 379 232 2" + '\r\n';
				str += "LINE 467 155 467 232 2" + '\r\n';
				str += "LINE 287 479 287 555 2" + '\r\n';
				str += "LINE 419 479 419 555 2" + '\r\n';
				str += "LINE 367 555 367 636 2" + '\r\n';//最后一个空格的竖线
			
			
				str += "SETBOLD 0" + '\r\n';
			
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 55 0 147 30 CoolerMaster(现品票)" + '\r\n';
				str += "TEXT 55 0 19 107 Supplyer" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 167 107 " + vendorCode + "  " + vendorName + '\r\n';
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 55 0 19 183 Part No" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 167 183 " + partNo + '\r\n';
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 55 0 397 183 Qty" + '\r\n';
				str += "TEXT 55 0 475 183 " + qty + '\r\n';
				str += "TEXT 55 0 19 260 Desc" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				if (partDesc.length < 21) {
					str += "TEXT 24 0 167 260 " + partDesc + '\r\n';
				} else {
					var pd1 = partDesc.substr(0,20);	 
					var pd2 = partDesc.substr(21);
					str += "TEXT 24 0 167 240 " + pd1 + '\r\n';
					str += "TEXT 24 0 167 267 " + pd2 + '\r\n';
				}
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 55 0 19 391 Box NO" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 329 345 " + reelCode + '\r\n';
				str += "TEXT 24 0 329 395 " + dShippingDate + '\r\n';
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 55 0 19 507 生产日期" + '\r\n';
				str += "TEXT 55 0 167 507 " + dateCode + '\r\n';
				str += "TEXT 55 0 292 507 出货日期" + '\r\n';
				str += "TEXT 55 0 429 507 " + shippingDate + '\r\n';
			
				str += "TEXT 55 0 42 585 月份" + '\r\n';
				str += "SETMAG 4 4" + '\r\n';
				str += "TEXT 55 0 227 560 " + dDateCode + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
			
				str += "B QR 167 323 M 2 U 4" + '\r\n';
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
		onConn(item) {
			if (item.id) {
				if (item.isSet){
					this.setprinter(item.id)
				} else {
					this.print(item.id)
				}
			}
		},
		
		// wifi 打印
		printTestWifi() {
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
		uni.getLocation({
			success() {
				
			}
		})
		const defaultPrinterType = uni.getStorageSync('printer_type') || 1
		this.defaultPrinterType = defaultPrinterType
		this.printerList.map((i, k) => {
			if (i.value === defaultPrinterType) {
				this.printerIndex = k
			}
		})
	},
	onShow() {
		this.OutputStreamWriter = plus.android.importClass("java.io.OutputStreamWriter");
	}
}