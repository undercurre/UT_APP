import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import {
	SfcsOperationSites,
	LoadData,
	TraceTongs
} from '@/api/TraceTongs.js'
import {
	mapState
} from 'vuex'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo,
			lineList: state => state.system.lineList,
			currentLine: state => state.system.currentLine,
		})
	},
	data() {
		return {
			NameList: [],
			NameIndex: -1,
			form: {
				TongsNo: '',
				SiteID: -1,
				UserName: '',
				IsExist: 0, //1
				TONGS_MODEL: '',
				SOURCES: '',
				STATUS: ''
			},
			selectionEnd: 0,
			autoFocus: true, // 物料条码
			autoFocusNewLocation: false // 退料数量
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 获取工位
		async SfcsOperationSites() {
			const OPERATION_LINE_ID=this.lineList[this.currentLine].SMT_LINE_ID
			const res = await SfcsOperationSites({OPERATION_LINE_ID})
			this.NameList =JSON.parse(res.Result) || []
		},
		handlePickeLine(e) {
			this.NameIndex = e.detail.value
			console.log(this.NameList[this.NameIndex])
			this.form.SiteID = this.NameList[this.NameIndex].ID
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
			this.SfcsOperationSites()
		},

		async submitForm() {
			this.autoFocus = this.autoFocusNewLocation = false
			const map = {
				"TongsNo": {
					"msg": "请输入工装",
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
						this.$voice.errro()
						throw Error(map[item].msg)
					}
				})
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
			this.form.UserName = this.userInfo.USER_NAME
			console.log(this.form)
			const res = await TraceTongs(this.form)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
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
			} else {
				// console.log(res.Msg,'res.Msg')
				if (res.Msg == '当前工位已经存在工装，是否需要进行替换操作？') {
					return uni.showModal({
						title: "提示",
						content: res.Msg,
						success: (res) => {
							if (res.confirm) {
								this.form.IsExist = 0
								this.submitData()
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					})
				} if (res.Msg.indexOf("#")!=-1) {
					this.form.IsExist = 1
					this.submitData()
					
				}else {
					uni.showModal({
						title: '提示',
						content: res.Msg || '保存失败',
						showCancel: false,
						success: _ => {}
					})
					this.$voice.error()
					return false
				}
			}
		
		},
		getSTATUS(type) {
			switch (type) {
				case -1:
					return '未注册'
				case 0:
					return '待入库'
				case 1:
					return '存储中'
				case 2:
					return '借出'
				case 3:
					return '使用中'
				case 4:
					return '保养中'
				case 5:
					return '维修中'
				case 6:
					return '已报废'
				case 7:
					return '永久借出'
				default:
					return ''
			}
		},
		// 获取工装信息
		async getLoadScraperData() {
			if (!this.form.TongsNo) {
				return
			}
			const res = await LoadData({
				'CODE': this.form.TongsNo,
				'IS_LIKE': 0
			})
			const data = JSON.parse(res.Result) || []
			console.log(data)
			if (data.length) {
				this.form.TONGS_MODEL = data[0].TONGS_MODEL
				this.form.SOURCES = data[0].SOURCES
				if (this.form.SOURCES === 0) {
					this.form.SOURCES = '自制'
				} else if (this.form.SOURCES === 1) {
					this.form.SOURCES = '外购'
				} else if (this.form.SOURCES === 2) {

					this.form.SOURCES = '转移'
				} else {
					this.form.SOURCES = ''

				}
				this.form.STATUS = this.getSTATUS(data[0].STATUS)
			
			} else {
				this.resetFormData()
				uni.showModal({
					title: '提示',
					content: '工装不存在，请重新输入！',
					showCancel: false
				})
				this.$voice.error()
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.SfcsOperationSites()
	}
}
