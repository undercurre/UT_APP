import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	SysConnectPTS
} from '@/api/work.js'
import * as config from '@/utils/config.js'
export default {
	data() {
		return {
			list: [],
			listIndex: -1
		}
	},
	computed: {
		current_version() {
			return this.$store.state.system.versionId
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			const lineList = this.$store.getters.lineList || [];
			console.log(lineList)
			const c = lineList[this.listIndex]
			console.log(c)
			if (c.SERVICE_URL) {
				const res = await SysConnectPTS(c.SERVICE_URL)
				if (res.Code !== config.SUCCESS_CODE || !res.Data) {
					uni.showModal({
						title: '提示',
						content: res.Msg || '连接监控台失败',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
			}
			this.$store.commit('system/SET_CURRENTLINE', this.listIndex)
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '线体设置成功',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						uni.navigateBack({
							delta: 1
						})
					}
				}
			})
		},
		picker(e) {
			this.listIndex = parseInt(e.detail.value)
		},
		initPage() {
			const lineList = this.$store.getters.lineList || [];
			console.log(lineList)
			const index = this.$store.getters.currentLine;
			console.log(index)
			this.listIndex = index === null ? -1 : index;
			console.log(this.listIndex)
			const arr = [];
			lineList.map(item => {
				arr.push(item.LINE_NAME)
			});
			this.list = arr;
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.initPage()
	},
	onShow() {
		
	}
}