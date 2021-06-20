import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
	
import {
	mapState
} from 'vuex'
import {
	MesTongsStoreConfigLoadData,
} from '@/api/FixtureQuery.js'
import {
	AuditTongsCheckData,
	SavePDATongsCheckData,
	LoadPDATongsCheckInfo
} from '@/api/MesTongsInfo.js'
export default {
	computed: {
		isfilter() {
			return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		},
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},

	data() {
		return {
			Storage: '',
			Form: {
				CHECK_CODE: '', // 点检编号(新增不传)
				CHECK_USER: '', //点检人员（必传）
				CHECK_REMARKS: '', // 备注 
				TONGS_BODYMARK: '', //工装编号 （必传）
				TONGS_STORE: 0, //工装储位 （必传
				Page: 1,
				Limit: 10
			},
			autoFocus: true,
			autoFocusNext: false,
			checkReelFlag: false,
			list: [],
			totalCount: 0,
			formData: {
				ID: 0, // 表ID
				STATUS: 1, // 审核状态 1：确认 2：审核
				AUDIT_USER: '', // 审核人员
				AUDIT_REMARKS: '', //审核备注
			},
			insertFormData: {
				Page: 1,
				Limit: 10,
				CHECK_USER: ''
			},
			insertTotalCount: 0,
			StorageList: [],
			StorageIndex: -1,
			msgContentHeight: 200,
			headers:['工装编码','工装名称','储位','状态'],
			headers1: [{
				label: '工装编码',
				key: 'CODE'
			}, {
				label: '工装名称',
				key: 'TONGS_TYPE'
			}, {
				label: '储位',
				key: 'STORE_NAME'
			}, {
				label: '状态',
				key: 'KDETAIL_STATUS'
			}],
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	onLoad(e) {
		this.formData.ID = e.MSTID || 0
		this.Form.CHECK_CODE = e.EEDER || ''
		if (this.Form.CHECK_CODE) {
			this.Form.TONGS_STORE = 0
			this.getdata()
		} else {
			this.getLoadPDAFeederCheckInfo()
		}
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(230)
			}
		})
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getMesTongsStoreConfigLoadData() {
			var obj = {
				Page: 1,
				Limit: 10,
			}
			const res = await MesTongsStoreConfigLoadData(obj)
			this.StorageList = JSON.parse(res.Result) || []
		},
		handlePickeLine(e) {
			console.log(e.detail.value)
			this.StorageIndex = e.detail.value
			this.Form.TONGS_STORE = this.StorageList[this.StorageIndex].ID
		},
		async getLoadPDAFeederCheckInfo() {
			this.insertFormData.CHECK_USER = this.userInfo.USER_NAME
			const res = await LoadPDATongsCheckInfo(this.insertFormData)
			if (res.Result) {
				this.list = res.Result || []
				this.insertTotalCount = res.TotalCount || 0

			}
		},
		async getStorage() {
			this.autoFocus = false
			if (!this.Storage) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装编码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			var obj = {
				Page: 1,
				Limit: 10,
				IS_LIKE: 0,
				CODE: this.Storage
			}
			const res = await MesTongsStoreConfigLoadData(obj)
			if (res.Result) {
				const data = JSON.parse(res.Result) || []
				this.Form.TONGS_STORE = data[0].ID
				this.autoFocus = false
				this.checkReelFlag = true
			}

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

		},
		async getFeida() {
			this.checkReelFlag = false
			if (!this.Storage) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入储位编码回车',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.checkReelFlag = true
						}
					}
				})
				return false
			}
			if (!this.Form.TONGS_BODYMARK) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工装编码回车',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.autoFocus = false
			this.getdata()

		},
		changeReason(e) {
			this.Form.Page = e.current
			this.getdata()
		},
		async getdata() {
			this.autoFocus = false
			this.Form.CHECK_USER = this.userInfo.USER_NAME
			console.log(this.Form)
			const res = await SavePDATongsCheckData(this.Form)
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

			if (res.Result) {
				this.$voice.success()
				this.Storage = ''
				this.Form.TONGS_BODYMARK = ''
				this.autoFocus = true
				this.checkReelFlag = false
				this.list = res.Result || []
				this.totalCount = res.TotalCount || 0
			}
		},
		async submitForm() {
			this.autoFocus = false
			this.checkReelFlag = false
			if (!this.formData.ID) {
				this.list.map(v => {
					if (v.KDID)
						this.formData.ID = v.KDID || 0
				})
			}
			if (!this.Form.CHECK_CODE) {
				if (!this.Storage) {
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: '请输入储位编码回车',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoFocus = true
								this.checkReelFlag = true
							}
						}
					})
					return false
				}
				if (this.formData.ID === 0) {
					this.$voice.error()
					this.autoFocus = false
					uni.showModal({
						title: '提示',
						content: '请输入工装编码回车',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoFocus = true
								this.checkReelFlag = true
							}
						}
					})
					return false
				}
			}
			this.formData.AUDIT_REMARKS = this.Form.CHECK_REMARKS
			this.formData.AUDIT_USER = this.userInfo.USER_NAME
			this.formData.ID = Number(this.formData.ID)
			const res = await AuditTongsCheckData(this.formData)
			if (res.Result) {
				this.Form = {}
				this.formData.ID = 0
				this.StorageIndex = -1
				// this.Form.CHECK_REMARKS = ''
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {
						this.Form = {}
						this.Storage = ''
					}
				})
			}
			if (res.ErrorInfo.Status) {
				this.NewsInfo = res.ErrorInfo.Message
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

	},

	components: {
		graceHeader,
		gracePage,
		uniPagination
	},
}
