import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	AuditEquipmentValidationData,
	LoadPDAEquipmentValidationList,
	DeletePDAEquipmentValidationData
} from '@/api/SfcsEquipment.js'
export default {
	computed: {
		isfilter() {
			return this.listQuery.START_TIME || this.listQuery.END_TIME
		},
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			statusBarHeight: 0,
			deviceType: [],
			listQuery: {
				Page: 1,
				Limit: 15,
				CHECK_STATUS: '',
				START_TIME: '',
				END_TIME: '',
				CHECK_USER: ''
			},
			statusList: [{
					ID: '',
					SBU_CHINESE: '全部'
				},
				{
					ID: '0',
					SBU_CHINESE: '新增'
				},
				{
					ID: '1',
					SBU_CHINESE: '未审核'
				},
				{
					ID: '2',
					SBU_CHINESE: '已审核'
				}
			],
			checkStatusIndex: 0,
			LoadData: [],
			ListIndex: -1,
			ReviewForm: null
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getIndex() {
			const res = await Index()
			const data = res.Result
			this.getLoadData()
		},
		// 获取列表数据
		async getLoadData() {
			const res = await LoadPDAEquipmentValidationList(this.listQuery)
			const data = res.Result
			console.log('data: ', data)
			if (this.listQuery.Page === 1) {
				this.LoadData = data
			} else {
				this.LoadData = this.LoadData.concat(data)
			}
			this.listQuery.Page++
		},
		// tab事件
		handleChangeStatus(index) {
			this.ListIndex = -1
			this.ReviewForm = null
			this.checkStatusIndex = index
			this.listQuery.CHECK_STATUS = this.statusList[index].ID
			this.listQuery.Page = 1
			this.getLoadData()
		},
		handlePickCreateBegin(e) {
			this.listQuery.START_TIME = e.detail.value
		},
		handlePickCreateEnd(e) {
			this.listQuery.END_TIME = e.detail.value
		},
		resetListQuery() {
			this.listQuery.START_TIME = ''
			this.listQuery.END_TIME = ''
		},
		// 搜索
		handleToSearch() {
			var START_TIME = new Date(this.listQuery.START_TIME)
			var END_TIME = new Date(this.listQuery.END_TIME)
			if (START_TIME > END_TIME) {
				uni.showModal({
					title: '提示',
					content: '结束时间不能大于开始时间',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.ListIndex = -1
			this.ReviewForm = null
			this.listQuery.Page = 1
			this.getLoadData()
		},
		//选中
		handleToDetails(item, index) {
			this.ListIndex = index
			this.ReviewForm = item
		},
		detailedClick(item) {
			var start = false
			var arr = this.LoadData
			if (arr.length) {
				for (var i = 0; i < arr.length; i++) {
					console.log(arr[i])
					if (arr[i].CHECK_STATUS === 0 || arr[i].CHECK_STATUS === 1) {
						start = true
						break
					} else {
						start = false
						break
					}
				}
			}
			if (item.CHECK_CODE) {
				uni.navigateTo({
					url: '/pages/EquipmentService/Service?CHECK_CODE=' + item.CHECK_CODE + '&&MSTID=' + item.ID
				})
			} else {
				if (start) {
					uni.showModal({
						title: '提示',
						content: '请提交审核完，再新增！',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.autoFocus = true
							}
						}
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/EquipmentService/Service'
				})
			}
		},
		// 删除
		async deleteClick(row) {
			uni.showModal({
				title: "提示",
				content: "确定要删除吗?",
				success: (e) => {
					if (e.confirm) {
						DeletePDAEquipmentValidationData(row.CHECK_CODE).then(res => {
							if (res.Result) {
								this.$voice.success()
								uni.showModal({
									title: '提示',
									content: '删除成功',
									showCancel: false,
									success: _ => {
										if (_.confirm) {
											this.listQuery.Page = 1
											this.getLoadData()
										}
									}
								})
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
						})

					} else if (e.cancel) {}
				}
			})
		},
		// 审核
		async Review() {
			if (this.ListIndex === -1) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择要审核一行',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (this.ReviewForm.CHECK_STATUS === 2) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '当前状态已审核',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (this.ReviewForm.CHECK_STATUS !== 1) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '当前盘点未提交，不能审核！',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}

			uni.showModal({
				title: "提示",
				content: "确定要审核?",
				success: (res) => {
					if (res.confirm) {
						this.reviewSub()
					} else if (res.cancel) {}
				}
			})
		},
		async reviewSub() {
			var ReviewData = {
				ID: this.ReviewForm.ID, // 表ID
				STATUS: 2, // 审核状态 1：确认 2：审核
				AUDIT_USER: this.userInfo.USER_NAME, // 审核人员
			}
			const res = await AuditEquipmentValidationData(ReviewData)
			if (res.Result) {
				this.ReviewForm = null
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.listQuery.Page = 1
							this.getLoadData()
						}
					}
				})
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
			// if(e.confirm){this.article.contents.splice(index, 1); this.returnArt();}

		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {

	},
	onShow() {
		this.listQuery.Page = 1
		// this.getIndex()
		this.listQuery.CHECK_USER = this.userInfo.USER_NAME
		this.getLoadData()
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	},
	onPullDownRefresh() {
		this.listQuery.Page = 1
		this.LoadData = []
		this.getLoadData()
	},
	onReachBottom() {
		this.getLoadData()
	}
}
