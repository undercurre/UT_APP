import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	mapGetters,
	mapActions
} from 'vuex'
export default {
	name: 'WMSServiceSet',
	components: {
		graceHeader,
		gracePage
	},
	computed: {
		...mapGetters([
			'WMSPORT',
			'WMSHOST'
		])
	},
	data() {
		return {
			formData: {
				HOST: '',
				PORT: ''
			},
			autoFocus: false,
			focusNext: false
		}
	},
	methods: {
		...mapActions({
			setWMSService: 'system/setWMSService'
		}),
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if (!this.formData.HOST) {
				uni.showModal({
					title: '提示',
					content: '请输入服务器IP',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			if (!this.formData.PORT) {
				uni.showModal({
					title: '提示',
					content: '请输入端口号',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			await this.setWMSService(this.formData)
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: 'WMS服务器设置成功',
				showCancel: false
			})
		},
		handleConfirm(type) {
			this.autoFocus = false
			this.focusNext = false
			if (type === 1) {
				this.$nextTick(() => {
					this.focusNext = true
				})
			}
		}
	},
	onLoad() {
		this.formData = {
			HOST: this.WMSHOST || '',
			PORT: this.WMSPORT || ''
		}
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}