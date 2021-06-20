import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	LoadData,
	PDAMaintain,
	BeginMaintain,
	GetMaintainItemsData,
	SavePDATongsValidationData,
	EndMaintain
} from '@/api/MesTongsInfo.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			Form: {
				ID: 0, //
				STATUS: '1', //状态
				REMARK: '', //备注

				DetailList: [],
				MAINTAIN_USER: "", // 保养人
				CREATE_USER: '',
				TONGS_ID: 0,
				UserName: ""
			},

			autoFocusNext: false,
			list: [],
			totalCount: 0,
			Maintain: [],
			info: {},
			autoFocus: true,
			UrlStatus: false,
			switchSize:30
		}
	},
	onLoad(e) {
		// #ifdef H5
		this.switchSize=50
		// #endif
		if (e.CODE) {
			this.autoFocus = false
			this.getLoadData(e.CODE)
		} else {
			this.autoFocus = true
			this.UrlStatus = true
		}

	},
	methods: {
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
		//基本信息
		async getLoadData(e) {
			if (this.UrlStatus) {
				e = this.info.CODE
			}
			const res = await LoadData({
				CODE: e,
				IS_LIKE: 0,
				Page: 1,
				Limit: 15
			})
			if (res.Result) {
				const data = JSON.parse(res.Result)[0] || []
				if (this.UrlStatus && data.length === 0) {
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: '工装编号不存在，请重新输入！',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.info.CODE = ''
								this.autoFocus = true
							}
						}
					})
					return
				}
				if (this.UrlStatus && data.STATUS !== 1 && data.STATUS !== 4 && data.STATUS !== 2) {
					uni.showModal({
						title: '提示',
						content: '当前工装不是【存储中、借出、保养中】状态，无法保养！',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.info.CODE = ''
								this.autoFocus = true
							}
						}
					})
					return
				}
				this.info = JSON.parse(res.Result)[0] || {}
				console.log(this.info)
				this.GetMaintainItemsData(this.info.TONGS_TYPE)
				this.info.TONGS_TYPE = this.getCateGory(this.info.TONGS_TYPE)
				this.info.STATUS = this.getStatus(this.info.STATUS)
				this.Form.TONGS_ID = this.info.ID
				//this.BeginMaintain(this.info.ID)
				console.log(this.info, 'this.info')
			} else {

			}

		},
		// 开始保养
		async BeginMaintain(e) {
			const res = await BeginMaintain({
				TongsID: e,
				UserName: this.userInfo.USER_NAME
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}
			this.Form.ID = res.Result
		},
		// 保养事项
		async GetMaintainItemsData(e) {
			const res = await GetMaintainItemsData({
				tongsType: e
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}
			this.Maintain = JSON.parse(res.Result)
			this.Maintain.map(res => {
				if (res.ACTIVE == 'Y') {
					res.ACTIVE = true
				} else {
					res.ACTIVE = false
				}
			})
			console.log(this.Maintain, 'this.Maintain')
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 提交
		async submitForm() {
			if (this.UrlStatus) {
				if (!this.info.CODE) {
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: '请输入工装编号回车',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoFocus = true
							}
						}
					})
					return false
				}
			}
			this.Form.MAINTAIN_USER = this.userInfo.USER_NAME
			this.Form.CREATE_USER = this.userInfo.USER_NAME
			this.Form.UserName = this.userInfo.USER_NAME
			this.Form.DetailList = []
			var obj = {}
			if (this.Maintain.length) {
				this.Maintain.map(v => {
					obj = {
						ID: 0, ///number($double)表ID
						MST_ID: Number(this.Form.ID), // number($double)maxLength: 22主表ID
						ITEM_ID: Number(v.ID), // number($double)maxLength: 22保养事项ID
						ITEM_NAME: v.ITEM_NAME, //事项名称
						ITEM_DESC: v.REMARK, //事项描述
						ITEM_STATUS: v.ACTIVE ? 1 : 2, // 保养状态，1：正常，2：异常
						REMARK: v.DESC // 描述
					}
					this.Form.DetailList.push(obj)
				})
			}
			let res = null
			if (this.UrlStatus) {
				res = await EndMaintain(this.Form)
			} else {
				res = await PDAMaintain(this.Form)
			}
			if (res.Result && this.UrlStatus) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {
						this.info = {}
					}
				})
			} else {
				let Maidata = Number(res.Result)
				if (res.Result && Maidata !== 0) {
					console.log(res.Result)
					const cod = await SavePDATongsValidationData({
						TONGS_BODYMARK: this.info.CODE,
						TONGS_MAINTAIN_ID: Maidata,
						CHECK_USER: this.userInfo.USER_NAME
					})
					if (cod.Result) {
						var CHECK_CODE = ''
						cod.Result.map(v => {
							if (v.CHECK_CODE) {
								CHECK_CODE = v.CHECK_CODE
							}
						})
						uni.showModal({
							title: '提示',
							content: '提交成功',
							showCancel: false,
							success: _ => {
								uni.redirectTo({
									url: '/pages/ToolingVerification/details?CODE=' + CHECK_CODE
								})
							}
						})
						this.$voice.success()
					}
					if (cod.ErrorInfo.Status) {
						this.NewsInfo = cod.ErrorInfo.Message
						this.$voice.error()
						uni.showModal({
							title: '提示',
							content: cod.ErrorInfo.Message,
							showCancel: false,
							success: _ => {}
						})
						return false
					}
				}
			}
			if (res.ErrorInfo.Status) {
				this.NewsInfo = res.ErrorInfo.Message
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {}
				})
				return false
			}
		},

	},
	components: {
		graceHeader,
		gracePage
	},
	onShow() {

	},
	onPullDownRefresh() {

	},
	onReachBottom() {

	}
}
