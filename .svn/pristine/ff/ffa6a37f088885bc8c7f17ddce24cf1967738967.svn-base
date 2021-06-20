import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	ProducLineEnd,
	GetHiProduct
} from '@/api/producOffline.js'
import * as config from '../../utils/config.js'
import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	data() {
		return {
			autoFocus: true,
			netData: {}
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
						const res = await ProducLineEnd()
						if (res.Code === config.SUCCESS_CODE && res.Data) {
							this.$voice.success()
							uni.showModal({
								title: '提示',
								content: '产线下线成功',
								showCancel: false,
								success: _ => {
									uni.navigateBack({
										delta: 1
									})
								}
							})
						} else {
							this.$voice.error()
							uni.showModal({
								title: '提示',
								content: res.Msg || '产线下线失败',
								showCancel: false,
								success: _ => {

								}
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
