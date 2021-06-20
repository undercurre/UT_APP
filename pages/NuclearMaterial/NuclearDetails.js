import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import {
	mapState
} from 'vuex'
import {
	LoadPartCheckDetailData,
	DeleteOneById
} from '@/api/MesPartShelf.js'
export default {
	computed: {
		isfilter() {
			return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		}
	},
	data() {
		return {
			Form: {
				REEL_CODE: '',
				HID: 0, //
				Page: 1,
				Limit: 20
			},
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			totalCount: 0,
			QTY: '',
			CHECK_QTY: ''
		}
	},
	onLoad(e) {
		console.log(e, 'eee')
		this.Form.HID = e.HID || null
		this.QTY = e.QTY
		this.CHECK_QTY = e.CHECK_QTY
		if (this.Form.HID) {
			this.getdata()
		}

	},
	methods: {

		// 物料条码
		getFeida() {
			this.autoFocus = false
			if (!this.Form.REEL_CODE) {
				this.$voice.error()
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
				return false
			}
			this.getdata()
		},
		async getdata() {
			const res = await LoadPartCheckDetailData(this.Form)
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
				// this.list = res.Result
				const data = res.Result || []
				// if (this.Form.Page === 1) {
				this.list = data
				// } else {
				// this.list = this.list.concat(data)
				// }
				// this.Form.Page++
				this.totalCount = res.TotalCount
			}
		},
		// 分页
		changeReason3(e) {
			this.Form.Page = e.current
			this.getWoNo()
		},
		async deleteClick(row) {
			uni.showModal({
				title: "提示",
				content: "确定要删除?",
				success: (e) => {
					if (e.confirm) {
						DeleteOneById(row.ID).then(res => {
							if (res.Result) {
								this.$voice.success()
								uni.showModal({
									title: '提示',
									content: '删除成功',
									showCancel: false,
									success: _ => {
										if (_.confirm) {
											this.Form.Page = 1
											this.getdata()
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
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
	},
	components: {
		graceHeader,
		gracePage,
		uniPagination
	},
	// onShow() {
	// 	this.Form.Page = 1
	// 	this.getdata()
	// 	// this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	// },
	// onPullDownRefresh() {
	// 	this.Form.Page = 1
	// 	this.list = []
	// 	this.getdata()
	// },
	// onReachBottom() {
	// 	this.getdata()
	// }
}
