import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import { mapState } from 'vuex'
import {
	AddOrModify,
	GetEquipmentStatus
} from '@/api/SfcsEquipKeep.js'
function getToday () {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

export default {
	data() {
		return {
			formData: {
				ID: '0',
				PRODUCT_NO: '', // 设备编号
				STATION_ID: '', // 线别
				EQUIP_ID: '', // 设备
				KEEP_TYPE: '', // 保养类型
				EQUIP_STATUS: '', // 设备状态
				KEEP_TIME: getToday(),
				KEEP_USER: ''
			},
			deviceStatus: false,
			autoFocus: true,
			currentSelection: '',
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			EquipmentList: [],
			EquipmentIndex: -1,
			// KeepTypeList: [],
			KeepTypeList: [{
				KEEP_TYPE: 0,
				label: '日保养',
				Value: 0
			}, {
				KEEP_TYPE: 3,
				label: '周保养',
				Value: 3
			}, {
				KEEP_TYPE: 1,
				label: '月保养',
				Value: 1
			}, {
				KEEP_TYPE: 4,
				label: '季度保养',
				Value: 4
			}, {
				KEEP_TYPE: 2,
				label: '年保养',
				Value: 2
			}],
			KeepTypeIndex: -1,
			EquipStatusList: [],
			EquipStatusIndex: -1,
			CategoryTypeList:[],
			CategoryTypeIndex:-1,
			LinesList: [],
			LinesIndex: -1,
			ReviewVal: {
				ID: ''
			},
			EquipmentArr: [],
			keepCheckStatusList: [{
				status: 0,
				label: '待审核'
			}, {
				status: 1,
				label: '已审核'
			}, {
				status: 3,
				label: '拒绝'
			}, {
				status: 4,
				label: '新增'
			}]
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		// 获取添加或修改视图
		async getAddOrModify() {
			const res = await AddOrModify(this.formData.ID)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				return false
			}
			const data = res.Result
			const { KeepHead = {}, LinesList = [], EquipmentList = {}, KeepTypeList = [], EquipStatusList = [], CategoryTypeList = [] } = data
			this.ReviewVal.ID = KeepHead.ID
			this.LinesList = LinesList
			this.EquipmentList = EquipmentList
			this.EquipmentArr = EquipmentList
			// this.KeepTypeList = KeepTypeList.filter((v, k) => k > 0 ? true : false)
			this.EquipStatusList = EquipStatusList.filter((v, k) => k > 0 ? true : false)
			this.CategoryTypeList = CategoryTypeList.filter((v, k) => k > -1 ? true : false)
			if (KeepHead.ID) {
				this.formData.PRODUCT_NO = KeepHead.PRODUCT_NO
				this.formData.STATION_ID = KeepHead.STATION_ID
				this.LinesList.map((item, index) => {
					if (item.ID === KeepHead.STATION_ID) {
						this.LinesIndex = index
					}
				})
				this.EquipmentArr.map((item, index) => {
					if (item.ID === KeepHead.EQUIP_ID) {
						this.EquipmentIndex = index
					}
				})
				this.KeepTypeList.map((item, index) => {
					if (KeepHead.KEEP_TYPE === parseInt(item.Value)) {
						this.KeepTypeIndex = index
					}
				})
				this.EquipStatusList.map((item, index) => {
					if (KeepHead.EQUIP_STATUS === parseInt(item.Value)) {
						this.EquipStatusIndex = index
					}
				})
				this.CategoryTypeList.map((item,index) => {
					if(KeepHead.CATEGROY == parseInt(item.LOOKUP_CODE)){
						this.CategoryTypeIndex = index
					}
				})
				this.formData.EQUIP_ID = KeepHead.EQUIP_ID
				this.formData.EQUIP_STATUS = KeepHead.EQUIP_STATUS
				this.formData.KEEP_TYPE = KeepHead.KEEP_TYPE
				this.formData.KEEP_TIME = KeepHead.KEEP_TIME
				this.formData.KEEP_CHECK_STATUS = KeepHead.KEEP_CHECK_STATUS
				this.formData.KEEP_CODE = KeepHead.KEEP_CODE
				if (this.formData.KEEP_CHECK_STATUS !== 4) {
					this.deviceStatus = true
				}
				if (!KeepHead.KEEP_USER) {
					this.formData.KEEP_USER = this.userInfo.USER_NAME
				}
			}
		},
		// picker选择线体回调
		handlePickLine(e) {
			this.LinesIndex = e.detail.value
			this.formData.STATION_ID = this.LinesList[this.LinesIndex] ? this.LinesList[this.LinesIndex].ID : '';
			this.EquipmentIndex = -1
			this.EquipmentList = this.EquipmentArr.map(v => v.STATION_ID === this.formData.STATION_ID ? v : null).filter(v => v ? true : false)
		},
		// picker选择设备回调
		handlePickEquipment(e) {
			this.EquipmentIndex = e.detail.value
			this.formData.EQUIP_ID = this.EquipmentList[this.EquipmentIndex] ? this.EquipmentList[this.EquipmentIndex].ID : '';
			this.EquipmentList.forEach((item,index) => {
				if (item.ID === this.formData.EQUIP_ID) {
					this.formData.PRODUCT_NO = item.PRODUCT_NO
					this.formData.STATION_ID = item.STATION_ID
					this.LinesList.map((v, k) => {
						if (v.ID === item.STATION_ID) {
							this.LinesIndex = k
						}
					})
				}
			})
		},
		// picker选择保养类型回调
		handlePickKeepType(e) {
			this.KeepTypeIndex = e.detail.value
			this.formData.KEEP_TYPE = this.KeepTypeList[this.KeepTypeIndex] ? this.KeepTypeList[this.KeepTypeIndex].Value : '';
		},
		// picker选择设备状态
		handlePickEquipStatus(e) {
			this.EquipStatusIndex = e.detail.value
			this.formData.EQUIP_STATUS = this.EquipStatusList[this.EquipStatusIndex] ? this.EquipStatusList[this.EquipStatusIndex].Value : '';
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
		// 设备编号回车事件
		handlePRODUCT_NO() {
			this.autoFocus = false
			try {
				this.EquipmentArr.map((item, index) => {
					if (item.PRODUCT_NO === this.formData.PRODUCT_NO) {
						this.formData.STATION_ID = item.STATION_ID
						this.LinesList.map((v, k) => {
							if (v.ID === item.STATION_ID) {
								this.LinesIndex = k
							}
						})
						this.CategoryTypeList.map((v,k)=>{
							if(v.LOOKUP_CODE === item.CATEGORY){
								this.CategoryTypeIndex = k
							}
						})
						this.formData.EQUIP_ID = item.ID
						this.EquipmentIndex = index
						throw Error('break')
					}
				})
				this.formData.STATION_ID = ''
				this.formData.EQUIP_ID = ''
				this.LinesIndex = -1
				this.EquipmentIndex = -1
				this.EquipmentList = JSON.parse(JSON.stringify(this.EquipmentArr))
				uni.showModal({
					title: '提示',
					content: '没有找到设备',
					showCancel: false,
					success: _ => {
						
					}
				})
				this.$voice.error()
			} catch (e) {
				
			}
		},
		// 清除
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				LinesList: this.LinesList,
				EquipmentList: this.EquipmentList,
				EquipStatusList: this.KeepTypeList,
				KeepTypeList: this.KeepTypeList,
				autoFocus: false,
				EquipmentArr: this.EquipmentArr
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		},
		// 开始点检
		submitForm() {
			this.autoFocus = false
			if (this.formData.EQUIP_ID === '') {
				uni.showModal({
					title: '提示',
					content: '请选择设备',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.EQUIP_ID = ''
							this.EquipmentList = this.EquipmentArr
							this.EquipmentIndex = -1
							this.LinesIndex = -1
							this.formData.STATION_ID = ''
							this.formData.PRODUCT_NO = ''
							this.autoFocus = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			if (this.formData.KEEP_TYPE === '') {
				uni.showModal({
					title: '提示',
					content: '请选择保养类型',
					showCancel: false
				})
				this.$voice.error()
				return false
			} 
			// if (this.formData.EQUIP_STATUS === '') {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '请选择设备状态',
			// 		showCancel: false
			// 	})
			// 	this.$voice.error()
			// 	return false
			// }
			if (!this.formData.KEEP_USER) {
				this.formData.KEEP_USER = this.userInfo.USER_NAME
			}
			
			// 页面跳转
			uni.navigateTo({
				url: '/pages/SfcsEquipKeepCheck/index?formData=' + JSON.stringify(this.formData) + '&EquipStatusList=' + JSON.stringify(this.EquipStatusList),
				success: _ => {
					this.resetFormData()
				}
			})
		},
		getKeepCheckStatus(keepCheckStatus) {
			let res = ''
			this.keepCheckStatusList.map(item => {
				if (item.status === keepCheckStatus) {
					res = item.label
				}
			})
			return res
		},
		getKeepCheckStatusColor(keepCheckStatus) {
			let res = ''
			this.keepCheckStatusList.map(item => {
				if (item.status === keepCheckStatus) {
					if (item.status == 0) {
						res = '#fa810f'
					} else if (item.status == 1) {
						res = '#00b16f'
					} else if (item.status == 3) {
						res = '#f14000'
					} else if (item.status == 4) {
						res = '#009c50'
					}
				}
			})
			return res
		},
		// 开启扫码
		openScanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				scanType: ['qrCode', 'barCode'],
				success: _ => {
					this.formData.PRODUCT_NO = _.result
					this.handlePRODUCT_NO()
				},
				fail: _ => {
					
				}
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad(e) {
		this.formData.ID = e.ID || '0'
	},
	onShow() {
		this.getAddOrModify()
	},
	onHide() {
		clearInterval(this.timer)
	},
	onUnload() {
		clearInterval(this.timer)
	}
}