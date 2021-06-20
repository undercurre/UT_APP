import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	GetReelCode,
	GetReelInfoViewModel,
	GetBatchNo,
	GetLoction,
	GetBatchDeatil,
	GetBatchByLoc,
	AddResource
} from '@/api/SmtResourceProessFree.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			form: {
				BATCH_NO: '',
				REEL_NO: '',
				FRIDGE_LOC: '',
				OPERATOR: '',
				REMARK: ''
			},
			autoFocus: false,
			reelInfo: {},
			innerDrawer2: false,
			CHUWEI: '',
			PCmainTable: [],
			checked: null,
			bathList: [],
			PICI: '',
			checkedPici: null,
			innerDrawer3: false,
			bathList1: []
		}
	},
	watch: {
		CHUWEI(val, oldVal) {
			if (val) {
				let temp = []
				this.PCmainTable.map(item => {
					if (item.CN_DESC.indexOf(val) !== -1) {
						temp.push(item)
					}
				})
				this.PCmainTable = temp
			} else if (oldVal && !val) {
				this.getLocation()
			}
		},
		PICI(val, oldVal) {
			if (val) {
				let temp = []
				this.bathList.map(item => {
					if (item.NAME.indexOf(val) !== -1) {
						temp.push(item)
					}
				})
				this.bathList = temp
			} else {
				this.handleGetPici()
			}
		},
		'form.BATCH_NO': {
			handler(val, oldVal) {
				this.handleGetBatchDeatil()
			}
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
				this.form.OPERATOR = this.userInfo.USER_NAME
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
			await 1
		},
		async handleCheckReedID() {
			this.autoFocus = false
			if (!this.form.REEL_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入辅料条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await GetReelCode(this.form.REEL_NO)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '辅料条码解析错误',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.form.REEL_NO = ''
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.form.REEL_NO = res.Result
				// TODO 查询物料条码详细信息
				this.GetReelInfoViewModel()
				if (this.form.FRIDGE_LOC && this.form.BATCH_NO) {
					// TODO 提交
					this.submitForm()
				}
			}
		},
		async GetReelInfoViewModel() {
			if (!this.form.REEL_NO) {
				return false
			}
			const res = await GetReelInfoViewModel(this.form.REEL_NO)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取辅料条码信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.form.REEL_NO = ''
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				this.reelInfo = res.Result
			} else {
				this.reelInfo = {}
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取辅料条码信息失败',
					showCancel: false,
					success: _ => {

					}
				})
			}
		},
		// 更新批次号
		async updateBathNo() {
			const res = await GetBatchNo()
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '更新批次号失败',
					showCancel: false,
					success: _ => {

					}
				})
				return false
			}
			if (res.Result) {
				this.form.BATCH_NO = res.Result
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '更新批次号失败',
					showCancel: false,
					success: _ => {

					}
				})
			}
		},
		// 选择冰箱储位
		chooseLocation() {
			this.innerDrawer2 = true
		},
		// 获取冰箱储位
		async getLocation() {
			const res = await GetLoction()
			if (res.Result) {
				const data = res.Result || []
				this.PCmainTable = data
				// TODO 默认第一个冰箱储位
				this.form.FRIDGE_LOC = this.PCmainTable[0] ? this.PCmainTable[0].VALUE : '';
				this.form.CN_DESC = this.PCmainTable[0] ? this.PCmainTable[0].CN_DESC : '';
			}
		},
		radioChangeGroup(e) {
			this.checked = e
		},
		radioChangeGroupPici(e) {
			this.checkedPici = e
		},
		handleMakeSureLocation() {
			this.form.FRIDGE_LOC = this.checked
			this.PCmainTable.map(item => {
				if (item.VALUE === this.checked) {
					this.form.CN_DESC = item.CN_DESC
				}
			})
			this.innerDrawer2 = false
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.form.BATCH_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '缺少批次号'
				})
				return false
			}
			if (!this.form.REEL_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '请输入辅料条码',
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.form.FRIDGE_LOC) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '请选择冰箱储位'
				})
				return false
			}
			const res = await AddResource({
				BATCH_NO: this.form.BATCH_NO,
				REEL_NO: this.form.REEL_NO,
				FRIDGE_LOC: this.form.FRIDGE_LOC,
				OPERATOR: this.form.OPERATOR,
				REMARK: this.form.REMARK
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: res.ErrorInfo.Message || '操作失败'
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '操作成功',
					showCancel: false,
					success: async _ => {
						if (_.confirm) {
							const form = this.form
							await this.resetFormData()
							this.form.CN_DESC = form.CN_DESC
							this.form.FRIDGE_LOC = form.FRIDGE_LOC
							this.form.BATCH_NO = form.BATCH_NO
							this.handleGetBatchDeatil()
							this.getLocation()
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '操作失败'
				})
				return false
			}
		},
		// 查询批次信息
		async handleGetBatchDeatil() {
			const res = await GetBatchDeatil(this.form.BATCH_NO)
			if (!res.ErrorInfo.Status) {
				this.bathList1 = res.Result || []
			}
		},
		// 打开批次list
		handleOpenPiCi() {
			this.handleGetPici()
		},
		handleMakeSurePici() {
			this.form.BATCH_NO = this.checkedPici
			this.innerDrawer3 = false
		},
		async handleGetPici() {
			if (!this.form.FRIDGE_LOC) {
				uni.showModal({
					title: '提示',
					content: '请先选择冰箱储位，是否现在打开冰箱储位？',
					success: _ => {
						if (_.confirm) {
							this.chooseLocation()
						}
					}
				})
				return false
			}
			const res = await GetBatchByLoc(this.form.FRIDGE_LOC)
			this.innerDrawer3 = true
			if (!res.ErrorInfo.Status) {
				const data = res.Result || []
				this.bathList = []
				data.map((item, index) => {
					this.bathList.push({
						ID: index + 1,
						NAME: item
					})
				})
			} else {
				this.bathList = []
			}
		},
		initFocus() {
			this.$nextTick(() => {
				this.autoFocus = true
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	async onLoad() {
		this.form.OPERATOR = this.userInfo.USER_NAME
		await this.getLocation()
		await this.updateBathNo()
		this.initFocus()
	}
}
