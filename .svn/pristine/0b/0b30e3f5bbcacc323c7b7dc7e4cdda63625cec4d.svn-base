var device = null,
	BAdapter = null,
	BluetoothAdapter = null,
	uuid = null,
	UUID = null,
	main = null,
	bluetoothSocket = null;
var OutputStreamWriter = null;

OutputStreamWriter = plus.android.importClass("java.io.OutputStreamWriter");

export const IsNullOrEmpty = function(obj) {
	if (obj == null || obj.length == 0) {
		return true;
	} else {
		return false;
	}
}

export const GetValueOrEmpty = function(obj) {
	if (IsNullOrEmpty(obj)) {
		return "";
	} else {
		return obj;
	}
}

//打印标签
export const print_label_ble = function(data) {
	const printerid = uni.getStorageSync('ble_printerId')
	if (printerid) {
		if (printerid != null && printerid.length > 0) {
			var str = get_printstr(data, true)
			console.log('---------print_label_ble---------');
			print_ble(printerid, str);
		}
	} else {
		uni.showModal({
			title: '提示',
			content: '请先选择已配对的蓝牙打印机, 再进行测试.',
			confirmText: '去设置',
			showCancel: true,
			success: _ => {
				if (_.confirm) {

				}
			}
		})
	}
}

//内箱标签
export const print_label_s_ble = function(data) {
	const printerid = uni.getStorageSync('ble_printerId')
	if (printerid) {
		if (printerid != null && printerid.length > 0) {
			var str = get_printstr_S(data);
			print_ble(printerid, str);
		}
	} else {
		uni.showModal({
			title: '提示',
			content: '请先选择已配对的蓝牙打印机, 再进行测试.',
			confirmText: '去设置',
			showCancel: true,
			success: _ => {
				if (_.confirm) {
					uni.navigateTo({
						url: '/pages/DefaultPrintSet/index'
					})
				}
			}
		})
	}
}

export const get_printer_ip = function() {
	var printerip = uni.getStorageSync('printerip')
	if (IsNullOrEmpty(printerip)) {
		printerip = '';
	}
	return printerip;
}

//获取打印机类型
export const get_printer_type = function() {
	var printer_type = uni.getStorageSync('printer_type')
	if (IsNullOrEmpty(printer_type)) {
		printer_type = '1';
	}
	return printer_type;
}

export const set_printer_ip = function(printer_ip) {
	if (!IsNullOrEmpty(printer_ip)) {
		uni.setStorageSync('printerip', printer_ip)
	}
}

//打印标签
export const print_barode = function(data) {
	var printer_type = get_printer_type();
	if (printer_type == '1') {
		var str = get_printstr(data, false);
		return printSocket(str);
	} else if (printer_type == '2') {
		return print_label_ble(data, true);
	}
}

//打印内箱标签
export const print_barode_s = function(data) {
	var printer_type = get_printer_type();
	if (printer_type == '1') {
		var str = get_printstr_S(data);
		return printSocket(str);
	} else if (printer_type == '2') {
		return print_label_s_ble(data);
	}
}

export const getstr = function() {
	var data = {
		ReelCode: "SE2018060405B01",
		PartNo: "60016711",
		QtyWithUnit: "12000 PC",
		BatchNo: "8888888888ddd",
		Remark: "非静电敏感*5301*3010*1928100199",
		QrCode: "SM00000191008566084|P60016711|Q12000|9D1941|1T1928100199|R|2T8888888888",
	};

	var s1 = "";
	var s2 = "";
	var s3 = "";
	var s4 = "";
	var s5 = "";
	var qrcode = "";
	if (!IsNullOrEmpty(data.ReelCode)) {
		s1 = data.ReelCode;
	}
	if (!IsNullOrEmpty(data.PartNo)) {
		s2 = data.PartNo;
	}
	if (!IsNullOrEmpty(data.QtyWithUnit)) {
		s3 = data.QtyWithUnit;
	}
	if (!IsNullOrEmpty(data.BatchNo)) {
		s4 = data.BatchNo;
	}
	if (!IsNullOrEmpty(data.Remark)) {
		s5 = data.Remark;
	}
	if (!IsNullOrEmpty(data.QrCode)) {
		qrcode = data.QrCode;
	}

	var str = " ! 0 200 200 216 1 " + '\r\n';
	str += "PAGE-WIDTH 460" + '\r\n';

	str += "BOX  5 0 460 210 2" + '\r\n';
	str += "LINE 5 40 300 40 2" + '\r\n';
	str += "LINE 5 80 300 80 2" + '\r\n';
	str += "LINE 5 120 300 120 2" + '\r\n';
	str += "LINE 5 160 460 160 2" + '\r\n';
	str += "LINE 67 0 67 210 2" + '\r\n';
	str += "LINE 300 0 300 160 2" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 24 0 16 15 ICT  " + s1 + '\r\n';
	str += "TEXT 24 0 16 55 料号 " + s2 + '\r\n';
	str += "TEXT 24 0 16 95 数量 " + s3 + '\r\n';
	str += "TEXT 24 0 16 135 批次 " + s4 + '\r\n';
	str += "TEXT 24 0 16 175 备注 " + s5 + '\r\n';

	str += "B QR 307 10 M 2 U 4" + '\r\n';
	str += "MA," + qrcode + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}

//讯强模板 
export const getstr_xq = function() {
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
		VendorCode: "PRC00001",
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
	if (!IsNullOrEmpty(data.VendorName)) {
		vendorName = data.VendorName;
	}
	if (!IsNullOrEmpty(data.PartNo)) {
		partNo = data.PartNo;
	}
	if (!IsNullOrEmpty(data.Qty)) {
		qty = data.Qty;
	}
	if (!IsNullOrEmpty(data.PartDescription)) {
		partDesc = data.PartDescription;
	}
	if (!IsNullOrEmpty(data.ReelCode)) {
		reelCode = data.ReelCode;
	}
	if (!IsNullOrEmpty(data.DShippingDate)) {
		dShippingDate = data.DShippingDate;
	}
	if (!IsNullOrEmpty(data.DateCode)) {
		dateCode = data.DateCode;
	}
	if (!IsNullOrEmpty(data.ShippingDate)) {
		shippingDate = data.ShippingDate;
	}
	if (!IsNullOrEmpty(data.DDateCode)) {
		dDateCode = data.DDateCode;
	}
	if (!IsNullOrEmpty(data.VendorCode)) {
		vendorCode = data.VendorCode;
	}
	if (!IsNullOrEmpty(data.QrCode)) {
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

	str += "LINE 402 80 152 636 2" + '\r\n'; // 竖线
	str += "LINE 269 155 379 232 2" + '\r\n';
	str += "LINE 467 155 467 232 2" + '\r\n';
	str += "LINE 287 479 287 555 2" + '\r\n';
	str += "LINE 419 479 419 555 2" + '\r\n';
	str += "LINE 367 555 367 636 2" + '\r\n'; //最后一个空格的竖线


	str += "SETBOLD 0" + '\r\n';

	str += "SETMAG 2 2" + '\r\n';
	str += "TEXT 24 0 147 30 CoolerMaster(现品票)" + '\r\n';
	str += "TEXT 24 0 19 107 Supplyer" + '\r\n';
	str += "SETMAG 1 1" + '\r\n';
	str += "TEXT 24 0 167 107 " + vendorCode + "  " + vendorName + '\r\n';
	str += "SETMAG 2 2" + '\r\n';
	str += "TEXT 24 0 19 183 Part No" + '\r\n';
	str += "SETMAG 1 1" + '\r\n';
	str += "TEXT 24 0 167 183 " + partNo + '\r\n';
	str += "SETMAG 2 2" + '\r\n';
	str += "TEXT 24 0 397 183 Qty" + '\r\n';
	str += "TEXT 24 0 475 183 " + qty + '\r\n';
	str += "TEXT 24 0 19 260 Desc" + '\r\n';
	str += "SETMAG 1 1" + '\r\n';
	if (partDesc.length < 21) {
		str += "TEXT 24 0 167 260 " + partDesc + '\r\n';
	} else {
		var pd1 = partDesc.substr(0, 20);
		var pd2 = partDesc.substr(21);
		str += "TEXT 24 0 167 240 " + pd1 + '\r\n';
		str += "TEXT 24 0 167 267 " + pd2 + '\r\n';
	}
	str += "SETMAG 2 2" + '\r\n';
	str += "TEXT 24 0 19 391 Box NO" + '\r\n';
	str += "SETMAG 1 1" + '\r\n';
	str += "TEXT 24 0 329 345 " + reelCode + '\r\n';
	str += "TEXT 24 0 329 395 " + dShippingDate + '\r\n';
	str += "SETMAG 2 2" + '\r\n';
	str += "TEXT 24 0 19 507 生产日期" + '\r\n';
	str += "TEXT 24 0 167 507 " + dateCode + '\r\n';
	str += "TEXT 24 0 292 507 出货日期" + '\r\n';
	str += "TEXT 24 0 429 507 " + shippingDate + '\r\n';

	str += "TEXT 24 0 42 585 月份" + '\r\n';
	str += "SETMAG 4 4" + '\r\n';
	str += "TEXT 24 0 227 560 " + dDateCode + '\r\n';
	str += "SETMAG 1 1" + '\r\n';

	str += "B QR 167 323 M 2 U 4" + '\r\n';
	str += "MA," + qrcode + '\r\n';
	str += "ENDQR" + '\r\n';

	/*标签检测 begin*/
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';
	/*标签检测 end*/

	str += "PRINT " + '\r\n';

	return str;
}

export const PrinterIsReady = function() {
	var printer_type = get_printer_type();
	if (printer_type == '2') {
		return PrinterIsReady_ble();
	}

	var ip = get_printer_ip();

	if (IsNullOrEmpty(ip)) {
		uni.showToast({
			title: "WIFI打印机IP没有设定，请先设置好, 再使用."
		})
		return false;
	}
	if (plus.os.name == "Android") {
		var Socket = plus.android.importClass("java.net.Socket");
		var InetSocketAddress = plus.android.importClass("java.net.InetSocketAddress");
		var socket;
		var outputStream;
		//解决高低版本兼容
		var StrictMode = plus.android.importClass("android.os.StrictMode");
		var Build = plus.android.importClass("android.os.Build");
		if (Build.VERSION.SDK_INT > 9) {
			var policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
			StrictMode.setThreadPolicy(policy);
		}

		try {
			//socket = new Socket(ip, 9100);
			socket = new Socket();
			socket.connect(new InetSocketAddress(ip, 9100), 1500); //设置连接请求超时时间1.5秒

			socket.setSoTimeout(5000);
			socket.setKeepAlive(true);
			outputStream = socket.getOutputStream();
			plus.android.importClass(outputStream);

			//var bytes = plus.android.invoke("", 'getBytes', 'gbk');
			//outputStream.write(bytes);
			//outputStream.flush(); 
			socket.shutdownOutput();
		} catch (e) {
			uni.showModal({
				title: '提示',
				content: "网络连接超时，请确认打印机有没有打开或连接！",
				showCancel: false
			})
			return false;
		}
	}
	return true;
}

//蓝牙
export const PrinterIsReady_ble = function() {
	if (localStorage.getItem('ble_printerId')) {
		var printerid = localStorage.getItem('ble_printerId');
		if (printerid == null || printerid.length <= 0) {
			uni.showToast({
				title: '请选择蓝牙打印机.'
			})
			return false;
		}
		try {
			BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
			UUID = plus.android.importClass("java.util.UUID");
			uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
			BAdapter = BluetoothAdapter.getDefaultAdapter();
			BAdapter.enable();

			device = BAdapter.getRemoteDevice(printerid);
			plus.android.importClass(device);
			console.log('test blu print.');
			bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
			plus.android.importClass(bluetoothSocket);

			if (!bluetoothSocket.isConnected()) {
				bluetoothSocket.connect();
			}

		} catch (ex) {
			bluetoothSocket.close();
			uni.showModal({
				title: '提示',
				content: ex.message,
				showCancel: false
			})
			return false;
		}
	} else {
		uni.showToast({
			title: '请先选择已配对的蓝牙打印机.'
		})
		return false;
	}

	return true;
}

//WIFI打印
export const printSocket = function(str) {
	var ip = get_printer_ip();

	if (IsNullOrEmpty(ip)) {
		uni.showToast({
			title: "WIFI打印机IP没有设定，请先设置好, 再使用."
		})
		return false;
	}
	if (plus.os.name == "Android") {
		var Socket = plus.android.importClass("java.net.Socket");
		var InetSocketAddress = plus.android.importClass("java.net.InetSocketAddress");
		var socket;
		var outputStream;
		//解决高低版本兼容
		var StrictMode = plus.android.importClass("android.os.StrictMode");
		var Build = plus.android.importClass("android.os.Build");
		if (Build.VERSION.SDK_INT > 9) {
			var policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
			StrictMode.setThreadPolicy(policy);
		}

		try {
			uni.showLoading({
				title: "正在打印中..."
			})
			//socket = new Socket(ip, 9100);
			socket = new Socket();
			socket.connect(new InetSocketAddress(ip, 9100), 1500); //设置连接请求超时时间1.5秒
			socket.setSoTimeout(5000);

			socket.setKeepAlive(true);
			outputStream = socket.getOutputStream();
			plus.android.importClass(outputStream);

			var bytes = plus.android.invoke(str, 'getBytes', 'gbk');
			//var bytes = plus.android.invoke(str, 'getBytes', 'UTF-8');
			outputStream.write(bytes);
			outputStream.flush();
			socket.shutdownOutput();
			return true;
		} catch (e) {
			uni.showToast({
				title: "WIFI打印机连接超时，请确定是否有正确设置打印机的IP地址或者确认打印机是否有开机！"
			})
			return false;
			//TODO handle the exception
		} finally {
			uni.hideLoading()
		}
	}
}

//蓝牙打印
export const print_ble = function(mac_address, str) {
	if (!mac_address) {
		uni.showToast({
			title: '请选择蓝牙打印机'
		})
		return
	}
	/* if (IsNullOrEmpty(data)) {
		mui.toast('请提供打印数据.');
		return;
	} */

	main = plus.android.runtimeMainActivity();
	BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
	UUID = plus.android.importClass("java.util.UUID");
	uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
	BAdapter = BluetoothAdapter.getDefaultAdapter();
	if (!BAdapter.isEnabled()) {
		uni.showModal({
			title: '提示',
			content: "蓝牙处于关闭状态，是否打开？",
			success: _ => {
				if (_.confirm) {
					BAdapter.enable();
				}
			}
		})
		console.log("蓝牙处于关闭状态，正在打开...");
		return;
	}
	try {
		device = BAdapter.getRemoteDevice(mac_address);

		plus.android.importClass(device);
		bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
		plus.android.importClass(bluetoothSocket);
		if (!bluetoothSocket.isConnected()) {
			console.log('检测到设备未连接，尝试连接....');
			bluetoothSocket.connect();
		}
	} catch (ex) {
		console.log(JSON.stringify(ex));
		uni.showModal({
			title: '提示',
			content: "设备连接出错,请确认打印机是否开启." + GetValueOrEmpty(ex.message),
			showCancel: false
		})
		bluetoothSocket.close();
		return;
	}
	uni.showToast({
		title: '设备已连接'
	})
	console.log('设备已连接');

	if (bluetoothSocket.isConnected()) {
		var outputStream = bluetoothSocket.getOutputStream();
		plus.android.importClass(outputStream);

		//outputStream.write([0x1B, 0x40]); //打印复位
		//outputStream.flush();

		console.log(str);
		var bytes = plus.android.invoke(str, 'getBytes', 'gbk');
		outputStream.write(bytes);
		outputStream.flush();

		device = null //这里关键  
		bluetoothSocket.close();
	} else {
		uni.showModal({
			title: '提示',
			content: '设备连接不成功',
			showCancel: false
		})
	}
}

//蓝牙打印测试
export const print_ble_test = function() {

	if (localStorage.getItem('ble_printerId')) {
		var printerid = localStorage.getItem('ble_printerId');
		console.log(printerid, "printerid");
		if (printerid != null && printerid.length > 0) {
			var data = {
				VendorCode: "PRC00001",
				VendorName: "AS电子有限公司",
				PartNo: "600014910-01-GP2",
				Qty: "800",
				QtyWithUnit: "800件",
				PartName: "水冷板CNC1(上盖+下盖+水嘴)-去油",
				PartDesc: "dkady334",
				LotCode: "21e",
				ReelCode: "M0000019100856608",
				DShippingDate: "2020-04-11",
				DateCode: "200408",
				ShippingDate: "20200411",
				DDateCode: "4月",
				QrCode: "SM0000019100856608|P600014910-01-GP2|Q800|9D2004|1T1928100199|R|2T8888888888|KCM",
			};
			var str = get_print_ble_demostr(data);
			print_ble(printerid, str);
		}
	} else {
		uni.showModal({
			title: '提示',
			content: "请先选择已配对的蓝牙打印机, 再进行测试.",
			confirmText: '去设置',
			success: _ => {
				uni.navigateTo({
					url: '/pages/DefaultPrintSet/index'
				})
			}
		})
	}
}

//蓝牙打印测试字符串 
export const get_print_ble_demostr = function(data) {
	var space = "";
	// 75mm * 50mm 
	var str = " ! 0 200 200 400 1 " + '\r\n';
	str += "PAGE-WIDTH 600" + '\r\n';

	str += "SETBOLD 2" + '\r\n';
	str += "TEXT 24 0 25 0 创维 \r\n";
	str += "TEXT 24 0 365 0 物 料 标 签 \r\n";

	str += "LINE 0 42 590 42 3" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "BARCODE 128 0 1 40 20 55 " + GetValueOrEmpty(data.ReelCode) + " \r\n";
	str += "TEXT 24 0 20 98 " + GetValueOrEmpty(data.ReelCode) + " \r\n";

	str += "BARCODE 128 0 1 40 20 130 " + GetValueOrEmpty(data.PartNo) + " \r\n";
	str += "TEXT 24 0 20 175 " + GetValueOrEmpty(data.PartNo) + " \r\n";

	str += "TEXT 24 0 300 175 数量: \r\n";
	str += "TEXT 24 0 385 175 " + GetValueOrEmpty(data.QtyWithUnit) + '\r\n';

	str += "TEXT 24 0 20 210 物料名称: \r\n";
	str += "TEXT 24 0 125 210 " + GetValueOrEmpty(data.PartName) + '\r\n';

	str += "TEXT 24 0 20 240 物料规格: \r\n";
	str += "TEXT 24 0 125 240 " + GetValueOrEmpty(data.PartDesc) + '\r\n';

	str += "TEXT 24 0 20 270 供应商: \r\n";
	str += "TEXT 24 0 125 270 " + GetValueOrEmpty(data.VendorName) + '\r\n';

	str += "TEXT 24 0 20 300 生产日期:\r\n";
	str += "TEXT 24 0 140 300 " + GetValueOrEmpty(data.DateCode) + '\r\n';

	str += "TEXT 24 0 300 300 批次号:\r\n";
	str += "TEXT 24 0 385 300 " + GetValueOrEmpty(data.LotCode) + '\r\n';

	var qrcode = "";
	if (!IsNullOrEmpty(data.QrCode)) {
		qrcode = data.QrCode;
	}

	str += "B QR 380 55 M 2 U 3" + '\r\n';
	str += "MA," + qrcode + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';
	str += "PRINT " + '\r\n';

	return str;
}

export const get_printstr = function(data, isBle) {
	var bcdType = GetValueOrEmpty(data.BcdType);
	var result = "";
	switch (bcdType) {
		case 'Y':
			result = get_printstr_Y(data);
			break;
		case 'Z':
			result = get_printstr_Z(data);
			break;
		case 'J':
			result = get_printstr_J(data);
			break;
		case 'S':
			result = get_printstr_S(data);
			break;
		case 'CVTE':
			result = get_printstr_CVTE(data);
			break;
		default:
			result = get_printstr_Y(data);
	}
	return result;
}

//外箱标签采用规格: 10cm X 10cm ，内箱标签规格: 80cm X 50cm . 条码标识关键字， 
//BCD_TYPE为Y, Z, J  , S ;   
//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签 
export const get_printstr_Y = function(data) {
	// var data = {
	// 	VendorCode:"PRC00001",
	// 	VendorName: "XX电子有限公司-SFD电子有限公司",
	// 	PartNo: "600014910-01-GP2",
	// 	Qty: "800",
	// 	Unit: "PCS",
	// 	PartDescription: "水冷板CNC1(上盖+下盖+水嘴)-去油水冷板CNC1水冷板CNC1",
	// 	ReelCode: "M0000019100856608",
	// 	MakerPN: "MP-600014910-02",
	// 	MakerCode: "MP10108",
	// 	MakerName: "SDRI制造电子有限公司电子有限公司",
	// 	BatchNo: "msdo20023",
	// 	COO: "中国广州",
	// 	BOX_NUMBER: "BOX001",
	// 	Brand: "EKS",
	// 	PO: "P600014910-02",
	// 	ProductionDate: "2018-6-13",
	// 	DeliveryDate: "2018-7-13",
	// 	CartonSize: "10*12*9",
	// 	BcdType: "Y",
	// 	GrossWeight: "100",
	// 	NetWeight: "90",
	// 	Bu: "P02",
	// 	Sic: "SIC01",
	// 	MakerAddress: "东莞电子有限公司东莞电子有限公司东莞电子有限公司",
	// 	VendorAddress: "广州电子有限公司东莞电子有限公司东莞电子有限公司",
	// 	QrCode: "J:475C-M61100-0080:SH090:3250:6D39D7BC1F094011B7ACFBB972616766:1.9:0.302:1100:PM00:EA:AK20050014::制造商型号:制造商型号:20200522:20200522:20200522:制造商型号:D20200525:制造商型号:0",
	// };
	var space = "";
	// 100mm X 100mm 
	var str = " ! 0 200 200 750 1 " + '\r\n';
	str += "PAGE-WIDTH 850" + '\r\n';

	str += "BOX  26 0 805 750 3" + '\r\n';
	str += "LINE 26 58 805 58 3" + '\r\n';
	str += "LINE 26 116 805 116 3" + '\r\n';
	str += "LINE 26 174 805 174 3" + '\r\n';
	str += "LINE 26 232 805 232 3" + '\r\n';
	str += "LINE 26 289 805 289 3" + '\r\n';
	str += "LINE 26 346 805 346 3" + '\r\n';
	str += "LINE 26 403 805 403 3" + '\r\n';

	str += "LINE 26 461 480 461 3" + '\r\n';
	str += "LINE 26 519 480 519 3" + '\r\n';
	str += "LINE 26 577 480 577 3" + '\r\n';
	str += "LINE 26 635 480 635 3" + '\r\n';
	str += "LINE 26 693 480 693 3" + '\r\n';

	str += "LINE 220 0 220 800 3" + '\r\n'; //竖线 
	str += "LINE 480 0 480 800 3" + '\r\n';
	str += "LINE 330 0 330 57 3" + '\r\n';
	str += "LINE 650 61 650 403 3" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 24 0 45 5 类型  " + '\r\n Type \r\n';
	str += "TEXT 24 0 255 15 " + GetValueOrEmpty(data.BcdType) + ' \r\n';
	str += "TEXT 55 0 45 35 Type  " + '\r\n ';

	str += "TEXT 24 0 45 65 供应商代码 " + space + '\r\n Supplier Code \r\n';
	str += "TEXT 24 0 225 75 " + GetValueOrEmpty(data.VendorCode) + ' \r\n';
	str += "TEXT 55 0 45 92 Supplier Code \r\n";

	str += "TEXT 24 0 45 130 唯一码 " + space + '\r\n';
	if (data.ReelCode.gblen() <= 28) {
		str += "TEXT 24 0 225 135 " + GetValueOrEmpty(data.ReelCode) + ' \r\n';
	} else {
		str += "TEXT 55 0 225 144 " + GetValueOrEmpty(data.ReelCode) + ' \r\n';
	}
	str += "TEXT 55 0 45 155 Unique Code \r\n";

	str += "TEXT 24 0 45 185 工厂库位 " + space + '\r\n ';
	str += "TEXT 24 0 225 195 " + GetValueOrEmpty(data.Bu) + ':' + GetValueOrEmpty(data.Sic) + ' \r\n';
	str += "TEXT 55 0 45 213  Location \r\n";

	str += "TEXT 24 0 45 245 采购订单编号 " + space + '\r\n';
	str += "TEXT 24 0 225 255 " + GetValueOrEmpty(data.PO) + '\r\n ';
	str += "TEXT 55 0 45 272 Purchase Order Number \r\n";

	str += "TEXT 24 0 45 297 品牌 " + space + '\r\n';
	str += "TEXT 24 0 225 315 " + GetValueOrEmpty(data.Brand) + '\r\n ';
	str += "TEXT 55 0 45 327 Brand \r\n";

	str += "TEXT 24 0 45 360 制造商型号 " + space + '\r\n ';
	str += "TEXT 24 0 225 375 " + GetValueOrEmpty(data.MakerPN) + '\r\n';
	str += "TEXT 55 0 45 386 Manufacturer P/N \r\n";

	str += "TEXT 24 0 45 415 产品名称 " + space + '\r\n';
	var partDesc = GetValueOrEmpty(data.PartDescription);
	if (partDesc.gblen() < 21) {
		str += "TEXT 24 0 225 425 " + partDesc + '\r\n';
	} else {
		var pd1 = partDesc.substr(0, 17);
		var pd2 = partDesc.substr(17, 17);
		str += "TEXT 55 0 225 415 " + pd1 + '\r\n';
		str += "TEXT 55 0 225 440 " + pd2 + '\r\n';
	}
	str += "TEXT 55 0 45 442 Product Name \r\n";

	str += "TEXT 24 0 45 465 供应商全称 " + space + '\r\n';
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen() < 21) {
		str += "TEXT 24 0 225 480 " + vendorName + '\r\n';
	} else {
		var vn1 = vendorName.substr(0, 17);
		var vn2 = vendorName.substr(17, 17);
		str += "TEXT 55 0 225 472 " + vn1 + '\r\n';
		str += "TEXT 55 0 225 498 " + vn2 + '\r\n';
	}
	str += "TEXT 55 0 45 492 Supplier Name \r\n";

	str += "TEXT 24 0 45 530 制造商名称 " + space + '\r\n';
	var makerName = GetValueOrEmpty(data.MakerName);
	if (makerName.gblen() < 21) {
		str += "TEXT 24 0 225 545 " + makerName + '\r\n';
	} else {
		var mn1 = makerName.substr(0, 17);
		var mn2 = makerName.substr(17, 17);
		str += "TEXT 55 0 225 534 " + mn1 + '\r\n';
		str += "TEXT 55 0 225 562 " + mn2 + '\r\n';
	}
	str += "TEXT 55 0 45 557 Manufacturer Name \r\n";

	str += "TEXT 24 0 45 580 制造商地址 " + space + '\r\n';
	var makerAddress = GetValueOrEmpty(data.MakerAddress);
	if (makerAddress.gblen() < 21) {
		str += "TEXT 24 0 225 595 " + makerAddress + '\r\n';
	} else {
		var md1 = makerAddress.substr(0, 17);
		var md2 = makerAddress.substr(17, 17);
		str += "TEXT 55 0 225 589 " + md1 + '\r\n';
		str += "TEXT 55 0 225 613 " + md2 + '\r\n';
	}
	str += "TEXT 55 0 45 605 Manufacturer Add \r\n";

	str += "TEXT 24 0 45 640 供应商地址 " + space + '\r\n';
	var vendorAddress = GetValueOrEmpty(data.VendorAddress);
	if (vendorAddress.gblen() < 21) {
		str += "TEXT 24 0 225 645 " + vendorAddress + '\r\n';
	} else {
		var vd1 = vendorAddress.substr(0, 17);
		var vd2 = vendorAddress.substr(17, 17);
		str += "TEXT 55 0 225 639 " + vd1 + '\r\n';
		str += "TEXT 55 0 225 667 " + vd2 + '\r\n';
	}
	str += "TEXT 55 0 45 665 Supplier Address \r\n";

	str += "TEXT 24 0 45 698 原产地 " + space + '\r\n';
	str += "TEXT 24 0 225 705 " + GetValueOrEmpty(data.COO) + '\r\n';
	str += "TEXT 55 0 45 725 Country of Origin \r\n";

	str += "TEXT 24 0 330 5 创维物料编号 " + '\r\n';
	str += "TEXT 24 0 485 15 " + GetValueOrEmpty(data.PartNo) + '\r\n';
	str += "TEXT 55 0 340 40 SKYWORTH P/N \r\n";

	str += "TEXT 24 0 490 65 数量/单位 " + space + '\r\n';
	str += "TEXT 24 0 655 75 " + GetValueOrEmpty(data.Qty) + ':' + GetValueOrEmpty(data.Unit) + ' \r\n';
	str += "TEXT 55 0 490 92 QTY/Unit \r\n";

	str += "TEXT 24 0 487 125 毛重/净重(KG) " + space + '\r\n';
	str += "TEXT 24 0 655 135 " + GetValueOrEmpty(data.GrossWeight) + '/' + GetValueOrEmpty(data.NetWeight) + ' \r\n';
	str += "TEXT 55 0 490 152 G.W./N.W. \r\n";

	str += "TEXT 24 0 490 185 生产批次 " + space + '\r\n';
	str += "TEXT 24 0 655 195 " + GetValueOrEmpty(data.BatchNo) + '\r\n';
	str += "TEXT 55 0 490 212 Batch \r\n";

	str += "TEXT 24 0 482 245 包装箱尺寸(cm) " + space + '\r\n';
	str += "TEXT 24 0 655 255 " + GetValueOrEmpty(data.CartonSize) + '\r\n';
	str += "TEXT 55 0 490 272 Carton Size \r\n";

	str += "TEXT 24 0 490 300 出厂日期 " + space + '\r\n';
	str += "TEXT 24 0 655 315 " + GetValueOrEmpty(data.DeliveryDate) + '\r\n';
	str += "TEXT 55 0 490 327 Delivery Date \r\n";

	str += "TEXT 24 0 490 360 生产日期 " + space + '\r\n';
	str += "TEXT 24 0 655 375 " + GetValueOrEmpty(data.ProductionDate) + '\r\n';
	str += "TEXT 55 0 490 387 Production Date \r\n";

	str += "B QR 495 430 M 2 U 5" + '\r\n';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签
export const get_printstr_Z = function(data) {
	var space = "";
	// 100mm X 100mm
	var str = " ! 0 200 200 750 1 " + '\r\n';
	str += "PAGE-WIDTH 850" + '\r\n';

	str += "BOX  25 0 805 750 3" + '\r\n';
	str += "LINE 25 50 805 50 3" + '\r\n';
	str += "LINE 25 100 805 100 3" + '\r\n';
	str += "LINE 25 150 805 150 3" + '\r\n';
	str += "LINE 25 200 805 200 3" + '\r\n';
	str += "LINE 25 250 805 250 3" + '\r\n';
	str += "LINE 25 300 805 300 3" + '\r\n';
	str += "LINE 25 350 805 350 3" + '\r\n';
	str += "LINE 25 400 805 400 3" + '\r\n';

	str += "LINE 25 450 480 450 3" + '\r\n';
	str += "LINE 25 500 480 500 3" + '\r\n';
	str += "LINE 25 550 480 550 3" + '\r\n';
	str += "LINE 25 600 480 600 3" + '\r\n';
	str += "LINE 25 650 480 650 3" + '\r\n';
	str += "LINE 25 700 480 700 3" + '\r\n';

	str += "LINE 220 0 220 800 3" + '\r\n'; //竖线
	str += "LINE 315 0 315 50 3" + '\r\n';
	str += "LINE 480 0 480 800 3" + '\r\n';
	str += "LINE 655 50 655 400 3" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 24 0 45 5 类型  " + space + '\r\n';
	str += "TEXT 24 0 255 15 " + GetValueOrEmpty(data.BcdType) + ' \r\n';
	str += "TEXT 55 0 45 28 Type \r\n";

	str += "TEXT 24 0 45 55 供应商代码 " + space + '\r\n';
	str += "TEXT 24 0 240 65 " + GetValueOrEmpty(data.VendorCode) + ' \r\n';
	str += "TEXT 55 0 45 78 Supplier Code \r\n";

	str += "TEXT 24 0 45 105 唯一码 " + space + '\r\n';
	if (data.ReelCode.gblen() <= 28) {
		str += "TEXT 24 0 240 115 " + GetValueOrEmpty(data.ReelCode) + ' \r\n';
	} else {
		str += "TEXT 55 0 240 125 " + GetValueOrEmpty(data.ReelCode) + ' \r\n';
	}
	str += "TEXT 55 0 45  128 Unique Code \r\n";

	str += "TEXT 24 0 45 155 工厂库位 " + space + '\r\n';
	str += "TEXT 24 0 240 165 " + GetValueOrEmpty(data.Bu) + ':' + GetValueOrEmpty(data.Sic) + ' \r\n';
	str += "TEXT 55 0 45 178 Location \r\n";

	str += "TEXT 24 0 45 205 采购订单编号 " + space + '\r\n';
	str += "TEXT 24 0 240 215 " + GetValueOrEmpty(data.PO) + '\r\n ';
	str += "TEXT 55 0 45 228 Purchase Order Number \r\n";

	str += "TEXT 24 0 45 255 生产批次 " + space + '\r\n';
	str += "TEXT 24 0 240 265 " + GetValueOrEmpty(data.BatchNo) + '\r\n';
	str += "TEXT 55 0 45 278 Batch \r\n";

	str += "TEXT 24 0 45 305 品牌 " + space + '\r\n';
	str += "TEXT 24 0 240 315 " + GetValueOrEmpty(data.Brand) + '\r\n ';
	str += "TEXT 55 0 45 328 Brand \r\n";

	str += "TEXT 24 0 45 355 制造商型号 " + space + '\r\n';
	str += "TEXT 24 0 240 365 " + GetValueOrEmpty(data.MakerPN) + '\r\n';
	str += "TEXT 55 0 45 378 Manufacturer P/N \r\n";

	str += "TEXT 24 0 45 405 销售项目编号" + space + '\r\n';
	str += "TEXT 24 0 240 415 " + GetValueOrEmpty(data.Sales_NUMBER) + ':' + GetValueOrEmpty(data.Sales_Project_Number) +
		'\r\n';
	str += "TEXT 55 0 45 428 Manufacturer P/N \r\n";

	str += "TEXT 24 0 45 455 产品名称 " + space + '\r\n';
	var partDesc = GetValueOrEmpty(data.PartDescription);
	if (partDesc.gblen() < 21) {
		str += "TEXT 24 0 225 465 " + partDesc + '\r\n';
	} else {
		var pd1 = partDesc.substr(0, 17);
		var pd2 = partDesc.substr(17, 17);
		str += "TEXT 55 0 225 456 " + pd1 + '\r\n';
		str += "TEXT 55 0 225 480 " + pd2 + '\r\n';
	}
	str += "TEXT 55 0 45 478 Product Name \r\n";

	str += "TEXT 24 0 45 505 制造商全称 " + space + '\r\n';
	var makerName = GetValueOrEmpty(data.MakerName);
	if (makerName.gblen() < 21) {
		str += "TEXT 24 0 225 515 " + makerName + '\r\n';
	} else {
		var mn1 = makerName.substr(0, 17);
		var mn2 = makerName.substr(17, 17);
		str += "TEXT 55 0 225 508 " + mn1 + '\r\n';
		str += "TEXT 55 0 225 534 " + mn2 + '\r\n';
	}
	str += "TEXT 55 0 45 528 Manufacturer Name \r\n";

	str += "TEXT 24 0 45 555 制造商地址 " + space + '\r\n';
	var makerAddress = GetValueOrEmpty(data.MakerAddress);
	if (makerAddress.gblen() < 21) {
		str += "TEXT 24 0 225 565 " + makerAddress + '\r\n';
	} else {
		var md1 = makerAddress.substr(0, 17);
		var md2 = makerAddress.substr(17, 17);
		str += "TEXT 55 0 225 558 " + md1 + '\r\n';
		str += "TEXT 55 0 225 584 " + md2 + '\r\n';
	}
	str += "TEXT 55 0 45 578 Manufacturer Add \r\n";

	str += "TEXT 24 0 45 605 供应商名称 " + space + '\r\n';
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen() < 21) {
		str += "TEXT 24 0 225 615 " + vendorName + '\r\n';
	} else {
		var vn1 = vendorName.substr(0, 17);
		var vn2 = vendorName.substr(17, 17);
		str += "TEXT 55 0 225 608 " + vn1 + '\r\n';
		str += "TEXT 55 0 225 634 " + vn2 + '\r\n';
	}
	str += "TEXT 55 0 45 628 Supplier Name \r\n";

	str += "TEXT 24 0 45 655 供应商地址 " + space + '\r\n';
	var vendorAddress = GetValueOrEmpty(data.VendorAddress);
	if (vendorAddress.gblen() < 21) {
		str += "TEXT 55 0 225 665 " + vendorAddress + '\r\n';
	} else {
		var vd1 = vendorAddress.substr(0, 17);
		var vd2 = vendorAddress.substr(17, 17);
		str += "TEXT 55 0 225 658 " + vd1 + '\r\n';
		str += "TEXT 55 0 225 684 " + vd2 + '\r\n';
	}
	str += "TEXT 55 0 45 678 Supplier Address \r\n";

	str += "TEXT 24 0 45 705 备注 " + space + '\r\n';
	var remark = GetValueOrEmpty(data.Remark);
	if (remark.gblen() < 21) {
		str += "TEXT 24 0 225 715 " + remark + '\r\n';
	} else {
		var rm1 = remark.substr(0, 17);
		var rm2 = remark.substr(17, 17);
		str += "TEXT 55 0 225 708 " + rm1 + '\r\n';
		str += "TEXT 55 0 225 732 " + rm2 + '\r\n';
	}
	str += "TEXT 55 0 45 728 Remarks \r\n";

	str += "TEXT 24 0 320 5 创维物料编号  " + space + '\r\n';
	str += "TEXT 24 0 490 15 " + GetValueOrEmpty(data.PartNo) + '\r\n';
	str += "TEXT 55 0 330 28 SKYWORTH P/N \r\n";

	str += "TEXT 24 0 490 55 数量/单位 " + space + '\r\n';
	str += "TEXT 24 0 660 65 " + GetValueOrEmpty(data.Qty) + ':' + GetValueOrEmpty(data.Unit) + ' \r\n';
	str += "TEXT 55 0 500 78 QTY/Unit \r\n";

	str += "TEXT 24 0 490 105 毛重/净重(KG) " + space + '\r\n';
	str += "TEXT 24 0 660 115 " + GetValueOrEmpty(data.GrossWeight) + '/' + GetValueOrEmpty(data.NetWeight) + ' \r\n';
	str += "TEXT 55 0 500 128 G.W./N.W. \r\n";

	str += "TEXT 24 0 490 155 生产日期 " + space + '\r\n';
	str += "TEXT 24 0 660 165 " + GetValueOrEmpty(data.ProductionDate) + '\r\n';
	str += "TEXT 55 0 500 178 Production Date \r\n";

	str += "TEXT 24 0 490 205 包装箱尺寸(cm) " + space + '\r\n';
	str += "TEXT 24 0 660 215 " + GetValueOrEmpty(data.CartonSize) + '\r\n';
	str += "TEXT 55 0 500 228 Carton Size \r\n";

	str += "TEXT 24 0 490 255 出厂日期 " + space + '\r\n';
	str += "TEXT 24 0 660 265 " + GetValueOrEmpty(data.DeliveryDate) + '\r\n';
	str += "TEXT 55 0 500 278 Delivery Date \r\n";

	str += "TEXT 24 0 490 305 生产订单编号 " + space + '\r\n';
	str += "TEXT 24 0 660 315 " + GetValueOrEmpty(data.ORDER_NUMBER) + '\r\n';
	str += "TEXT 55 0 500 328 Order Number \r\n";

	str += "TEXT 24 0 490 355 生产箱号 " + space + '\r\n';
	str += "TEXT 24 0 660 365 " + GetValueOrEmpty(data.BOX_NUMBER) + '\r\n';
	str += "TEXT 55 0 500 378 Production Number \r\n";

	str += "B QR 490 435 M 2 U 5" + '\r\n';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签
export const get_printstr_J = function(data) {
	var space = "";
	// 100mm X 100mm
	var str = " ! 0 200 200 750 1 " + '\r\n';
	str += "PAGE-WIDTH 850" + '\r\n';

	str += "BOX  25 0 805 750 3" + '\r\n';
	str += "LINE 25 53 805 50 3" + '\r\n';

	str += "LINE 25 106 805 106 3" + '\r\n';
	str += "LINE 25 159 805 159 3" + '\r\n';
	str += "LINE 25 212 805 212 3" + '\r\n';
	str += "LINE 25 265 805 265 3" + '\r\n';
	str += "LINE 25 318 805 318 3" + '\r\n';
	str += "LINE 25 371 805 371 3" + '\r\n';
	str += "LINE 25 424 805 424 3" + '\r\n';

	str += "LINE 25 478 480 478 3" + '\r\n';
	str += "LINE 25 532 480 532 3" + '\r\n';
	str += "LINE 25 586 480 586 3" + '\r\n';
	str += "LINE 25 640 480 640 3" + '\r\n';
	str += "LINE 25 694 480 694 3" + '\r\n';

	str += "LINE 220 0 220 800 3" + '\r\n'; //竖线
	str += "LINE 120 0 120 53 3" + '\r\n';
	str += "LINE 275 0 275 53 3" + '\r\n';
	str += "LINE 330 0 330 53 3" + '\r\n';
	str += "LINE 480 0 480 800 3" + '\r\n';
	str += "LINE 655 53 655 424 3" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 24 0 45 5 类型  " + space + '\r\n';
	str += "TEXT 24 0 150 15 " + GetValueOrEmpty(data.BcdType) + ' \r\n';
	str += "TEXT 55 0 45 28 Type \r\n";

	str += "TEXT 24 0 45 58 供应商代码 " + space + '\r\n';
	str += "TEXT 24 0 225 68 " + GetValueOrEmpty(data.VendorCode) + ' \r\n';
	str += "TEXT 55 0 45 81 Supplier Code \r\n";

	str += "TEXT 24 0 45 111 唯一码 " + space + '\r\n';
	if (data.ReelCode.gblen() <= 28) {
		str += "TEXT 24 0 225 121 " + GetValueOrEmpty(data.ReelCode) + ' \n\r';
	} else {
		str += "TEXT 55 0 225 131 " + GetValueOrEmpty(data.ReelCode) + ' \n\r';
	}
	str += "TEXT 55 0 45 134 Unique Code \r\n";

	str += "TEXT 24 0 45 164 工厂库位 " + space + '\r\n';
	str += "TEXT 24 0 225 174 " + GetValueOrEmpty(data.Bu) + ':' + GetValueOrEmpty(data.Sic) + ' \r\n';
	str += "TEXT 55 0 45 187 Location \r\n";

	str += "TEXT 24 0 45 217 采购订单编号 " + space + '\r\n';
	str += "TEXT 24 0 225 227 " + GetValueOrEmpty(data.PO) + '\r\n ';
	str += "TEXT 55 0 45 240 Purchase Order Number \r\n";

	str += "TEXT 24 0 45 270 品牌 " + space + '\r\n Brand \r\n';
	str += "TEXT 24 0 225 280 " + GetValueOrEmpty(data.Brand) + '\r\n ';
	str += "TEXT 55 0 45 293 Brand \r\n";

	str += "TEXT 24 0 45 323 制造商型号 " + space + '\r\n';
	str += "TEXT 24 0 225 333 " + GetValueOrEmpty(data.MakerPN) + '\r\n';
	str += "TEXT 55 0 45 346 Manufacturer P/N \r\n";

	str += "TEXT 24 0 45 376 报关单号 " + space + '\r\n';
	str += "TEXT 24 0 225 386 " + GetValueOrEmpty(data.ENTRYID) + '\r\n';
	str += "TEXT 55 0 45 399 EntryId P/N \r\n";

	str += "TEXT 24 0 45 430 产品名称 " + space + '\r\n';
	var partDesc = GetValueOrEmpty(data.PartDescription);
	//console.log(partDesc.gblen);
	if (partDesc.gblen() < 21) {
		str += "TEXT 24 0 225 440 " + partDesc + '\r\n';
	} else {
		var pd1 = partDesc.substr(0, 17);
		var pd2 = partDesc.substr(17, 17);
		str += "TEXT 55 0 225 432 " + pd1 + '\r\n';
		str += "TEXT 55 0 225 460 " + pd2 + '\r\n';
	}
	str += "TEXT 55 0 45 453 Product Name \r\n";

	str += "TEXT 24 0 45 484 供应商全称 " + space + '\r\n';
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen() < 21) {
		str += "TEXT 24 0 225 494 " + vendorName + '\r\n';
	} else {
		var vn1 = vendorName.substr(0, 17);
		var vn2 = vendorName.substr(17, 17);
		str += "TEXT 55 0 225 486 " + vn1 + '\r\n';
		str += "TEXT 55 0 225 514 " + vn2 + '\r\n';
	}
	str += "TEXT 55 0 45 507 Supplier Name \r\n";

	str += "TEXT 24 0 45 538 制造商名称 " + space + '\r\n';
	var makerName = GetValueOrEmpty(data.MakerName);
	if (makerName.gblen() < 21) {
		str += "TEXT 24 0 225 548 " + makerName + '\r\n';
	} else {
		var mn1 = makerName.substr(0, 17);
		var mn2 = makerName.substr(17, 17);
		str += "TEXT 55 0 225 540 " + mn1 + '\r\n';
		str += "TEXT 55 0 225 548 " + mn2 + '\r\n';
	}
	str += "TEXT 55 0 45 561 Manufacturer Name \r\n";

	str += "TEXT 24 0 45 592 制造商地址 " + space + '\r\n';
	var makerAddress = GetValueOrEmpty(data.MakerAddress);
	if (makerAddress.gblen() < 21) {
		str += "TEXT 24 0 225 602 " + makerAddress + '\r\n';
	} else {
		var md1 = makerAddress.substr(0, 17);
		var md2 = makerAddress.substr(17, 17);
		str += "TEXT 55 0 225 594 " + md1 + '\r\n';
		str += "TEXT 55 0 225 622 " + md2 + '\r\n';
	}
	str += "TEXT 55 0 45 615 Manufacturer Add \r\n";

	str += "TEXT 24 0 45 646 供应商地址 " + space + '\r\n';
	var vendorAddress = GetValueOrEmpty(data.VendorAddress);
	if (vendorAddress.gblen() < 21) {
		str += "TEXT 24 0 225 656 " + vendorAddress + '\r\n';
	} else {
		var vd1 = vendorAddress.substr(0, 17);
		var vd2 = vendorAddress.substr(17, 17);
		str += "TEXT 55 0 225 648 " + vd1 + '\r\n';
		str += "TEXT 55 0 225 676 " + vd2 + '\r\n';
	}
	str += "TEXT 55 0 45 669 Supplier Address \r\n";

	str += "TEXT 24 0 45 700 原产地 " + space + '\r\n';
	str += "TEXT 24 0 225 710 " + GetValueOrEmpty(data.COO) + '\r\n';
	str += "TEXT 55 0 45 723 Country of Origin \r\n";

	str += "TEXT 24 0 223 15 箱号 " + space + '\r\n';
	str += "TEXT 24 0 290 15 " + GetValueOrEmpty(data.BOX_NUMBER) + '\r\n';

	str += "TEXT 24 0 340 5 创维物料编号 " + space + '\r\n';
	str += "TEXT 24 0 490 15 " + GetValueOrEmpty(data.PartNo) + '\r\n';
	str += "TEXT 55 0 340 28 SKYWORTH P/N \r\n";

	str += "TEXT 24 0 490 58 数量/单位 " + space + '\r\n';
	str += "TEXT 24 0 660 68 " + GetValueOrEmpty(data.Qty) + ':' + GetValueOrEmpty(data.Unit) + ' \r\n';
	str += "TEXT 55 0 500 81 QTY/Unit \r\n";

	str += "TEXT 24 0 490 111 毛重/净重(KG) " + space + '\r\n';
	str += "TEXT 24 0 660 121 " + GetValueOrEmpty(data.GrossWeight) + '/' + GetValueOrEmpty(data.NetWeight) + ' \r\n';
	str += "TEXT 55 0 500 134 G.W./N.W. \r\n";

	str += "TEXT 24 0 490 164 生产批次 " + space + '\r\n';
	str += "TEXT 24 0 660 174 " + GetValueOrEmpty(data.BatchNo) + '\r\n';
	str += "TEXT 55 0 500 187 Batch \r\n";

	str += "TEXT 24 0 490 217 包装箱尺寸(cm) " + space + '\r\n';
	str += "TEXT 24 0 660 227 " + GetValueOrEmpty(data.CartonSize) + '\r\n';
	str += "TEXT 55 0 500 240 Carton Size \r\n";

	str += "TEXT 24 0 490 270 出厂日期 " + space + '\r\n';
	str += "TEXT 24 0 660 280 " + GetValueOrEmpty(data.DeliveryDate) + '\r\n';
	str += "TEXT 55 0 500 293 Delivery Date \r\n";

	str += "TEXT 24 0 490 323 生产日期 " + space + '\r\n';
	str += "TEXT 24 0 660 333 " + GetValueOrEmpty(data.ProductionDate) + '\r\n';
	str += "TEXT 55 0 500 346 Production Date \r\n";

	str += "TEXT 24 0 490 376 贸易类型 " + space + '\r\n';
	str += "TEXT 24 0 660 386 " + GetValueOrEmpty(data.ZTYPE) + '\r\n';
	str += "TEXT 55 0 500 399 ZType \r\n";

	str += "B QR 500 430 M 2 U 5" + '\r\n';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签
export const get_printstr_S = function(data) {
	var space = "";
	// 50mm X 80mm
	var str = " ! 0 200 200 380 1 " + '\r\n';
	str += "PAGE-WIDTH 640" + '\r\n';

	str += "BOX  0 0 620 350 3" + '\r\n';
	str += "LINE 0 42 620 42 3" + '\r\n';
	str += "LINE 0 84 620 84 3" + '\r\n';
	str += "LINE 0 126 620 126 3" + '\r\n';
	str += "LINE 0 168 620 168 3" + '\r\n';

	str += "LINE 0 206 380 206 3" + '\r\n';
	str += "LINE 0 244 380 244 3" + '\r\n';
	str += "LINE 0 278 380 278 3" + '\r\n';
	str += "LINE 0 312 380 312 3" + '\r\n';

	str += "LINE 170 0 170 350 3" + '\r\n'; //竖线
	str += "LINE 320 42 320 126 3" + '\r\n';
	str += "LINE 380 168 380 350 3" + '\r\n';
	str += "LINE 460 42 460 126 3" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 55 0 25 5 创维物料编号 \r\n";
	str += "TEXT 24 0 176 15 " + GetValueOrEmpty(data.PartNo) + '\r\n';
	str += "TEXT 55 0 25 24 SKYWORTH P/N \r\n";

	str += "TEXT 55 0 25 47 数量 \r\n";
	str += "TEXT 24 0 176 57 " + GetValueOrEmpty(data.Qty) + '\r\n';
	str += "TEXT 55 0 25 66 QTY \r\n";

	str += "TEXT 55 0 25 89 供应商代码 \r\n";
	str += "TEXT 24 0 176 98 " + GetValueOrEmpty(data.VendorCode) + '\r\n';
	str += "TEXT 55 0 25 108 Supplier Code \r\n";

	str += "TEXT 55 0 25 131 制造商全称 \r\n";
	str += "TEXT 24 0 176 137 " + GetValueOrEmpty(data.MakerName) + '\r\n';
	str += "TEXT 55 0 25 150 Manufacturer Name \r\n";

	str += "TEXT 55 0 25 173 供应商全称 \r\n";
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen() < 20) {
		str += "TEXT 55 0 176 183 " + vendorName + '\r\n';
	} else {
		var vm1 = vendorName.substr(0, 12);
		var vm2 = vendorName.substr(12, 12);
		str += "TEXT 55 0 176 173 " + vm1 + '\r\n';
		str += "TEXT 55 0 176 193 " + vm2 + '\r\n';
	}
	str += "TEXT 55 0 25 190 Supplier Name \r\n";

	str += "TEXT 55 0 25 210 原产地 \r\n";
	str += "TEXT 55 0 176 225 " + GetValueOrEmpty(data.COO) + '\r\n';
	str += "TEXT 55 0 25 226 Country of Origin \r\n";

	str += "TEXT 55 0 25 248 制造商型号 " + space + '\r\n';
	str += "TEXT 55 0 176 250 " + GetValueOrEmpty(data.MakerPN) + '\r\n';
	str += "TEXT 55 0 25 264 MFR P/N \r\n";

	str += "TEXT 55 0 25 290 品牌/Brand " + space + '\r\n';
	str += "TEXT 55 0 176 290 " + GetValueOrEmpty(data.Brand) + '\r\n';
	//str += "TEXT 55 0 25 318 Brand \r\n";

	str += "TEXT 55 0 25 326 生产批次/Batch " + space + '\r\n';
	str += "TEXT 55 0 176 326 " + GetValueOrEmpty(data.BatchNo) + '\r\n';
	//str += "TEXT 55 0 25 340 Batch \r\n";

	str += "TEXT 55 0 340 47 生产日期 " + space + '\r\n';
	str += "TEXT 24 0 480 57 " + GetValueOrEmpty(data.ProductionDate) + '\r\n';
	str += "TEXT 55 0 340 66 Production Date \r\n";

	str += "TEXT 55 0 340 89 产品名称 " + space + '\r\n';
	var partDes = GetValueOrEmpty(data.PartDescription);
	if (partDes.gblen() < 20) {
		str += "TEXT 55 0 480 99 " + partDes + '\r\n';
	} else {
		var pd1 = partDes.substr(0, 12);
		var pd2 = partDes.substr(12, 12);
		str += "TEXT 55 0 480 89 " + pd1 + '\r\n';
		str += "TEXT 55 0 480 108 " + pd2 + '\r\n';
	}
	str += "TEXT 55 0 340 108 Product Name \r\n";

	str += "B QR 430 190 M 2 U 3" + '\r\n';
	str += "MK," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签
export const get_printstr_S_BLE = function(data) {
	console.log('--------- s - ble --- ----');
	var space = "";
	// 50mm X 80mm
	var str = " ! 0 200 200 380 1 " + '\r\n';
	str += "PAGE-WIDTH 620" + '\r\n';

	str += "BOX  0 0 580 350 3" + '\r\n';
	str += "LINE 0 42 580 42 3" + '\r\n';
	str += "LINE 0 84 580 84 3" + '\r\n';
	str += "LINE 0 126 580 126 3" + '\r\n';
	str += "LINE 0 168 580 168 3" + '\r\n';

	str += "LINE 0 206 360 206 3" + '\r\n';
	str += "LINE 0 244 360 244 3" + '\r\n';
	str += "LINE 0 278 360 278 3" + '\r\n';
	str += "LINE 0 312 360 312 3" + '\r\n';

	str += "LINE 160 0 160 350 3" + '\r\n'; //竖线
	str += "LINE 310 42 310 126 3" + '\r\n';
	str += "LINE 360 168 360 350 3" + '\r\n';
	str += "LINE 450 42 450 126 3" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 55 0 15 5 创维物料编号 \r\n";
	str += "TEXT 24 0 166 15 " + GetValueOrEmpty(data.PartNo) + '\r\n';
	str += "TEXT 55 0 15 24 SKYWORTH P/N \r\n";

	str += "TEXT 55 0 15 47 数量 \r\n";
	str += "TEXT 24 0 166 57 " + GetValueOrEmpty(data.Qty) + '\r\n';
	str += "TEXT 55 0 15 66 QTY \r\n";

	str += "TEXT 55 0 15 89 供应商代码 \r\n";
	str += "TEXT 24 0 166 98 " + GetValueOrEmpty(data.VendorCode) + '\r\n';
	str += "TEXT 55 0 15 108 Supplier Code \r\n";

	str += "TEXT 55 0 15 131 制造商全称 \r\n";
	str += "TEXT 24 0 166 137 " + GetValueOrEmpty(data.MakerName) + '\r\n';
	str += "TEXT 55 0 15 150 Manufacturer Name \r\n";

	str += "TEXT 55 0 15 173 供应商全称 \r\n";
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen() < 20) {
		str += "TEXT 55 0 166 183 " + vendorName + '\r\n';
	} else {
		var vm1 = vendorName.substr(0, 12);
		var vm2 = vendorName.substr(12, 12);
		str += "TEXT 55 0 166 173 " + vm1 + '\r\n';
		str += "TEXT 55 0 166 193 " + vm2 + '\r\n';
	}
	str += "TEXT 55 0 15 190 Supplier Name \r\n";

	str += "TEXT 55 0 15 210 原产地 \r\n";
	str += "TEXT 55 0 166 225 " + GetValueOrEmpty(data.COO) + '\r\n';
	str += "TEXT 55 0 15 226 Country of Origin \r\n";

	str += "TEXT 55 0 15 248 制造商型号 " + space + '\r\n';
	str += "TEXT 55 0 166 250 " + GetValueOrEmpty(data.MakerPN) + '\r\n';
	str += "TEXT 55 0 15 264 MFR P/N \r\n";

	str += "TEXT 55 0 15 290 品牌/Brand " + space + '\r\n';
	str += "TEXT 55 0 166 290 " + GetValueOrEmpty(data.Brand) + '\r\n';
	//str += "TEXT 55 0 25 318 Brand \r\n";

	str += "TEXT 55 0 15 326 生产批次/Batch " + space + '\r\n';
	str += "TEXT 55 0 166 326 " + GetValueOrEmpty(data.BatchNo) + '\r\n';
	//str += "TEXT 55 0 25 340 Batch \r\n";

	str += "TEXT 55 0 330 47 生产日期 " + space + '\r\n';
	str += "TEXT 24 0 470 57 " + GetValueOrEmpty(data.ProductionDate) + '\r\n';
	str += "TEXT 55 0 330 66 Production Date \r\n";

	str += "TEXT 55 0 330 89 产品名称 " + space + '\r\n';
	var partDes = GetValueOrEmpty(data.PartDescription);
	if (partDes.gblen() < 20) {
		str += "TEXT 55 0 470 99 " + partDes + '\r\n';
	} else {
		var pd1 = partDes.substr(0, 12);
		var pd2 = partDes.substr(12, 12);
		str += "TEXT 55 0 470 89 " + pd1 + '\r\n';
		str += "TEXT 55 0 470 108 " + pd2 + '\r\n';
	}
	str += "TEXT 55 0 330 108 Product Name \r\n";

	str += "B QR 370 170 M 2 U 3" + '\r\n';
	str += "MK," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}

//二维码测试  
export const get_printstr_QrCode = function(data) {
	var data = {
		VendorCode: "PRC00001",
		VendorName: "XX电子有限公司",
		PartNo: "600014910-01-GP2",
		Qty: "800",
		Unit: "PCS",
		ReelCode: "M0000019100856608",
		QrCode: "J:475C-M61100-0080:SH090:3250:6D39D7BC1F094011B7ACFBB972616766:1.9:0.302:1100:PM00:EA:AK20050014::制造商型号:制造商型号:20200522:20200522:20200522:制造商型号:D20200525:制造商型号:0",
	};

	var str = " ! 0 200 200 400 1 " + '\r\n';
	str += "PAGE-WIDTH 600" + '\r\n';
	str += "B QR 100 30 M 2 U 4" + '\r\n';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';
	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';
	str += "PRINT " + '\r\n';

	return str;
}

//创维的客供料标签 
export const get_printstr_CVTE = function(data) {
	var space = "";
	// 80mm X 50mm 
	var str = " ! 0 200 200 380 1 " + '\r\n';
	str += "PAGE-WIDTH 640" + '\r\n';

	str += "SETBOLD 0" + '\r\n';
	str += "TEXT 24 0 35 5 " + GetValueOrEmpty(data.ReelCode) + '\r\n';

	str += "B QR 35 36 M 2 U 4" + '\r\n';
	str += "MK," + GetValueOrEmpty(data.QrCode) + '\r\n';
	str += "ENDQR" + '\r\n';

	str += "TEXT 24 0 220 36 供应商编号: \r\n";
	str += "TEXT 24 0 400 36 " + GetValueOrEmpty(data.VendorCode) + '\r\n';

	str += "TEXT 24 0 220 77 P/N: \r\n";
	str += "TEXT 24 0 400 77 " + GetValueOrEmpty(data.PartNo) + '\r\n';

	str += "TEXT 24 0 220 108 Cvte.Des: \r\n";
	str += "TEXT 24 0 400 108 " + GetValueOrEmpty(data.PartDescription) + '\r\n';

	str += "TEXT 24 0 220 139 D.C: \r\n";
	str += "TEXT 24 0 400 139 " + GetValueOrEmpty(data.DateCode) + '\r\n';

	str += "TEXT 24 0 220 170 LOT.NO: \r\n";
	str += "TEXT 24 0 400 170 " + GetValueOrEmpty(data.LotCode) + '\r\n';

	str += "TEXT 24 0 220 201 Q’TY: \r\n";
	str += "TEXT 24 0 400 201 " + GetValueOrEmpty(data.Qty) + '\r\n';

	str += "TEXT 24 0 220 232 Manufacture: \r\n";
	str += "TEXT 24 0 400 232 " + GetValueOrEmpty(data.MakerName) + '\r\n';

	str += "TEXT 24 0 220 263 M.DES: \r\n";
	str += "TEXT 24 0 420 263 " + GetValueOrEmpty(data.MakerPN) + '\r\n';

	str += "TEXT 24 0 35 294 G.W(kg): \r\n";
	str += "TEXT 24 0 220 294 " + GetValueOrEmpty(data.GrossWeight) + '\r\n';

	str += "TEXT 24 0 35 325 N.W(kg): \r\n";
	str += "TEXT 24 0 220 325 " + GetValueOrEmpty(data.NetWeight) + '\r\n';

	str += "TEXT 24 0 35 356 C.SIZE(mm) \r\n";
	str += "TEXT 24 0 220 356 " + GetValueOrEmpty(data.CartonSize) + '\r\n';

	str += "GAP-SENSE" + '\r\n';
	str += "FORM " + '\r\n';

	str += "PRINT " + '\r\n';

	return str;
}
