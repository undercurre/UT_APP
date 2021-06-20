import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	GetWONO
} from '@/api/ProductLineMaterial/StartJob.js'
export default {
	data() {
		return {
			autoFocus: false,
			formData: {
				WO_NO: config.IS_HTL ? 'WORK' : ''
			},
			formWoNo: {
				Key: '',
				WO_NO: '',
				Page: 1,
				Limit: 10000
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
			this.formWoNo.WO_NO = this.formData.WO_NO
			if (this.formWoNo.WO_NO === 'WORK') {
				this.formWoNo.WO_NO = ''
			}
			const res = await GetWONO(this.formWoNo)
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
				url: '/pages/ProductLineMaterial_LoadingOperation/index?checkedWoNo=' + this.checkedWoNo
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		const lineList = this.$store.getters.lineList || [];
		const index = this.$store.getters.currentLine;
		lineList.map((i,v)=>{
			if(index === v){
				// this.formData.Key = i.SMT_LINE_ID
				this.formWoNo.Key = i.SMT_LINE_ID
			}
		})
		this.getList()
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(60)
				this.$nextTick(() => {
					this.autoFocus = true
				})
			}
		})
	}
}