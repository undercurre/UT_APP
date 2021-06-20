import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import graceDialog from '../../graceUI/components/graceDialog.vue';
import * as config from '../../utils/config.js'
import {
	LoadConfigData,
	SaveData,
	LoadData,
	GetShelfByWONO,
	ReelCodeSplitEx
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
			checked: false,
			FormSub: {
				SUN: ''
			},
			checkedBox:false,
			msgContentHeight:200
		}
	},
	methods: {
		checkboxChange() {
			this.checked = true
		},
		async confirm() {
			if(this.FormSub.SUN===''){
				return uni.showModal({
					title: '提示',
					content: '请输入切分数量',
					showCancel: false,
				})
			}
			else if(this.FormSub.SUN<=0){
				return uni.showModal({
					title: '提示',
					content: '请输入正确的切分数量',
					showCancel: false,
				})
				this.FormSub.SUN=""
			}
			else if(this.FormSub.SUN>12){
				return uni.showModal({
					title: '提示',
					content: '切分数量须小于总数',
					showCancel: false,
				})
			}
			else{
				const res=await ReelCodeSplitEx({
				  "CODE": this.form.CODE,
				  "S_QTY": this.FormSub,
				  "F_QTY": 1,
				  "IsDown": 1
				})
				if (res.Result) {
					this.$voice.success()
					uni.showModal({
						title: '提示',
						content: '切分成功',
						showCancel: false,
						success: _ => {
							if (_.confirm) {
								this.checked = false
							}
						}
					})
				}
				if (res.ErrorInfo.Status) {
					uni.showModal({
						title: '提示',
						content: res.ErrorInfo.Message || '切分失败',
						showCancel: false,
						success: _ => {}
					})
					this.$voice.error()
					return false
				}
				
			}
			
		},
		cancel() {
			this.checked = false
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getLoadData(type) {
			if(type===1&&this.form.WO_NO===''){
				return uni.showModal({
					title: '提示',
					content: '请输入工单号',
					showCancel: false,
				})
			}
			if(type===1&&this.checkedBox){
				this.checkedBox=true,
				this.checkboxChange()
			}
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
		resetFormData() {
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
			this.form.WO_NO = ''
			this.form.CODE = ''
		},
		async submitData() {
			var saveobj = {
				RemoveRecords: [{
					CODE: this.form.CODE,
					STATUS: 1,
					STORAGE: this.form.STORAGE,
				}]
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
							this.getLoadData()
							this.resetFormData()
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
	},
	components: {
		graceHeader,
		gracePage,
		uniPagination,
		graceDialog
	},
	onLoad() {
		this.getLoadData()
	},
	onShow(){
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(220)
			}
		})
	},
}
