import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import { mapState } from 'vuex'
import {
	LoadPDAFeederCheckDetailList
} from '@/api/SmtFeeder.js'
export default {
	computed: {
		// isfilter() {
		// 	return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		// }
	},
	data() {
		return {
			Form: {
				ID: 0, //
				FBODYMARK: '', // 飞达编号
			},
			autoFocus: true,
			autoFocusNext: false,
			list: [],
			totalCount: 0
		 }
	},
	onLoad(e) {
		this.Form.ID = e.KEEP_HEAD_ID || null
		if(this.Form.ID){
			this.getdata()
		}
		
	},
	methods: {
		// 飞达回车
		getFeida(){
			this.autoFocus = false
			if (!this.Form.FBODYMARK) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入飞达编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.getdata()
		},
		 async getdata() {
		 	const res = await LoadPDAFeederCheckDetailList(this.Form)
		 	if (res.ErrorInfo.Status) {
		 		this.$voice.error()
		 		uni.showModal({
		 			title: '提示',
		 			content: res.ErrorInfo.Message,
		 			showCancel: false,
		 			success: _ => {
		 			}
		 		})
		 		return false
		 	}
		 	if (res.Result) {
		 		this.list = res.Result
		 	}
		 },
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
	},
	components: {
		graceHeader,
		gracePage
	},
	onShow() {
		 
	},
	onPullDownRefresh() {
		 
	},
	onReachBottom() {
		 
	}
}