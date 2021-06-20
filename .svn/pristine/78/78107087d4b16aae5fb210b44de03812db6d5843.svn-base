import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	GetWONO,
	ProducLineEnd,
	GetHiProductList
} from '@/api/ProductLineMaterial/StartJob.js'
import {
	mapGetters
} from 'vuex'
export default {
	data() {
		return {
			autoFocus: true,
			formData: {
				WO_NO: ''
			},
			msgContentHeight: 200,
			list: [],
			checkedWoNos: []
		}
	},
	computed: {
		...mapGetters(['token', 'currentLine', 'lineList']),
		isAll() {
			if (!this.checkedWoNos.length) return false
			if (this.checkedWoNos.length === this.list.length) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// async getList() {
		// 	const res = await GetWONO({
		// 		WO_NO: this.formData.WO_NO,
		// 		Page: 1,
		// 		Limit: 10000
		// 	})
		// 	this.list = res.Result || []
		// },
		async getList() {
			const res = await GetHiProductList(this.lineList[this.currentLine].SMT_LINE_ID)
			this.list = res.Data || []
		},
		handleSearchWoNo() {
			this.checkedWoNos = []
			this.getList()
		},
		checkBoxChange(e) {
			this.checkedWoNos = e.detail.value
		},
		checkAll(e) {
			const val = e.detail.value[0]
			if (val) {
				this.checkedWoNos = this.list.map(i => i.WO_NO)
			} else {
				this.checkedWoNos = []
			}
		},
		async submitForm() {
			if (!this.checkedWoNos.length) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入要下线的工单',
					showCancel: false
				})
				return false
			}
			const ProducLineArray = this.list.map(i => {
				if (this.checkedWoNos.indexOf(i.WO_NO) !== -1) {
					return {
						woNo: i.WO_NO,
						lineId: i.LINE_ID,
						user: this.token,
						multNo: i.BATCH_NO,
						routeId: 0,
						keepWo: false
					}
				}
			}).filter(i => i && i)
			const res = await ProducLineEnd({
				ProducLineArray
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '下线失败',
					showCancel: false
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.autoFocus = false
				this.formData = {
					WO_NO: ''
				}
				this.list = []
				this.checkedWoNos = []
				uni.showModal({
					title: '提示',
					content: '下线成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.getList()
						}
					}
				})
				
				
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '下线失败',
					showCancel: false
				})
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.getList()
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(60)
			}
		})
	}
}