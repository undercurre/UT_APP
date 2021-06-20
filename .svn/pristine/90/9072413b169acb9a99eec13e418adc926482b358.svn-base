import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	GetOnlineStationInfo,
	DoWoOffline
} from '../../api/workOffline.js'
import * as config from '../../utils/config.js'
export default {
	data() {
		return {
			list: [],
			scrollHeight: 50,
			stations: [],
			loading: false,
			timer: null
		};
	},
	methods: {
		checkAllHelper(e) {
			if (e.detail.value.length) {
				this.stations = this.list
			} else {
				this.stations = []
			}
		},
		async initPage() {
			const result = await GetOnlineStationInfo()
			console.log('========= ', JSON.stringify(result))
			if (result.Code === config.SUCCESS_CODE) {
				if (result.Data) {
					this.list = result.Data.split('|')
				} else {
					this.list = []
				}
			} else {
				this.list = []
				uni.showModal({
					title: '提示',
					content: JSON.stringify(result.Msg),
					showCancel: false
				})
				this.$voice.error()
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if (!this.stations.length) {
				uni.showModal({
					title: '提示',
					content: '请选择机台',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			const stations = []
			this.stations.map(item => {
				stations.push(item.split('->')[0])
			})
			const result = await DoWoOffline({
				stations
			})
			if (result.Code === config.SUCCESS_CODE) {
				uni.showModal({
					title: '提示',
					content: '工单下线成功',
					showCancel: false,
					success: (_) => {
						if (_.confirm) {
							this.resetData()
							this.initPage()
						}
					}
				})
				this.$voice.success()
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: result.Msg,
					showCancel: false
				})
			}
		},
		handleCheck(e) {
			this.stations = e.detail.value
		},
		resetData() {
			this.list = []
			this.stations = []
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	watch: {

	},
	onLoad() {
		let that = this
		this.initPage()
		uni.getSystemInfo({
			success(res) {
				const windowHeight = res.windowHeight
				that.scrollHeight = windowHeight - uni.upx2px(30) - 44 - uni.upx2px(160) - uni.upx2px(130) - uni.upx2px(10)
			}
		})
	},
	onUnload() {
		
	}
};
