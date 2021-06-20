import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js'
import {
	GetWONO,
	ProducLineEnd
} from '@/api/ProductLineMaterial/StartJob.js'
import {
	mapGetters
} from 'vuex'
export default {
	data() {
		return {
			autoFocus: true,
			formData: {
				WO_NO: '',
				Key: ''
			},
			msgContentHeight: 200,
			list: [],
			checkedWoNos: [],
			formwono:{
				WO_NO: '',
				Key: '',
				Page: 1,
				Limit: 10000
			}
		}
	},
	computed: {
		...mapGetters(['token']),
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
		async getList() {
			this.formwono.WO_NO = this.formData.WO_NO
			const res = await GetWONO(this.formwono)
			this.list = res.Result || []
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
				uni.showModal({
					title: '提示',
					content: '下线成功',
					showCancel: false
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
		
		const lineList = this.$store.getters.lineList || [];
		const index = this.$store.getters.currentLine;
		lineList.map((i,v)=>{
			if(index === v){
				this.formData.Key = i.SMT_LINE_ID
				this.formwono.Key = i.SMT_LINE_ID
				
				console.log(i)
			}
		})
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