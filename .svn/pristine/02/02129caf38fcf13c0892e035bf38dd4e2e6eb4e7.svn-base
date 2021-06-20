import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import {
	mapState
} from 'vuex'
import {
	GetShelfByWONO
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
				WO_NO: '',
				Page: 1,
				Limit: 15
			},
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			totalCount: 0
		}
	},
	onLoad(e) {
	},
	methods: {

		// 物料条码
		getFeida() {
			this.autoFocus = false
			if (!this.Form.WO_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入工单',
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
			const res = await GetShelfByWONO(this.Form)
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
			this.getdata()
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
	// 	// this.getdata()
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
