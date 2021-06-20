import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	EnterStore,
	LoadData,
	MesTongsStoreConfigLoadData
} from '@/api/FixtureQuery.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			formData: {
				CODE: '',
				STORE_CODE: ''
			},
			autoFocus: true,
			netData: {
				STORE_NAME:''
				
			},
			autoFocusNext: false,
			
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
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
		},
		async getMesTongsInfo() {
			this.autoFocus = false
			if (!this.formData.CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入产品编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await LoadData(this.formData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.netData = JSON.parse(res.Result || [])[0] || {}
				this.autoFocusNext = true
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
		getCateGory(TONGS_TYPE) {
			switch (TONGS_TYPE) {
				case 1:
					return '测试工装';
					break;
				case 2:
					return '烧录工装';
					break;
				case 3:
					return '客户工装';
					break;
				case 4:
					return 'ICT单面针床';
					break;
				case 5:
					return 'ICT单面针床(托盘)';
					break;
				case 6:
					return 'ICT双面针床';
					break;
				case 7:
					return 'ICT双面针床(托盘)';
					break;
				case 8:
					return 'FCT针床';
					break;
				case 9:
					return 'FCT针床(托盘)';
					break;
				default:
					return '';
					break;
			}
		},
		getStatus(STATUS) {
			STATUS = parseInt(STATUS)
			switch (STATUS) {
				case -1:
					return '未注册';
					break;
				case 0:
					return '待入库';
					break;
				case 1:
					return '存储中';
					break;
				case 2:
					return '借出';
					break;
				case 3:
					return '使用中';
					break;
				case 4:
					return '保养中';
					break;
				case 5:
					return '维修中';
					break;
				case 6:
					return '已报废';
					break;
				case 7:
					return '永久借出';
					break;
				default:
					return '';
					break;
			}
		},
		submitForm() {
			this.autoFocus = false
			this.autoFocusNext = false
			if (!this.formData.CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入夹具编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.formData.STORE_CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装储位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			uni.showModal({
				title: '提示',
				content: '是否确认归还工装？',
				success: async _ => {
					if (_.confirm) {
						const res = await EnterStore({
							TongsID: this.netData.ID || '',
							StoreID: this.formData.StoreID || '',
							UserName: this.userInfo.USER_NAME
						})
						if (res.ErrorInfo.Status) {
							this.$voice.error()
							uni.showModal({
								title: '提示',
								content: res.ErrorInfo.Message || '归还失败',
								showCancel: false,
								success: _ => {
									if (_.confirm) {
										this.resetFormData()
									}
								}
							})
							return false
						}
						if (res.Result) {
							this.$voice.success()
							uni.showModal({
								title: '提示',
								content: '归还成功',
								showCancel: false,
								success: _ => {
									if (_.confirm) {
										this.resetFormData()
									}
								}
							})
						} else {
							this.$voice.error()
							uni.showModal({
								title: '提示',
								content: '归还失败',
								showCancel: false,
								success: _ => {
									if (_.confirm) {
										this.resetFormData()
									}
								}
							})
						}
					}
				}
			})
		},
		async getMesStoreInfo() {
			this.autoFocusNext = false
			if (!this.formData.STORE_CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装储位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await MesTongsStoreConfigLoadData({
				CODE: this.formData.STORE_CODE
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '查询夹具储位失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.STORE_CODE = ''
							this.formData.StoreID = ''
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.formData.StoreID = (JSON.parse(res.Result || []) || {})[0].ID || ''
				this.netData.STORE_NAME = (JSON.parse(res.Result || []) || {})[0].NAME || ''
				this.$voice.success()
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '查询夹具储位失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.STORE_CODE = ''
							this.formData.StoreID = ''
							this.autoFocusNext = true
						}
					}
				})
			}
		}
	},
	onLoad() {
		
	},
	components: {
		graceHeader,
		gracePage
	}
}