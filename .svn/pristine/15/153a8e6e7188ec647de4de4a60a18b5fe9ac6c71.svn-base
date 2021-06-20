import gracePage from '../../graceUI/components/gracePage.vue';
import graceHeader from '../../graceUI/components/graceHeader.vue';
import {
	SfcsCollectTComponents
} from '../../api/ComponentUnbund.js';
import {
	mapState
} from 'vuex'
import * as config from '@/utils/config.js'
import dayjs from 'dayjs'
export default {
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			formData: {
				barcode: '',
			},
			msgList: [],
			autoFocus: true,
			msgContentHeight: 200,
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		//回车物料条码
		async handleBarcode() {
			if (!this.formData.barcode) {
				uni.showModal({
					title: '提示',
					content: '请输入物料条码',
					showCancel: false
				})
				return false
			}
			console.log(this.userInfo)
			const res=await SfcsCollectTComponents(this.formData.barcode,this.userInfo.ID,this.userInfo.USER_NAME)
			if(res.Result){
				this.$voice.success()
				this.handlePushMsgList(this.formData, '解绑成功', 'success')
			}
			else{
				this.$voice.error()
				this.handlePushMsgList(this.formData, '解绑失败', 'error')
			}
			this.formData.barcode=''
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				barcode: ''
			}
			this.msgList = []
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(150)
			}
		})
	}
}
