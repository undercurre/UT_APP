import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import * as config from '../../utils/config.js'
import {
	LoadConfigData,
	SaveData,
	LoadData,
} from '@/api/MesPartShelf.js'
import {
	mapState
} from 'vuex'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			autoFocus: true,
			form: {
				WO_NO: '',
				CODE: '',
				STATUS: 1,
				STORAGE: '',
				Page: 1,
				Limit: 10
			},
			list: [],
			totalCount: 0,
			autoFocusNaN: false,
			msgContentHeight:200
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getLoadData() {
			const res = await LoadData(this.form)
			this.list = res.Result || []
			this.totalCount = res.TotalCount
		},
		// 分页
		changeReason3(e) {
			this.form.Page = e.current
			this.getLoadData()
		},
		async submitForm() {
			if (!this.form.STORAGE) {
				uni.showModal({
					title: '提示',
					content: '请输入储位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.autoFocusNaN = false
						}
					}
				})
				this.$voice.error()
				return false
			}
			if (!this.form.CODE) {
				uni.showModal({
					title: '提示',
					content: '请输入条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = false
							this.autoFocusNaN = true
						}
					}
				})
				this.$voice.error()
				return false
			}
			this.submitData()
		},
		async submitData() {
			// this.form.CREATE_USER = this.userInfo.USER_NAME
			var saveobj = {
				InsertRecords: [
					{
						CODE: this.form.CODE,
						STATUS: 1,
						STORAGE: this.form.STORAGE,
						CREATE_USER: this.userInfo.USER_NAME
					}
				]
			}
			// saveobj.InsertRecords.push(this.form)
			const res = await SaveData(saveobj)
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '保存成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
							this.getLoadData()
						}
					}
				})
			}
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '保存失败',
					showCancel: false,
					success: _ => {}
				})
				this.$voice.error()
				return false
			}
		},
		resetFormData() {
			this.$nextTick(() => {
				this.autoFocus = true
			})
			
			this.form.STORAGE = ''
			this.form.CODE = ''
		}
	},
	onShow(){
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(220)
			}
		})
	},
	components: {
		graceHeader,
		gracePage,
		uniPagination
	},
	onLoad() {
		this.getLoadData()
	}
}
