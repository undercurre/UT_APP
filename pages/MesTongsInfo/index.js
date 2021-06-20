import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import {
	LoadData,
	AddOrModifySave,
	CallWindow,
	GetCallCodeChinese,
	AddCallRecord,
	GetTongsSiteByCodeAsync,
} from '@/api/MesTongsInfo.js'
import {
	mapState
} from 'vuex'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			NameList: [{
					CODE: -1,
					STATUS: '未注册'
				}, {
					CODE: 0,
					STATUS: '待入库'
				},
				{
					CODE: 1,
					STATUS: '存储中'
				},
				{
					CODE: 2,
					STATUS: '借出'
				}, {
					CODE: 3,
					STATUS: '使用中'
				},
				{
					CODE: 4,
					STATUS: '保养中'
				},
				{
					CODE: 5,
					STATUS: '维修中'
				},
				{
					CODE: 6,
					STATUS: '已报废'
				}, {
					CODE: 7,
					STATUS: '永久借出'
				}, {
					CODE: '',
					STATUS: '未知状态'
				}
			],
			NameIndex: -1,
			form: {
				CODE: '',
				CATEGORY_NAME: '',
				MODEL: '',
				USER_PART: -1,
				USER_PART_NAME: "",
				STATION_ID: -1,
				STATION_NAME: '',
				CATEGORY: -1,
				CATEGORY_NAME: "",
				DEFECT_MSG:''
			},
			selectionEnd: 0,
			autoFocus: true, // 工装编码码
			CallType: [],
			CallIndex: -1,
			callform: {
				CALL_CODE: "",
				CALL_CONTENT: "",
				CALL_TYPE_CODE: 0,
				CallContentId: 0,
				OPERATION_SITE_ID: 0,
				OPERATOR: ""
			},
			callcon: {
				callCode: '',
				lineName: '', // 线体
				siteName: '' // 站点
			}
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handlePickeLine(e) {
			this.NameIndex = e.detail.value
			this.form.STATUS = this.NameList[this.NameIndex].CODE
		},
		CallChange(e) {
			if (!this.form.CODE) {
				uni.showModal({
					title: '提示',
					content: '请输入工装编码！',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			this.CallIndex = e.detail.value
			this.callcon.callCode = this.CallType[this.CallIndex].CALL_CODE
			this.callform.CALL_CODE = this.CallType[this.CallIndex].CALL_CODE
			this.GetCallCodeChinese()
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
			this.CallIndex = -1
			this.getCallWindow()
		},

		async submitForm() {
			var that = this
			const map = {
				"CODE": {
					"msg": "请输入工装编码",
					"field": "autoFocus"
				},
			}
			try {
				Object.keys(map).forEach(item => {
					if (!this.form[item]) {
						uni.showModal({
							title: '提示',
							content: map[item].msg || '',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this[map[item].field] = true
								}
							}
						})
						that.$voice.errro()
						throw Error(map[item].msg)
					}
				})
				// if (this.CallIndex === -1) {
				// 	this.$voice.error()
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '请选择呼叫类型',
				// 		showCancel: false
				// 	})
				// 	return false
				// }
				this.submitData()
				// uni.showModal({
				// 	title: "提示",
				// 	content: "确定要提交?",
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			this.submitData()
				// 		} else if (res.cancel) {
				// 			// console.log('用户点击取消');
				// 		}
				// 	}
				// })

			} catch (e) {

			}
		},
		async submitData() {
			this.form.STATUS = 5
			const res = await AddOrModifySave(this.form)
			if (res.Result) {
				// this.AddCallRecord()
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '保存成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '保存失败',
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		},
		getSTATUS(type) {
			switch (type) {
				case 1:
					return '测试工装'
				case 2:
					return '烧录工装'
				case 3:
					return '客户工装'
				case 4:
					return 'ICT单面针床'
				case 5:
					return 'ICT单面针床(托盘)'
				case 6:
					return 'ICT双面针床'
				case 7:
					return 'ICT双面针床(托盘)'
				case 8:
					return 'FCT针床'
				case 9:
					return 'FCT针床(托盘)'
				default:
					return '未知类别'
			}
		},
		getSOURCES(type) {
			switch (type) {
				case 0:
					return '自制'
				case 1:
					return '外购'
				case 2:
					return '转移'
				default:
					return '未知来源'
			}
		},
		// 获取设备信息
		async getLoadScraperData() {
			if (!this.form.CODE) {
				return
			}
			const res = await LoadData({
				'CODE': this.form.CODE,
				'IS_LIKE': 0
			})
			const data = JSON.parse(res.Result) || []
			if (data.length) {
				this.form = data[0]
				if(this.form.STATUS !==2 ){
						this.$voice.error()
						uni.showModal({
							title: '提示',
							content: '【'+ this.form.CODE + '】工装编码不是借出状态，不能报修！',
							showCancel: false
						})
						this.form.ORGANIZE_NAME=''
						this.form.SOURCES_NAME=''
						return false
				}
				
				console.log(this.form.STATUS)
				this.GetTongsSiteByCodeAsync(data[0].CODE)
				this.form.TONGS_TYPE_NAME = this.getSTATUS(data[0].TONGS_TYPE)
				this.form.SOURCES_NAME = this.getSOURCES(data[0].SOURCES)
				this.NameList.map((item, index) => {
					if (item.CODE === this.form.STATUS) {
						this.NameIndex = index
					}
				})
			} else {
				this.resetFormData()
				uni.showModal({
					title: '提示',
					content: '工装编码不存在，请重新输入！',
					showCancel: false
				})
				this.$voice.error()
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
		// 获取上线信息
		async GetTongsSiteByCodeAsync(e) {
			const res = await GetTongsSiteByCodeAsync({
				'Code': e
			})
			if (res.Result) {
				console.log(res.Result)
				const data = res.Result
				if (data.length) {
					this.callcon.lineName = data[0].OPERATION_LINE_NAME
					this.callcon.siteName = data[0].OPERATION_SITE_NAME
					this.callform.CallContentId = data[0].ID
					this.callform.OPERATION_SITE_ID = data[0].SITE_ID
					this.callform.OPERATOR = this.userInfo.USER_NAME
				} else {
					this.resetFormData()
					uni.showModal({
						title: '提示',
						content: '当前工装编码未上线，请重新输入！',
						showCancel: false
					})
					this.$voice.error()
				}
			}
		},
		// 获取呼叫下拉框
		async getCallWindow() {
			const res = await CallWindow({
				'callTypeCode': 0
			})
			this.CallType = res.Result || []
		},
		// 获取呼叫内容
		async GetCallCodeChinese() {
			const res = await GetCallCodeChinese(this.callcon)
			if (res.Result) {
				const data = res.Result
				this.callform.CALL_CONTENT = data.CHINESE
			}
		},
		// 保存呼叫
		async AddCallRecord() {
			const res = await AddCallRecord(this.callform)
			if (res.Result) {
				// const data = res.Result
				// this.callform.CALL_CONTENT = data.CHINESE
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '呼叫失败',
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		},

	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.getCallWindow()
	}
}
