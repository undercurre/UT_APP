import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import { GetCurrentStations, ResetCompare } from '../../api/materialsReset.js'
export default {
	data() {
		return {
			list: [],
			scrollHeight: 0,
			stations: [],
			timer: null
		}
	},
	methods: {
		async initPage() {
			const result = await GetCurrentStations()
			if (result.Code === config.SUCCESS_CODE) {
				this.list = result.Data ? result.Data : []
			} else {
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false
				})
				this.$voice.error()
				this.list = []
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData() {
			this.list = []
			this.stations = []
			this.initPage()
		},
		handleCheck(e, item) {
			let value = e.detail.value[0]
			if (value) {
				this.stations.push(value)
			} else {
				this.stations.splice(this.stations.indexOf(item), 1)
			}
		},
		async submitForm() {
			if (this.stations.length === 0) {
				uni.showModal({
					title: '提示',
					content: '请选择机台',
					showCancel: false
				})
				return false
			}
		
			let arr = []
			// 并发执行
			this.stations.map(item => {
				arr.push(new Promise((resolve, reject) => {
					resolve(ResetCompare(item))
				}))
			})
			uni.showLoading({
				title: 'loading...'
			})
			const result = await Promise.all(arr)
			uni.hideLoading()
			let successStr = ''
			let errorStr = ''
			result.map((item, index) => {
				if (item.Code === config.SUCCESS_CODE) {
					if (item.Data) {
						successStr += this.stations[index] + ' '
					} else {
						errorStr += this.stations[index] + ' '
					}
				} else {
					errorStr += this.stations[index] + ' '
				}
			})
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '对料成功：' + successStr + '\r\n' + '对料失败：' + errorStr,
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						this.resetFormData()
					}
				}
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onReady() {		
		let that = this
		uni.getSystemInfo({
			success(res) {
				const windowHeight = res.windowHeight
				that.scrollHeight = windowHeight - uni.upx2px(30) - 44 - uni.upx2px(160) - uni.upx2px(130) - uni.upx2px(10)
			}
		})
	},
	onLoad() {
		this.initPage()
	},
	onShow() {
			
	},
	onUnload() {
		
	}
}