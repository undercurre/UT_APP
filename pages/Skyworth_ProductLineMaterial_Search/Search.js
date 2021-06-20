import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	GetWONO
} from '@/api/ProductLineMaterial/StartJob.js'
export default {
	data() {
		return {
			autoFocus: true,
			formData: {
				WO_NO: ''
			},
			msgContentHeight: 200,
			list: [],
			checkedWoNo: ''
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getList() {
			const res = await GetWONO({
				WO_NO: this.formData.WO_NO,
				Page: 1,
				Limit: 10000
			})
			this.list = res.Result || []
		},
		radioChange(e) {
			this.checkedWoNo = e.detail.value
		},
		handleSearchWoNo() {
			this.getList()
		},
		submitForm() {
			if (!this.checkedWoNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择工单批次',
					showCancel: false
				})
				return false
			}
			uni.redirectTo({
				url: '/pages/Skyworth_ProductLineMaterial_LoadingOperation/index?checkedWoNo=' + this.checkedWoNo
			})
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