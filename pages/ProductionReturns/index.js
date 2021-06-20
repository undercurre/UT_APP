import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import {
	GetProductionInfoByReel,
	CreateIssueApplyDoc
} from '@/api/ProductionReturns.js'
export default {
	data() {
		return {
			form: {
				MO: '',
				reelCode: '',
				QUANTITY: null,
				page:1,
				limt:10
			},
			list:[],
			totalCount:0,
			selectionEnd: 0,
			autoFocusMO:true, //工单
			autoFocus: false, // 物料条码
			autoFocusNewLocation: false // 退料数量
		}
	},
	methods: {
		//分页
		changeReason3(e){
			this.form.page=e.current
			this.getLoadMoData();
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocusMO:false,
				autoFocus: false
				
			})
			this.$nextTick(() => {
				this.autoFocusMO=true,
				this.autoFocus = false
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async submitForm() {
			this.autoFocus = this.autoFocusNewLocation = false
			const map = {
				"MO": {
					"msg": "请输入工单号",
					"field": "autoFocusMO"
				},
				"reelCode": {
					"msg": "请输入物料条码",
					"field": "autoFocus"
				},
				"QUANTITY": {
					"msg": "请输入退料数量",
					"field": "autoFocusNewLocation"
				}
			}
			try {
				Object.keys(map).forEach(item => {
					if (!this.form[item]) {
						uni.showModal({
							title: '提示',
							content: map[item].msg || '',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this[map[item].field] = true
								}
							}
						})
						this.$voice.errro()
						throw Error(map[item].msg)
					}
				})
				uni.showModal({
					title: "提示",
					content: "确定要提交?",
					success: (res) => {
						if (res.confirm) {
							this.submitData()
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})

			} catch (e) {

			}
		},
		async submitData() {
			
			this.form.QUANTITY =Number(this.form.QUANTITY)
			const res = await CreateIssueApplyDoc(this.form)
			// console.log(res,'====res')
			if (res.Code === config.SUCCESS_CODE && res.Data) {
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '保存成功',
				showCancel: false,
				success: _ => {
					if (_.confirm) {
						this.resetFormData()
					}
				}
			})
			} else{
				uni.showModal({
					title: '提示',
					content: res.Msg || '保存失败',
					showCancel: false,
					success: _ => {
					}
				})
				this.$voice.error()
				return false
			}
		},
		//工单号
		async getLoadMoData(){
			this.autoFocusMO=false
			if (!this.form.MO) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocusMO = true
				})
				return false
			}
			const res = await GetProductionInfoByReel({MO:this.form.MO,page:this.form.page,limt:this.form.limt})
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				const data = JSON.parse(res.Data)
				this.totalCount=res.TotalCount
				if (data) {
					console.log(data)
					this.list=data
					this.autoFocusMO=false
					this.autoFocus=true
				} else {
					this.autoFocusMO = true
					this.form.MO = ''
					this.form.reelCode = ''
					this.form.QUANTITY = null
					this.form.Page=1
				}
			} else{
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取工单号失败,请重新输入',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusMO = true
							this.form.MO = ''
							this.form.reelCode = ''
							this.form.QUANTITY = null
							this.form.Page=1
						}
					}
				})
				this.form.MO = ''
				this.$voice.error()
				return false
			}
		},
		// 物料条码
		 getLoadScraperData() {
			this.autoFocus = false
			if (!this.form.reelCode) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocus = true
				})
				return false
			}
			this.autoFocus=false
			this.autoFocusNewLocation = true
		},
		//退料数量
		async getLoadQuantityData(){
			this.autoFocusNewLocation = false
			if(!this.form.MO){
				return uni.showModal({
					title: '提示',
					content: '请输入工单号',
					showCancel: false, 
				})
			}
			if (!this.form.QUANTITY) {
				this.$voice.error()
				this.$nextTick(() => {
					this.autoFocusNewLocation = true
				})
				return false
			}
			const res=await CreateIssueApplyDoc({				"MO": this.form.MO,				"QUANTITY": this.form.QUANTITY,				"Reel_CODE": this.form.reelCode})
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				uni.showModal({
					title: '提示',
					content: '生产退料成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNewLocation=false
						}
					}
				})
			}
			else{
				uni.showModal({
					title: '提示',
					content: res.Msg || '生产退料失败,请重新输入',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.form.reelCode = ''
							this.form.QUANTITY = null
							this.form.Page=1
						}
					}
				})
				this.$voice.error()
				return false
			}
			
		}
	},
	components: {
		graceHeader,
		gracePage,
		uniPagination
	},
	onLoad() {

	}
}
