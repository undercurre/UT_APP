// 废弃的wifi  print JS

export const IsNullOrEmpty = function (obj) {
	if (obj == null || obj.trim() === '' || obj.length == 0) {
		return true;
	} else {
		return false;
	}
}

export const GetValueOrEmpty = function (obj) {
	if (IsNullOrEmpty(obj)) {
		return "";
	} else {
		return obj;
	}
}

export const get_printer_ip = function () {
	var printerip = uni.getStorageSync('printerip')
	if (IsNullOrEmpty(printerip)) {
		printerip = '';
	}
	return printerip;
}

export const set_printer_ip = function (printer_ip) {
	if (!IsNullOrEmpty(printer_ip)) {
		uni.setStorageSync('printerip', printer_ip)
	}
}

export const print_barode = function (data) {
	var str = get_printstr(data);
	return printSocket(str);
}

export const print_barode_s = function (data) {
	var str = get_printstr_S(data);
	return printSocket(str);
}

export const getstr = function () {
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

	var str = " ! 0 200 200 216 1 " + '\n\r';
	str += "PAGE-WIDTH 460" + '\n\r';

	str += "BOX  5 0 460 210 2" + '\n\r';
	str += "LINE 5 40 300 40 2" + '\n\r';
	str += "LINE 5 80 300 80 2" + '\n\r';
	str += "LINE 5 120 300 120 2" + '\n\r';
	str += "LINE 5 160 460 160 2" + '\n\r';
	str += "LINE 67 0 67 210 2" + '\n\r';
	str += "LINE 300 0 300 160 2" + '\n\r';

	str += "SETBOLD 0" + '\n\r';
	str += "TEXT 24 0 16 15 ICT  " + s1 + '\n\r';
	str += "TEXT 24 0 16 55 料号 " + s2 + '\n\r';
	str += "TEXT 24 0 16 95 数量 " + s3 + '\n\r';
	str += "TEXT 24 0 16 135 批次 " + s4 + '\n\r';
	str += "TEXT 24 0 16 175 备注 " + s5 + '\n\r';

	str += "B QR 307 10 M 2 U 4" + '\n\r';
	str += "MA," + qrcode + '\n\r';
	str += "ENDQR" + '\n\r';
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';

	str += "PRINT " + '\n\r';

	return str;
}

//讯强模板 
export const getstr_xq = function () {
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

	var str = " ! 0 200 200 672 1 " + '\n\r';
	str += "PAGE-WIDTH 624" + '\n\r';

	str += "BOX  12 0 567 636 2" + '\n\r';

	str += "LINE 12 80 567 80 2" + '\n\r';
	str += "LINE 12 155 567 155 2" + '\n\r';
	str += "LINE 12 232 567 232 2" + '\n\r';
	str += "LINE 12 309 567 309 2" + '\n\r';
	str += "LINE 12 479 567 479 2" + '\n\r';
	str += "LINE 12 555 567 555 2" + '\n\r';

	str += "LINE 402 80 152 636 2" + '\n\r'; // 竖线
	str += "LINE 269 155 379 232 2" + '\n\r';
	str += "LINE 467 155 467 232 2" + '\n\r';
	str += "LINE 287 479 287 555 2" + '\n\r';
	str += "LINE 419 479 419 555 2" + '\n\r';
	str += "LINE 367 555 367 636 2" + '\n\r'; //最后一个空格的竖线


	str += "SETBOLD 0" + '\n\r';

	str += "SETMAG 2 2" + '\n\r';
	str += "TEXT 24 0 147 30 CoolerMaster(现品票)" + '\n\r';
	str += "TEXT 24 0 19 107 Supplyer" + '\n\r';
	str += "SETMAG 1 1" + '\n\r';
	str += "TEXT 24 0 167 107 " + vendorCode + "  " + vendorName + '\n\r';
	str += "SETMAG 2 2" + '\n\r';
	str += "TEXT 24 0 19 183 Part No" + '\n\r';
	str += "SETMAG 1 1" + '\n\r';
	str += "TEXT 24 0 167 183 " + partNo + '\n\r';
	str += "SETMAG 2 2" + '\n\r';
	str += "TEXT 24 0 397 183 Qty" + '\n\r';
	str += "TEXT 24 0 475 183 " + qty + '\n\r';
	str += "TEXT 24 0 19 260 Desc" + '\n\r';
	str += "SETMAG 1 1" + '\n\r';
	if (partDesc.length < 21) {
		str += "TEXT 24 0 167 260 " + partDesc + '\n\r';
	} else {
		var pd1 = partDesc.substr(0, 20);
		var pd2 = partDesc.substr(21);
		str += "TEXT 24 0 167 240 " + pd1 + '\n\r';
		str += "TEXT 24 0 167 267 " + pd2 + '\n\r';
	}
	str += "SETMAG 2 2" + '\n\r';
	str += "TEXT 24 0 19 391 Box NO" + '\n\r';
	str += "SETMAG 1 1" + '\n\r';
	str += "TEXT 24 0 329 345 " + reelCode + '\n\r';
	str += "TEXT 24 0 329 395 " + dShippingDate + '\n\r';
	str += "SETMAG 2 2" + '\n\r';
	str += "TEXT 24 0 19 507 生产日期" + '\n\r';
	str += "TEXT 24 0 167 507 " + dateCode + '\n\r';
	str += "TEXT 24 0 292 507 出货日期" + '\n\r';
	str += "TEXT 24 0 429 507 " + shippingDate + '\n\r';

	str += "TEXT 24 0 42 585 月份" + '\n\r';
	str += "SETMAG 4 4" + '\n\r';
	str += "TEXT 24 0 227 560 " + dDateCode + '\n\r';
	str += "SETMAG 1 1" + '\n\r';

	str += "B QR 167 323 M 2 U 4" + '\n\r';
	str += "MA," + qrcode + '\n\r';
	str += "ENDQR" + '\n\r';

	/*标签检测 begin*/
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';
	/*标签检测 end*/

	str += "PRINT " + '\n\r';

	return str;
}

export const PrinterIsReady = function () {
	var ip = get_printer_ip();

	if (IsNullOrEmpty(ip)) {
		uni.showToast({
			title: 'WIFI打印机IP没有设定，请先设置好, 再使用.'
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
			socket.connect(new InetSocketAddress(ip, 9100), 1500);  //设置连接请求超时时间1.5秒
			 
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
				content: "网络连接超时，请确认打印机有没有打开或连接！"
			})
			return false;
		}
	}
	return true;
}

export const printSocket = function (str) {
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
			socket.connect(new InetSocketAddress(ip, 9100), 1500);  //设置连接请求超时时间1.5秒
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

export const get_printstr = function (data) {
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
export const get_printstr_Y = function (data) {
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
	var str = " ! 0 200 200 750 1 " + '\n\r';
	str += "PAGE-WIDTH 850" + '\n\r';

	str += "BOX  26 0 805 750 3" + '\n\r';
	str += "LINE 26 58 805 58 3" + '\n\r';
	str += "LINE 26 116 805 116 3" + '\n\r';
	str += "LINE 26 174 805 174 3" + '\n\r';
	str += "LINE 26 232 805 232 3" + '\n\r';
	str += "LINE 26 289 805 289 3" + '\n\r';
	str += "LINE 26 346 805 346 3" + '\n\r';
	str += "LINE 26 403 805 403 3" + '\n\r';

	str += "LINE 26 461 480 461 3" + '\n\r';
	str += "LINE 26 519 480 519 3" + '\n\r';
	str += "LINE 26 577 480 577 3" + '\n\r';
	str += "LINE 26 635 480 635 3" + '\n\r';
	str += "LINE 26 693 480 693 3" + '\n\r';

	str += "LINE 220 0 220 800 3" + '\n\r'; //竖线 
	str += "LINE 480 0 480 800 3" + '\n\r';
	str += "LINE 330 0 330 57 3" + '\n\r';
	str += "LINE 650 61 650 403 3" + '\n\r';

	str += "SETBOLD 0" + '\n\r';
	str += "TEXT 24 0 45 5 类型  " + '\n\r Type \n\r';
	str += "TEXT 24 0 255 15 " + GetValueOrEmpty(data.BcdType) + ' \n\r';
	str += "TEXT 55 0 45 35 Type  " + '\n\r ';

	str += "TEXT 24 0 45 65 供应商代码 " + space + '\n\r Supplier Code \n\r';
	str += "TEXT 24 0 225 75 " + GetValueOrEmpty(data.VendorCode) + ' \n\r';
	str += "TEXT 55 0 45 92 Supplier Code \n\r";

	str += "TEXT 24 0 45 130 唯一码 " + space + '\n\r';
	str += "TEXT 24 0 225 135 " + GetValueOrEmpty(data.ReelCode) + ' \n\r';
	str += "TEXT 55 0 45 155 Unique Code \n\r";

	str += "TEXT 24 0 45 185 工厂库位 " + space + '\n\r ';
	str += "TEXT 24 0 225 195 " + GetValueOrEmpty(data.Bu) + ':' + GetValueOrEmpty(data.Sic) + ' \n\r';
	str += "TEXT 55 0 45 213  Location \n\r";

	str += "TEXT 24 0 45 245 采购订单编号 " + space + '\n\r';
	str += "TEXT 24 0 225 255 " + GetValueOrEmpty(data.PO) + '\n\r ';
	str += "TEXT 55 0 45 272 Purchase Order Number \n\r";

	str += "TEXT 24 0 45 297 品牌 " + space + '\n\r';
	str += "TEXT 24 0 225 315 " + GetValueOrEmpty(data.Brand) + '\n\r ';
	str += "TEXT 55 0 45 327 Brand \n\r";

	str += "TEXT 24 0 45 360 制造商型号 " + space + '\n\r ';
	str += "TEXT 24 0 225 375 " + GetValueOrEmpty(data.MakerPN) + '\n\r';
	str += "TEXT 55 0 45 386 Manufacturer P/N \n\r";

	str += "TEXT 24 0 45 415 产品名称 " + space + '\n\r';
	var partDesc = GetValueOrEmpty(data.PartDescription);
	if (partDesc.gblen < 21) {
		str += "TEXT 24 0 225 425 " + partDesc + '\n\r';
	} else {
		var pd1 = partDesc.substr(0, 17);
		var pd2 = partDesc.substr(17, 17);
		str += "TEXT 55 0 225 415 " + pd1 + '\n\r';
		str += "TEXT 55 0 225 440 " + pd2 + '\n\r';
	}
	str += "TEXT 55 0 45 442 Product Name \n\r";

	str += "TEXT 24 0 45 465 供应商全称 " + space + '\n\r';
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen < 21) {
		str += "TEXT 24 0 225 480 " + vendorName + '\n\r';
	} else {
		var vn1 = vendorName.substr(0, 17);
		var vn2 = vendorName.substr(17, 17);
		str += "TEXT 55 0 225 472 " + vn1 + '\n\r';
		str += "TEXT 55 0 225 498 " + vn2 + '\n\r';
	}
	str += "TEXT 55 0 45 492 Supplier Name \n\r";

	str += "TEXT 24 0 45 530 制造商名称 " + space + '\n\r';
	var makerName = GetValueOrEmpty(data.MakerName);
	if (makerName.gblen < 21) {
		str += "TEXT 24 0 225 545 " + makerName + '\n\r';
	} else {
		var mn1 = makerName.substr(0, 17);
		var mn2 = makerName.substr(17, 17);
		str += "TEXT 55 0 225 534 " + mn1 + '\n\r';
		str += "TEXT 55 0 225 562 " + mn2 + '\n\r';
	}
	str += "TEXT 55 0 45 557 Manufacturer Name \n\r";

	str += "TEXT 24 0 45 580 制造商地址 " + space + '\n\r';
	var makerAddress = GetValueOrEmpty(data.MakerAddress);
	if (makerAddress.gblen < 21) {
		str += "TEXT 24 0 225 595 " + makerAddress + '\n\r';
	} else {
		var md1 = makerAddress.substr(0, 17);
		var md2 = makerAddress.substr(17, 17);
		str += "TEXT 55 0 225 589 " + md1 + '\n\r';
		str += "TEXT 55 0 225 613 " + md2 + '\n\r';
	}
	str += "TEXT 55 0 45 605 Manufacturer Add \n\r";

	str += "TEXT 24 0 45 640 供应商地址 " + space + '\n\r';
	var vendorAddress = GetValueOrEmpty(data.VendorAddress);
	if (vendorAddress.gblen < 21) {
		str += "TEXT 24 0 225 645 " + vendorAddress + '\n\r';
	} else {
		var vd1 = vendorAddress.substr(0, 17);
		var vd2 = vendorAddress.substr(17, 17);
		str += "TEXT 55 0 225 639 " + vd1 + '\n\r';
		str += "TEXT 55 0 225 667 " + vd2 + '\n\r';
	}
	str += "TEXT 55 0 45 665 Supplier Address \n\r";

	str += "TEXT 24 0 45 698 原产地 " + space + '\n\r';
	str += "TEXT 24 0 225 705 " + GetValueOrEmpty(data.COO) + '\n\r';
	str += "TEXT 55 0 45 725 Country of Origin \n\r";

	str += "TEXT 24 0 330 5 创维物料编号 " + '\n\r';
	str += "TEXT 24 0 485 15 " + GetValueOrEmpty(data.PartNo) + '\n\r';
	str += "TEXT 55 0 340 40 SKYWORTH P/N \n\r";

	str += "TEXT 24 0 490 65 数量/单位 " + space + '\n\r';
	str += "TEXT 24 0 655 75 " + GetValueOrEmpty(data.Qty) + ':' + GetValueOrEmpty(data.Unit) + ' \n\r';
	str += "TEXT 55 0 490 92 QTY/Unit \n\r";

	str += "TEXT 24 0 487 125 毛重/净重(KG) " + space + '\n\r';
	str += "TEXT 24 0 655 135 " + GetValueOrEmpty(data.GrossWeight) + ':' + GetValueOrEmpty(data.NetWeight) + ' \n\r';
	str += "TEXT 55 0 490 152 G.W./N.W. \n\r";

	str += "TEXT 24 0 490 185 生产批次 " + space + '\n\r';
	str += "TEXT 24 0 655 195 " + GetValueOrEmpty(data.BatchNo) + '\n\r';
	str += "TEXT 55 0 490 212 Batch \n\r";

	str += "TEXT 24 0 482 245 包装箱尺寸(cm) " + space + '\n\r';
	str += "TEXT 24 0 655 255 " + GetValueOrEmpty(data.CartonSize) + '\n\r';
	str += "TEXT 55 0 490 272 Carton Size \n\r";

	str += "TEXT 24 0 490 300 出厂日期 " + space + '\n\r';
	str += "TEXT 24 0 655 315 " + GetValueOrEmpty(data.DeliveryDate) + '\n\r';
	str += "TEXT 55 0 490 327 Delivery Date \n\r";

	str += "TEXT 24 0 490 360 生产日期 " + space + '\n\r';
	str += "TEXT 24 0 655 375 " + GetValueOrEmpty(data.ProductionDate) + '\n\r';
	str += "TEXT 55 0 490 387 Production Date \n\r";

	str += "B QR 495 430 M 2 U 5" + '\n\r';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\n\r';
	str += "ENDQR" + '\n\r';
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';

	str += "PRINT " + '\n\r';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签 
export const get_printstr_Z = function (data) {
	var space = "";
	// 100mm X 100mm 
	var str = " ! 0 200 200 750 1 " + '\n\r';
	str += "PAGE-WIDTH 850" + '\n\r';

	str += "BOX  25 0 805 750 3" + '\n\r';
	str += "LINE 25 50 805 50 3" + '\n\r';
	str += "LINE 25 100 805 100 3" + '\n\r';
	str += "LINE 25 150 805 150 3" + '\n\r';
	str += "LINE 25 200 805 200 3" + '\n\r';
	str += "LINE 25 250 805 250 3" + '\n\r';
	str += "LINE 25 300 805 300 3" + '\n\r';
	str += "LINE 25 350 805 350 3" + '\n\r';
	str += "LINE 25 400 805 400 3" + '\n\r';

	str += "LINE 25 450 480 450 3" + '\n\r';
	str += "LINE 25 500 480 500 3" + '\n\r';
	str += "LINE 25 550 480 550 3" + '\n\r';
	str += "LINE 25 600 480 600 3" + '\n\r';
	str += "LINE 25 650 480 650 3" + '\n\r';
	str += "LINE 25 700 480 700 3" + '\n\r';

	str += "LINE 220 0 220 800 3" + '\n\r'; //竖线
	str += "LINE 315 0 315 50 3" + '\n\r';
	str += "LINE 480 0 480 800 3" + '\n\r';
	str += "LINE 655 50 655 400 3" + '\n\r';

	str += "SETBOLD 0" + '\n\r';
	str += "TEXT 24 0 45 5 类型  " + space + '\n\r';
	str += "TEXT 24 0 255 15 " + GetValueOrEmpty(data.BcdType) + ' \n\r';
	str += "TEXT 55 0 45 28 Type \n\r";

	str += "TEXT 24 0 45 55 供应商代码 " + space + '\n\r';
	str += "TEXT 24 0 240 65 " + GetValueOrEmpty(data.VendorCode) + ' \n\r';
	str += "TEXT 55 0 45 78 Supplier Code \n\r";

	str += "TEXT 24 0 45 105 唯一码 " + space + '\n\r';
	str += "TEXT 24 0 240 115 " + GetValueOrEmpty(data.ReelCode) + ' \n\r';
	str += "TEXT 55 0 45  128 Unique Code \n\r";

	str += "TEXT 24 0 45 155 工厂库位 " + space + '\n\r';
	str += "TEXT 24 0 240 165 " + GetValueOrEmpty(data.Bu) + ':' + GetValueOrEmpty(data.Sic) + ' \n\r';
	str += "TEXT 55 0 45 178 Location \n\r";

	str += "TEXT 24 0 45 205 采购订单编号 " + space + '\n\r';
	str += "TEXT 24 0 240 215 " + GetValueOrEmpty(data.PO) + '\n\r ';
	str += "TEXT 55 0 45 228 Purchase Order Number \n\r";

	str += "TEXT 24 0 45 255 生产批次 " + space + '\n\r';
	str += "TEXT 24 0 240 265 " + GetValueOrEmpty(data.BatchNo) + '\n\r';
	str += "TEXT 55 0 45 278 Batch \n\r";

	str += "TEXT 24 0 45 305 品牌 " + space + '\n\r';
	str += "TEXT 24 0 240 315 " + GetValueOrEmpty(data.Brand) + '\n\r ';
	str += "TEXT 55 0 45 328 Brand \n\r";

	str += "TEXT 24 0 45 355 制造商型号 " + space + '\n\r';
	str += "TEXT 24 0 240 365 " + GetValueOrEmpty(data.MakerPN) + '\n\r';
	str += "TEXT 55 0 45 378 Manufacturer P/N \n\r";

	str += "TEXT 24 0 45 405 销售项目编号" + space + '\n\r';
	str += "TEXT 24 0 240 415 " + GetValueOrEmpty(data.Sales_NUMBER) + ':' + GetValueOrEmpty(data.Sales_Project_Number) +
		'\n\r';
	str += "TEXT 55 0 45 428 Manufacturer P/N \n\r";

	str += "TEXT 24 0 45 455 产品名称 " + space + '\n\r';
	var partDesc = GetValueOrEmpty(data.PartDescription);
	if (partDesc.gblen < 21) {
		str += "TEXT 24 0 225 465 " + partDesc + '\n\r';
	} else {
		var pd1 = partDesc.substr(0, 17);
		var pd2 = partDesc.substr(17, 17);
		str += "TEXT 55 0 225 456 " + pd1 + '\n\r';
		str += "TEXT 55 0 225 480 " + pd2 + '\n\r';
	}
	str += "TEXT 55 0 45 478 Product Name \n\r";

	str += "TEXT 24 0 45 505 制造商全称 " + space + '\n\r';
	var makerName = GetValueOrEmpty(data.MakerName);
	if (makerName.gblen < 21) {
		str += "TEXT 24 0 225 515 " + makerName + '\n\r';
	} else {
		var mn1 = makerName.substr(0, 17);
		var mn2 = makerName.substr(17, 17);
		str += "TEXT 55 0 225 508 " + mn1 + '\n\r';
		str += "TEXT 55 0 225 534 " + mn2 + '\n\r';
	}
	str += "TEXT 55 0 45 528 Manufacturer Name \n\r";

	str += "TEXT 24 0 45 555 制造商地址 " + space + '\n\r';
	var makerAddress = GetValueOrEmpty(data.MakerAddress);
	if (makerAddress.gblen < 21) {
		str += "TEXT 24 0 225 565 " + makerAddress + '\n\r';
	} else {
		var md1 = makerAddress.substr(0, 17);
		var md2 = makerAddress.substr(17, 17);
		str += "TEXT 55 0 225 558 " + md1 + '\n\r';
		str += "TEXT 55 0 225 584 " + md2 + '\n\r';
	}
	str += "TEXT 55 0 45 578 Manufacturer Add \n\r";

	str += "TEXT 24 0 45 605 供应商名称 " + space + '\n\r';
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen < 21) {
		str += "TEXT 24 0 225 615 " + vendorName + '\n\r';
	} else {
		var vn1 = vendorName.substr(0, 17);
		var vn2 = vendorName.substr(17, 17);
		str += "TEXT 55 0 225 608 " + vn1 + '\n\r';
		str += "TEXT 55 0 225 634 " + vn2 + '\n\r';
	}
	str += "TEXT 55 0 45 628 Supplier Name \n\r";

	str += "TEXT 24 0 45 655 供应商地址 " + space + '\n\r';
	var vendorAddress = GetValueOrEmpty(data.VendorAddress);
	if (vendorAddress.gblen < 21) {
		str += "TEXT 55 0 225 665 " + vendorAddress + '\n\r';
	} else {
		var vd1 = vendorAddress.substr(0, 17);
		var vd2 = vendorAddress.substr(17, 17);
		str += "TEXT 55 0 225 658 " + vd1 + '\n\r';
		str += "TEXT 55 0 225 684 " + vd2 + '\n\r';
	}
	str += "TEXT 55 0 45 678 Supplier Address \n\r";

	str += "TEXT 24 0 45 705 备注 " + space + '\n\r';
	var remark = GetValueOrEmpty(data.Remark);
	if (remark.gblen < 21) {
		str += "TEXT 24 0 225 715 " + remark + '\n\r';
	} else {
		var rm1 = remark.substr(0, 17);
		var rm2 = remark.substr(17, 17);
		str += "TEXT 55 0 225 708 " + rm1 + '\n\r';
		str += "TEXT 55 0 225 732 " + rm2 + '\n\r';
	}
	str += "TEXT 55 0 45 728 Remarks \n\r";

	str += "TEXT 24 0 320 5 创维物料编号  " + space + '\n\r';
	str += "TEXT 24 0 490 15 " + GetValueOrEmpty(data.PartNo) + '\n\r';
	str += "TEXT 55 0 330 28 SKYWORTH P/N \n\r";

	str += "TEXT 24 0 490 55 数量/单位 " + space + '\n\r';
	str += "TEXT 24 0 660 65 " + GetValueOrEmpty(data.Qty) + ':' + GetValueOrEmpty(data.Unit) + ' \n\r';
	str += "TEXT 55 0 500 78 QTY/Unit \n\r";

	str += "TEXT 24 0 490 105 毛重/净重(KG) " + space + '\n\r';
	str += "TEXT 24 0 660 115 " + GetValueOrEmpty(data.GrossWeight) + ':' + GetValueOrEmpty(data.NetWeight) + ' \n\r';
	str += "TEXT 55 0 500 128 G.W./N.W. \n\r";

	str += "TEXT 24 0 490 155 生产日期 " + space + '\n\r';
	str += "TEXT 24 0 660 165 " + GetValueOrEmpty(data.ProductionDate) + '\n\r';
	str += "TEXT 55 0 500 178 Production Date \n\r";

	str += "TEXT 24 0 490 205 包装箱尺寸(cm) " + space + '\n\r';
	str += "TEXT 24 0 660 215 " + GetValueOrEmpty(data.CartonSize) + '\n\r';
	str += "TEXT 55 0 500 228 Carton Size \n\r";

	str += "TEXT 24 0 490 255 出厂日期 " + space + '\n\r';
	str += "TEXT 24 0 660 265 " + GetValueOrEmpty(data.DeliveryDate) + '\n\r';
	str += "TEXT 55 0 500 278 Delivery Date \n\r";

	str += "TEXT 24 0 490 305 生产订单编号 " + space + '\n\r';
	str += "TEXT 24 0 660 315 " + GetValueOrEmpty(data.ORDER_NUMBER) + '\n\r';
	str += "TEXT 55 0 500 328 Order Number \n\r";

	str += "TEXT 24 0 490 355 生产箱号 " + space + '\n\r';
	str += "TEXT 24 0 660 365 " + GetValueOrEmpty(data.BOX_NUMBER) + '\n\r';
	str += "TEXT 55 0 500 378 Production Number \n\r";

	str += "B QR 490 435 M 2 U 5" + '\n\r';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\n\r';
	str += "ENDQR" + '\n\r';
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';

	str += "PRINT " + '\n\r';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签 
export const get_printstr_J = function (data) {
	var space = "";
	// 100mm X 100mm 
	var str = " ! 0 200 200 750 1 " + '\n\r';
	str += "PAGE-WIDTH 850" + '\n\r';

	str += "BOX  25 0 805 750 3" + '\n\r';
	str += "LINE 25 53 805 50 3" + '\n\r';

	str += "LINE 25 106 805 106 3" + '\n\r';
	str += "LINE 25 159 805 159 3" + '\n\r';
	str += "LINE 25 212 805 212 3" + '\n\r';
	str += "LINE 25 265 805 265 3" + '\n\r';
	str += "LINE 25 318 805 318 3" + '\n\r';
	str += "LINE 25 371 805 371 3" + '\n\r';
	str += "LINE 25 424 805 424 3" + '\n\r';

	str += "LINE 25 478 480 478 3" + '\n\r';
	str += "LINE 25 532 480 532 3" + '\n\r';
	str += "LINE 25 586 480 586 3" + '\n\r';
	str += "LINE 25 640 480 640 3" + '\n\r';
	str += "LINE 25 694 480 694 3" + '\n\r';

	str += "LINE 220 0 220 800 3" + '\n\r'; //竖线
	str += "LINE 120 0 120 53 3" + '\n\r';
	str += "LINE 275 0 275 53 3" + '\n\r';
	str += "LINE 330 0 330 53 3" + '\n\r';
	str += "LINE 480 0 480 800 3" + '\n\r';
	str += "LINE 655 53 655 424 3" + '\n\r';

	str += "SETBOLD 0" + '\n\r';
	str += "TEXT 24 0 45 5 类型  " + space + '\n\r';
	str += "TEXT 24 0 150 15 " + GetValueOrEmpty(data.BcdType) + ' \n\r';
	str += "TEXT 55 0 45 28 Type \n\r";

	str += "TEXT 24 0 45 58 供应商代码 " + space + '\n\r';
	str += "TEXT 24 0 225 68 " + GetValueOrEmpty(data.VendorCode) + ' \n\r';
	str += "TEXT 55 0 45 81 Supplier Code \n\r";

	str += "TEXT 24 0 45 111 唯一码 " + space + '\n\r';
	str += "TEXT 24 0 225 121 " + GetValueOrEmpty(data.ReelCode) + ' \n\r';
	str += "TEXT 55 0 45 134 Unique Code \n\r";

	str += "TEXT 24 0 45 164 工厂库位 " + space + '\n\r';
	str += "TEXT 24 0 225 174 " + GetValueOrEmpty(data.Bu) + ':' + GetValueOrEmpty(data.Sic) + ' \n\r';
	str += "TEXT 55 0 45 187 Location \n\r";

	str += "TEXT 24 0 45 217 采购订单编号 " + space + '\n\r';
	str += "TEXT 24 0 225 227 " + GetValueOrEmpty(data.PO) + '\n\r ';
	str += "TEXT 55 0 45 240 Purchase Order Number \n\r";

	str += "TEXT 24 0 45 270 品牌 " + space + '\n\r Brand \n\r';
	str += "TEXT 24 0 225 280 " + GetValueOrEmpty(data.Brand) + '\n\r ';
	str += "TEXT 55 0 45 293 Brand \n\r";

	str += "TEXT 24 0 45 323 制造商型号 " + space + '\n\r';
	str += "TEXT 24 0 225 333 " + GetValueOrEmpty(data.MakerPN) + '\n\r';
	str += "TEXT 55 0 45 346 Manufacturer P/N \n\r";

	str += "TEXT 24 0 45 376 报关单号 " + space + '\n\r';
	str += "TEXT 24 0 225 386 " + GetValueOrEmpty(data.ENTRYID) + '\n\r';
	str += "TEXT 55 0 45 399 EntryId P/N \n\r";

	str += "TEXT 24 0 45 430 产品名称 " + space + '\n\r';
	var partDesc = GetValueOrEmpty(data.PartDescription);
	//console.log(partDesc.gblen);
	if (partDesc.gblen < 21) {
		str += "TEXT 24 0 225 440 " + partDesc + '\n\r';
	} else {
		var pd1 = partDesc.substr(0, 17);
		var pd2 = partDesc.substr(17, 17);
		str += "TEXT 55 0 225 432 " + pd1 + '\n\r';
		str += "TEXT 55 0 225 460 " + pd2 + '\n\r';
	}
	str += "TEXT 55 0 45 453 Product Name \n\r";

	str += "TEXT 24 0 45 484 供应商全称 " + space + '\n\r';
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen < 21) {
		str += "TEXT 24 0 225 494 " + vendorName + '\n\r';
	} else {
		var vn1 = vendorName.substr(0, 17);
		var vn2 = vendorName.substr(17, 17);
		str += "TEXT 55 0 225 486 " + vn1 + '\n\r';
		str += "TEXT 55 0 225 514 " + vn2 + '\n\r';
	}
	str += "TEXT 55 0 45 507 Supplier Name \n\r";

	str += "TEXT 24 0 45 538 制造商名称 " + space + '\n\r';
	var makerName = GetValueOrEmpty(data.MakerName);
	if (makerName.gblen < 21) {
		str += "TEXT 24 0 225 548 " + makerName + '\n\r';
	} else {
		var mn1 = makerName.substr(0, 17);
		var mn2 = makerName.substr(17, 17);
		str += "TEXT 55 0 225 540 " + mn1 + '\n\r';
		str += "TEXT 55 0 225 548 " + mn2 + '\n\r';
	}
	str += "TEXT 55 0 45 561 Manufacturer Name \n\r";

	str += "TEXT 24 0 45 592 制造商地址 " + space + '\n\r';
	var makerAddress = GetValueOrEmpty(data.MakerAddress);
	if (makerAddress.gblen < 21) {
		str += "TEXT 24 0 225 602 " + makerAddress + '\n\r';
	} else {
		var md1 = makerAddress.substr(0, 17);
		var md2 = makerAddress.substr(17, 17);
		str += "TEXT 55 0 225 594 " + md1 + '\n\r';
		str += "TEXT 55 0 225 622 " + md2 + '\n\r';
	}
	str += "TEXT 55 0 45 615 Manufacturer Add \n\r";

	str += "TEXT 24 0 45 646 供应商地址 " + space + '\n\r';
	var vendorAddress = GetValueOrEmpty(data.VendorAddress);
	if (vendorAddress.gblen < 21) {
		str += "TEXT 24 0 225 656 " + vendorAddress + '\n\r';
	} else {
		var vd1 = vendorAddress.substr(0, 17);
		var vd2 = vendorAddress.substr(17, 17);
		str += "TEXT 55 0 225 648 " + vd1 + '\n\r';
		str += "TEXT 55 0 225 676 " + vd2 + '\n\r';
	}
	str += "TEXT 55 0 45 669 Supplier Address \n\r";

	str += "TEXT 24 0 45 700 原产地 " + space + '\n\r';
	str += "TEXT 24 0 225 710 " + GetValueOrEmpty(data.COO) + '\n\r';
	str += "TEXT 55 0 45 723 Country of Origin \n\r";

	str += "TEXT 24 0 223 15 箱号 " + space + '\n\r';
	str += "TEXT 24 0 290 15 " + GetValueOrEmpty(data.BOX_NUMBER) + '\n\r';

	str += "TEXT 24 0 340 5 创维物料编号 " + space + '\n\r';
	str += "TEXT 24 0 490 15 " + GetValueOrEmpty(data.PartNo) + '\n\r';
	str += "TEXT 55 0 340 28 SKYWORTH P/N \n\r";

	str += "TEXT 24 0 490 58 数量/单位 " + space + '\n\r';
	str += "TEXT 24 0 660 68 " + GetValueOrEmpty(data.Qty) + ':' + GetValueOrEmpty(data.Unit) + ' \n\r';
	str += "TEXT 55 0 500 81 QTY/Unit \n\r";

	str += "TEXT 24 0 490 111 毛重/净重(KG) " + space + '\n\r';
	str += "TEXT 24 0 660 121 " + GetValueOrEmpty(data.GrossWeight) + ':' + GetValueOrEmpty(data.NetWeight) + ' \n\r';
	str += "TEXT 55 0 500 134 G.W./N.W. \n\r";

	str += "TEXT 24 0 490 164 生产批次 " + space + '\n\r';
	str += "TEXT 24 0 660 174 " + GetValueOrEmpty(data.BatchNo) + '\n\r';
	str += "TEXT 55 0 500 187 Batch \n\r";

	str += "TEXT 24 0 490 217 包装箱尺寸(cm) " + space + '\n\r';
	str += "TEXT 24 0 660 227 " + GetValueOrEmpty(data.CartonSize) + '\n\r';
	str += "TEXT 55 0 500 240 Carton Size \n\r";

	str += "TEXT 24 0 490 270 出厂日期 " + space + '\n\r';
	str += "TEXT 24 0 660 280 " + GetValueOrEmpty(data.DeliveryDate) + '\n\r';
	str += "TEXT 55 0 500 293 Delivery Date \n\r";

	str += "TEXT 24 0 490 323 生产日期 " + space + '\n\r';
	str += "TEXT 24 0 660 333 " + GetValueOrEmpty(data.ProductionDate) + '\n\r';
	str += "TEXT 55 0 500 346 Production Date \n\r";

	str += "TEXT 24 0 490 376 贸易类型 " + space + '\n\r';
	str += "TEXT 24 0 660 386 " + GetValueOrEmpty(data.ZTYPE) + '\n\r';
	str += "TEXT 55 0 500 399 ZType \n\r";

	str += "B QR 500 430 M 2 U 5" + '\n\r';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\n\r';
	str += "ENDQR" + '\n\r';
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';

	str += "PRINT " + '\n\r';

	return str;
}

//Y:表示国内物料, Z:表示创维自制标签, J: 进口物料标签;  S表示 内箱标签 
export const get_printstr_S = function (data) {
	var space = "";
	// 50mm X 80mm 
	var str = " ! 0 200 200 380 1 " + '\n\r';
	str += "PAGE-WIDTH 640" + '\n\r';

	str += "BOX  0 0 620 350 3" + '\n\r';
	str += "LINE 0 42 620 42 3" + '\n\r';
	str += "LINE 0 84 620 84 3" + '\n\r';
	str += "LINE 0 126 620 126 3" + '\n\r';
	str += "LINE 0 168 620 168 3" + '\n\r';

	str += "LINE 0 206 380 206 3" + '\n\r';
	str += "LINE 0 244 380 244 3" + '\n\r';
	str += "LINE 0 278 380 278 3" + '\n\r';
	str += "LINE 0 312 380 312 3" + '\n\r';

	str += "LINE 170 0 170 350 3" + '\n\r'; //竖线
	str += "LINE 320 42 320 126 3" + '\n\r';
	str += "LINE 380 168 380 350 3" + '\n\r';
	str += "LINE 460 42 460 126 3" + '\n\r';

	str += "SETBOLD 0" + '\n\r';
	str += "TEXT 55 0 25 5 创维物料编号 \n\r ";
	str += "TEXT 24 0 176 15 " + GetValueOrEmpty(data.PartNo) + '\n\r';
	str += "TEXT 55 0 25 24 SKYWORTH P/N \n\r";

	str += "TEXT 55 0 25 47 数量 \n\r";
	str += "TEXT 24 0 176 57 " + GetValueOrEmpty(data.Qty) + '\n\r';
	str += "TEXT 55 0 25 66 QTY \n\r";

	str += "TEXT 55 0 25 89 供应商代码 \n\r";
	str += "TEXT 24 0 176 98 " + GetValueOrEmpty(data.VendorCode) + '\n\r';
	str += "TEXT 55 0 25 108 Supplier Code \n\r";

	str += "TEXT 55 0 25 131 制造商全称 \n\r";
	str += "TEXT 24 0 176 137 " + GetValueOrEmpty(data.MakerName) + '\n\r';
	str += "TEXT 55 0 25 150 Manufacturer Name \n\r";

	str += "TEXT 55 0 25 173 供应商全称 \n\r";
	var vendorName = GetValueOrEmpty(data.VendorName);
	if (vendorName.gblen < 20) {
		str += "TEXT 55 0 176 183 " + vendorName + '\n\r';
	} else {
		var vm1 = vendorName.substr(0, 12);
		var vm2 = vendorName.substr(12, 12);
		str += "TEXT 55 0 176 173 " + vm1 + '\n\r';
		str += "TEXT 55 0 176 193 " + vm2 + '\n\r';
	}
	str += "TEXT 55 0 25 190 Supplier Name \n\r";

	str += "TEXT 55 0 25 210 原产地 \n\r";
	str += "TEXT 55 0 176 225 " + GetValueOrEmpty(data.COO) + '\n\r';
	str += "TEXT 55 0 25 226 Country of Origin \n\r";

	str += "TEXT 55 0 25 248 制造商型号 " + space + '\n\r';
	str += "TEXT 55 0 176 250 " + GetValueOrEmpty(data.MakerPN) + '\n\r';
	str += "TEXT 55 0 25 264 MFR P/N \n\r";

	str += "TEXT 55 0 25 290 品牌/Brand " + space + '\n\r';
	str += "TEXT 55 0 176 290 " + GetValueOrEmpty(data.Brand) + '\n\r';
	//str += "TEXT 55 0 25 318 Brand \n\r";

	str += "TEXT 55 0 25 326 生产批次/Batch " + space + '\n\r';
	str += "TEXT 55 0 176 326 " + GetValueOrEmpty(data.BatchNo) + '\n\r';
	//str += "TEXT 55 0 25 340 Batch \n\r";

	str += "TEXT 55 0 340 47 生产日期 " + space + '\n\r';
	str += "TEXT 24 0 480 57 " + GetValueOrEmpty(data.ProductionDate) + '\n\r';
	str += "TEXT 55 0 340 66 Production Date \n\r";

	str += "TEXT 55 0 340 89 产品名称 " + space + '\n\r';
	var partDes = GetValueOrEmpty(data.PartDescription);
	if (partDes.gblen < 20) {
		str += "TEXT 55 0 480 99 " + partDes + '\n\r';
	} else {
		var pd1 = partDes.substr(0, 12);
		var pd2 = partDes.substr(12, 12);
		str += "TEXT 55 0 480 89 " + pd1 + '\n\r';
		str += "TEXT 55 0 480 108 " + pd2 + '\n\r';
	}
	str += "TEXT 55 0 340 108 Product Name \n\r";

	str += "B QR 430 190 M 2 U 3" + '\n\r';
	str += "MK," + GetValueOrEmpty(data.QrCode) + '\n\r';
	str += "ENDQR" + '\n\r';
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';

	str += "PRINT " + '\n\r';

	return str;
}

//二维码测试  
export const get_printstr_QrCode = function (data) {
	var data = {
		VendorCode: "PRC00001",
		VendorName: "XX电子有限公司",
		PartNo: "600014910-01-GP2",
		Qty: "800",
		Unit: "PCS",
		ReelCode: "M0000019100856608",
		QrCode: "J:475C-M61100-0080:SH090:3250:6D39D7BC1F094011B7ACFBB972616766:1.9:0.302:1100:PM00:EA:AK20050014::制造商型号:制造商型号:20200522:20200522:20200522:制造商型号:D20200525:制造商型号:0",
	};

	var str = " ! 0 200 200 400 1 " + '\n\r';
	str += "PAGE-WIDTH 600" + '\n\r';
	str += "B QR 100 30 M 2 U 4" + '\n\r';
	str += "MA," + GetValueOrEmpty(data.QrCode) + '\n\r';
	str += "ENDQR" + '\n\r';
	str += "GAP-SENSE" + '\n\r';
	str += "FORM " + '\n\r';
	str += "PRINT " + '\n\r';

	return str;
}

//创维的客供料标签 
export const get_printstr_CVTE = function (data) {
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

