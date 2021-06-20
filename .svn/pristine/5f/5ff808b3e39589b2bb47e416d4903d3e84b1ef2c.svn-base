import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	GetHiProduct
} from '@/api/producOffline.js'
import * as config from '@/utils/config.js'
import {
	ProducLineEnd
} from '@/api/ProductLineMaterial/StartJob.js'
import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine',
			'token'
		])
	},
	data() {
		return {
			autoFocus: true,
			netData: {},
			isGoOn: false
		};
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 提交产线下线
		async submitForm() {
			uni.showModal({
				title: '确认',
				content: '确定要下线产线？',
				success: async _res => {
					if (_res.confirm) {
						const res = await ProducLineEnd({
							ProducLineArray: [{
								lineId: this.lineList[this.currentLine].SMT_LINE_ID,
								user: this.token,
								woNo: this.netData.WO_NO
							}]
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
							uni.showModal({
								title: '提示',
								content: '下线成功',
								showCancel: false,
								success: _ => {
									this.isGoOn = true
									this.initPage()
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
				}
			})
		},
		async initPage() {
			const res = await GetHiProduct()
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.netData = res.Data
			} else {
				if (!this.isGoOn) {
					this.$voice.error()
					uni.showModal({
						title: '提示',
						content: res.Msg || '获取工单信息失败',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					})
				} else {
					this.netData = {}
				}
			}
		}
	},
	components: {
		graceHeader,
		gracePage,
	},
	onLoad() {
		this.initPage()
	}
}
