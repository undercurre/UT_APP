import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import {
	GetBarCodeData,
	SnCodeUpdateBar,
	ReelCodeSplitEx
} from '../../api/splitBarcode.js';
import {
	GetPrintDataById
} from '@/api/CollectProducts.js'
import * as config from '@/utils/config.js'
import {
	mapState
} from 'vuex'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				CODE: '', //条码
				S_QTY: 1,//拆分数量
				F_QTY: 1, //拆分条数
				IsDown:0 ,//是否下架
				userName:'',
				isPrint:true,
			},
			netData: {
				PART_NO: '', //料号
				PART_NAME: ' ', //名称
				ORIGINAL_QUANTITY: ' ', //数量
				PART_DESC: ' '//描述
			},
			autoFocus: true,
			msgList:[],
			msgContentHeight: 200,
			
			newNetData: {},
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			
			autoNextFocus: false
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	onLoad(){
		this.formData.userName=this.userInfo.USER_NAME
	},
	methods: {
		// 检查物料条码
		async handleCheckBarcode() {
			this.autoFocus = false
			if (!this.formData.CODE) {
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
				this.$voice.error()
				return false
			}
			const res = await GetBarCodeData(this.formData.CODE)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				console.log(res)
				this.$voice.success()
				this.autoNextFocus = true
				this.netData = res.Data
				return false
			}
			this.$voice.error()
			uni.showModal({
				title: '提示',
				content: res.Msg || '条码不存在',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						this.formData.CODE = ''
						this.autoFocus = true
					}
				}
			})
		},
		async submitForm() {
			if (!this.formData.CODE) {
				uni.showModal({
					title: '提示',
					content: '请输入物料条码',
					showCancel: false
				})
				return false
			}
			if (!this.formData.S_QTY) {
				uni.showModal({
					title: '提示',
					content: '请选择拆分数量',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			if (this.netData.PART_NO=='') {
				uni.showModal({
					title: '提示',
					content: '请先执行物料条码(回车)',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			
			const res = await ReelCodeSplitEx(this.formData)
			if(res.Result){
				if(res.Result.code==-1){
					this.$voice.error()
					this.resetFormData()
					this.handlePushMsgList(this.FormData, '切分失败', 'error')
				}
				else if(res.Result.code==0) {
					this.$voice.success()
					this.handlePushMsgList(this.FormData, '切分成功' , 'success')
					this.resetFormData()
					 if (res.Result.data) {
					 	this.GetPrint(res.Result.data)
					 }
				}
			}
		},
		arrayChunk(array, size){
		  let data = []
		  for (let i = 0; i < array.length; i += size) {
		    data.push(array.slice(i, i + size))
		  }
		  return data
		},
		mapArrays(options, values){
			const res = {};
			   for(let i = 0; i < options.length; i++){
				   res[options[i]]= values[i]
			   };
			   return res;
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
			const dataLen=temp.length
			let arrList=this.arrayChunk(temp,parseInt(temp.length/2))
			console.log(arrList)
			
			const data=this.mapArrays(arrList[0],arrList[1])
			
			console.log(data)
			
			var printerid = uni.getStorageSync('ble_printerId')
			if (printerid) {
				if (printerid != null && printerid.length > 0) {
					// var data = {
					// 	PART_CODE:"140100100400007X",
					// 	QTY: "1",
					// 	VENDOR_NAME: "国网四川电力送变电建设有限公司变电施工第一分公司",
					// 	LOT_CODE: "151545",
					// 	DATE_CODE: "20210422",
					// 	REEL_CODE: "M210423000120",
					// 	PART_NAME: "中标麒麟操作系统/服务器版/带探针",
					// 	MODEL: "中标麒麟操作系统/服务器版/带探针",
					// 	QR_NO: "SM210423000120|P140100100400007X|Q1|9D20210422|1T151545"
					// };
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
				
				var str = " ! 0 200 200 400 1 " + '\r\n';
				str += "PAGE-WIDTH 640" + '\r\n';
						
						
				str += "SETBOLD 0" + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "BARCODE 128 1 1 60 20 20 " + data.REEL_CODE + " \r\n";
				str += "TEXT 57 0 20 90 " + data.REEL_CODE + " \r\n";
				str += "ENDQR" + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "BARCODE 128 1 1 60 20 120 " + data.PART_CODE + " \r\n";
				str += "TEXT 57 0 20 190 " + data.PART_CODE + " \r\n";
				str += "ENDQR" + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "B QR 400 20 M 4 U 4" + '\r\n';
				str += "MA," + data.QR_NO + '\r\n';
				str += "ENDQR" + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 20 230 物料名称：" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 140 230 " + data.PART_NAME + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 20 265 物料规格：" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 140 265 " + data.MODEL + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 20 320 数量:" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 75 320 " + data.QTY + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 150 320 生产日期:" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 255 320 " + data.DATE_CODE + '\r\n';
						
				str += "SETMAG 2 2" + '\r\n';
				str += "TEXT 57 0 380 320 批次号:" + '\r\n';
				str += "SETMAG 1 1" + '\r\n';
				str += "TEXT 24 0 465 320 " + data.LOT_CODE + '\r\n';
						
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
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		resetFormData(isVibrate = false) {
			if(isVibrate===false){
				this.formData= {
					CODE: '', //条码
					S_QTY: 1,//拆分数量
					F_QTY: 1, //拆分条数
					IsDown:0 ,//是否下架
					userName:this.userInfo.USER_NAME,
					isPrint:true,
				},
				this.netData={
					PART_NO: '', //料号
					PART_NAME: ' ', //名称
					ORIGINAL_QUANTITY: ' ', //数量
					PART_DESC: ' '//描述
				}
				this.autoFocus = true
			}
			else{
				Object.assign(this.$data, this.$options.data(), {
					autoFocus: false
				})
				this.$nextTick(() => {
					this.autoFocus = true
				})
				if (isVibrate) {
					this.$voice.vibrate()
				}
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
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleChange(e) {
			this.formData.S_QTY = e[0];
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceNumberBox
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(300)
			}
		})
	},
}