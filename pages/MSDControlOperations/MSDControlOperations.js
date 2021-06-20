import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	Index,
	GetMSDInfo,
	TakeAction,
	MsdActionLookUpChanged,
} from '@/api/MSDControlOperations.js'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		}),
		getAreaHandler() {
			if (!this.netData[1].CurrentArea) {
				return ''
			}
			const currentArea = this.netData[1].CurrentArea
			let DESCRIPTION = ''
			this.MSDLOCAL.map(item => {
				if (item.CODE === currentArea) {
					DESCRIPTION = item.DESCRIPTION
				}
			})
			return DESCRIPTION
		},
		getActionHandler() {
			if (!this.netData[1].CurrentAction) {
				return ''
			}
			const CurrentAction = this.netData[1].CurrentAction
			if (!CurrentAction) {
				return ''
			}
			let MSG_CN_DESC = ''
			this.MSDAction.map(item => {
				if (item.CODE === CurrentAction) {
					MSG_CN_DESC = item.MSG_CN_DESC
				}
			})
			return MSG_CN_DESC
		}
	},
	data() {
		return {
			formData: {
				ReelCode: '',
				MSDBakeRuleID: ''
			},
			autoFocus: false,
			netData: [{}, {}],
			MSDAction: [],
			MSDArea: [],
			MSDLOCAL: [],
			actionIndex: -1,
			localIndex: -1,
			checkOk: false,
			actionList: []
		}
	},
	methods: {
		openScanCode() {
			
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, {
				formData: {
					ReelCode: '',
					MSDBakeRuleID: ''
				},
				autoFocus: false,
				netData: [{}, {}],
				MSDAction: [],
				MSDArea: [],
				MSDLOCAL: [],
				actionIndex: -1,
				localIndex: -1,
				checkOk: false,
				actionList: []
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getIndex() {
			const res = await Index()
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				return false
			}
			if (res.Result) {
				const data = res.Result
				this.MSDAction = data.MSDAction || []
				this.MSDArea = data.MSDArea || []
				this.MSDLOCAL = data.MSDLOCAL || []
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		},
		async handleCheckReelCode() {
			this.autoFocus = false
			if (!this.formData.ReelCode) {
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
			const res = await GetMSDInfo(this.formData.ReelCode)
			if (res.ErrorInfo.Status) {
				this.checkOk = false
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '条码解析失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.netData = res.Result
				this.checkOk = true
				this.$voice.success()
			} else {
				this.checkOk = false
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '条码解析失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
		async handlerChangeAction(e) {
			const index = e.detail.value < 0 ? 0 : e.detail.value;
			const NewAction = this.MSDAction[index].CODE
			const res = await this.watchActionChange(NewAction)
			if (res) {
				this.formData.MSDBakeRuleID = ''
				this.actionIndex = index
				this.formData.NewAction = NewAction
			}
		},
		handlerChangeLocal(e) {
			this.localIndex = e.detail.value < 0 ? 0 : e.detail.value;
			this.formData.ActionArea = this.MSDLOCAL[this.localIndex].ID
			this.formData.ActionAreaType = this.MSDLOCAL[this.localIndex].CODE
		},
		async watchActionChange(newActionID) {
			const res = await MsdActionLookUpChanged({
				newActionID,
				partThickness: this.netData[1].PartThickness,
				partLevelCode: this.netData[1].PartLevelCode,
				reelcode: this.netData[1].ReelCode
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '操作变更失败',
					showCancel: false,
					success: _ => {
						
					}
				})
				return Promise.reject(false)
			}
			this.actionList = res.Result || []
			return Promise.resolve(true)
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.formData.ReelCode) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入物料条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await TakeAction({
				...this.formData,
				UserName: this.userInfo.USER_NAME
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '提交失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							
						}
					}
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '提交成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '提交失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							
						}
					}
				})
			}
		},
		// 筛选出下一个操作
		handleFilterOperating() {
			const currentAction = this.netData[1].CurrentAction
			if (!currentAction) {
				return []
			}
			const arr = []
			this.MSDAction.map(item => {
				if (parseInt(currentAction) === 100) { // 开封
					arr.push(item)
				}
				if (parseInt(currentAction) === 101) { // 烘烤
					if (item.CODE !== 103 && item.CODE !== 101) {
						arr.push(item)
					}
				}
				if (parseInt(currentAction) === 102) { // 干燥
					if (item.CODE !== 101 && item.CODE !== 103 && item.CODE !== 102) {
						arr.push(item)
					}
				}
				if (parseInt(currentAction) === 104) { // 真空包
					if (item.CODE !== 103 && item.CODE !== 104) {
						arr.push(item)
					}
				}
			})
			return arr
		}
	},
	onLoad() {
		this.getIndex()
	},
	components: {
		graceHeader,
		gracePage
	},
	onShow() {
		this.$nextTick(() => {
			this.autoFocus = true
		})
	}
}