import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
var tsc = require('@/components/gprint/tsc.js')
export default {
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			devices: [],
			devicesList: [],
			connectedList: []
		}
	},
	methods: {
		// 搜索蓝牙
		searchBle(e) {
			var that = this
			uni.openBluetoothAdapter({
				success(res) {
					console.log("打开 蓝牙模块")
					console.log(res)
					// 监听寻找到新设备的事件
					that.onDevice()
					uni.getBluetoothAdapterState({
						success: function(res) {
							console.log(res)
							//本机蓝牙开启时
							if (res.available) {
								//如在正在搜索设备，则停止搜索
								if (res.discovering) {
									that.stopFindBule()
								}
								//搜索蓝牙
								//开始搜寻附近的蓝牙外围设备
								console.log("开始搜寻附近的蓝牙外围设备")
								uni.startBluetoothDevicesDiscovery({
									success(res) {
										console.log(res)
									}
								})
								// 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
								uni.getBluetoothDevices({
									success: (res) => {
										console.log('已连接的蓝牙: ', res)
										const arr = res.devices
										that.connectedList = arr.filter(i => i && i.name)
									}
								})
							} else {
								console.log('本机蓝牙不可用')
							}
						},
					})
				},
				fail(e) {
					console.log(e)
				}
			})
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 停止搜索
		stopFindBule() {
			console.log("停止搜寻附近的蓝牙外围设备---------------")
			uni.stopBluetoothDevicesDiscovery({
				success(res) {
					console.log(res)
					// 关闭蓝牙模块
					// uni.closeBluetoothAdapter()
				}
			})
		},
		// 监听蓝牙设备
		onDevice() {
			console.log("监听寻找到新设备的事件---------------")
			var that = this
			//监听寻找到新设备的事件
			uni.onBluetoothDeviceFound(function(res) {
				let name = res.devices[0].name
				if (name) {
					that.devices.push(res.devices[0])
				}
				that.devices.forEach(e => {
					if (that.devicesList) {
						var b = true;
						that.devicesList.forEach(e1 => {
							if (e.name == e1.name) {
								b = false;
							}
						});
						if (b) that.devicesList.push(e);
					} else {
						that.devicesList.push(e);
					}
				})
				console.log(that.devicesList)
				// console.log('--------------new-----------------------' + JSON.stringify(that.devices))
			})
		},
		// 链接蓝牙
		onConn(item) {
			var that = this
			console.log("连接蓝牙---------------" + item.deviceId)
			let deviceId = item.deviceId
			//连接低功耗蓝牙设备。
			uni.createBLEConnection({
				deviceId: deviceId,
				complete(res) {
					if (res.errMsg === "createBLEConnection:ok") {
						console.log("连接蓝牙-[" + item.name + "]--成功")
						that.connId = deviceId;
						that.currDev = item
						setTimeout(function() {
							//获取蓝牙设备所有服务(service)。
							that.getBLEServices(deviceId)
						}, 2000)
					} else {
						console.log(res)
					}
					//连接成功 关闭搜索
					that.stopFindBule()
				},
			})
		},
		// 获取蓝牙设备所有服务(service)
		getBLEServices(_deviceId) {
			var that = this
			let deviceId = _deviceId
			console.log("获取蓝牙设备所有服务(service)。---------------")
			uni.getBLEDeviceServices({
				// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				deviceId: deviceId,
				complete(res) {
					console.log(res)
					let serviceId = ""
					for (var s = 0; s < res.services.length; s++) {
						console.log(res.services[s].uuid)
						let serviceId = res.services[s].uuid
						uni.getBLEDeviceCharacteristics({
							// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
							deviceId: deviceId,
							// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
							serviceId: serviceId,
							success(res) {
								var re = JSON.parse(JSON.stringify(res))
								for (var c = 0; c < re.characteristics.length; c++) {
									if (re.characteristics[c].properties.write == true) {
										let uuid = re.characteristics[c].uuid
										for (var index in that.devices) {
											if (that.devices[index].deviceId == deviceId) {
												if (!that.devices[index].services) {
													that.devices[index].services = []
												}
												that.devices[index].services.push({
													serviceId: serviceId,
													characteristicId: uuid
												})
												break
											}
										}
										console.log(JSON.stringify(that.devices))
										that.currDev = that.devices
										uni.setStorage({
											key: 'currDev',
											data: that.devices,
											success: function() {
												console.log('success')
											}
										})
									}
								}
								// 蓝牙连接成功后 蓝牙列表清空
								uni.showToast({
									title: '连接成功'
								})
								// that.devicesList = []
							}
						})
					}
				},
				fail(res) {
					console.log(res)
				},
			})
		},
		// 打印
		senBleLabel() {
			if (this.currDev.length == 0) {
				uni.showToast({
					title: '请先连接蓝牙打印机',
					icon: 'error'
				})
				return
			}
			//标签模式
			let deviceId = this.currDev[0].deviceId;
			let serviceId = this.currDev[0].services[0].serviceId;
			let characteristicId = this.currDev[0].services[0].characteristicId;
			var command = tsc.jpPrinter.createNew()
			console.log('command', command)
			//DaYin这个字段存放我们需要打印的数据
			let DaYin = [{
				Customer: 'xxx',
				Rolls: 1,
				GrayID: 'xxxx',
				LotNo: 'xxxx',
				GrayTypeName: 'xxxx'
			}]

			command.setSize(40, 30)
			command.setGap(2)
			command.setCls()
			command.setText(50, 10, "TSS24.BF2", 1, 1, "打印测试")
			command.setQR(50, 50, "L", 5, "A", "977767937@qq.com")
			command.setPagePrint()
			this.senBlData(deviceId, serviceId, characteristicId, command.getData())
		},
		senBlData(deviceId, serviceId, characteristicId, uint8Array) {
			console.log('************deviceId = [' + deviceId + ']  serviceId = [' + serviceId + '] characteristics=[' +
				characteristicId + "]")
			var uint8Buf = Array.from(uint8Array);

			function split_array(datas, size) {
				var result = {};
				var j = 0
				for (var i = 0; i < datas.length; i += size) {
					result[j] = datas.slice(i, i + size)
					j++
				}
				console.log(result)
				return result
			}
			var sendloop = split_array(uint8Buf, 20);

			function realWriteData(sendloop, i) {
				var data = sendloop[i]
				if (typeof(data) == "undefined") {
					return
				}
				console.log("第【" + i + "】次写数据" + data)
				var buffer = new ArrayBuffer(data.length)
				var dataView = new DataView(buffer)
				for (var j = 0; j < data.length; j++) {
					dataView.setUint8(j, data[j]);
				}
				uni.writeBLECharacteristicValue({
					deviceId,
					serviceId,
					characteristicId,
					value: buffer,
					success(res) {
						realWriteData(sendloop, i + 1);
					}
				})
			}
			var i = 0;
			realWriteData(sendloop, i);
		},
		printTest() {
			const S = uni.getStorageSync('currDev')
			var printerid = S[0].deviceId
			// return false
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
			console.log(data,'data======')
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
	}
}
