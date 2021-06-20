import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	mapState,
	mapGetters
} from 'vuex'
import {
	GetKeepConfigData,
	SaveData,
	LoadSOPData,
	PostToCheck,
	LoadDtlData,
	CheckBill,
	RejectBill
} from '@/api/SfcsEquipKeep.js'
import * as config from '@/utils/config.js'
export default {
	data() {
		return {
			formData: {},
			autoFocus: true,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			list: [],
			saveID: 0,
			EquipStatusList: [],
			OriginEquipStatusList: [],
			EquipStatusIndex: -1,
			ORIGIN_EQUIP_STATUS: null
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		}),
		...mapGetters([
			'host'
		])
	},
	methods: {
		// picker选择设备状态
		handlePickEquipStatus(e) {
			this.EquipStatusIndex = e.detail.value
			this.formData.EQUIP_STATUS = this.EquipStatusList[this.EquipStatusIndex] ? this.EquipStatusList[this.EquipStatusIndex].Value : '';
		},
		// 获取点检列表
		async getKeepConfigData() {
			const res = await GetKeepConfigData({
				equip_id: this.formData.EQUIP_ID,
				keep_type: this.formData.KEEP_TYPE
			})
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取点检列表失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				this.$voice.error()
				return false
			}
			const data = JSON.parse(res.Result) || []
			this.list = data
		},
		async getLoadDtlData() {
			const res = await LoadDtlData(this.formData.ID)
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取点检列表失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				this.$voice.error()
				return false
			}
			const data = JSON.parse(res.Result) || []
			this.list = data
			let count = 0
			this.list.map(i => {
				if (i.STATUS == 1) {
					count++
				}
			})
			if (count === this.list.length) {
				// 全部都是合格
				this.EquipStatusList = this.EquipStatusList.slice(0, 2)
			}
		},
		// 保存
		async saveData(isSingle = false, backCall = function() {}) {
			try {
				this.list.forEach((item, index) => {
					if (!item.STATUS) {
						uni.showModal({
							title: '提示',
							content: '第' + (index + 1) + '项请填写检验结果',
							showCancel: false
						})
						this.$voice.error()
						throw Error(index + 1)
					}
				})
				if (!this.formData.EQUIP_STATUS && this.formData.EQUIP_STATUS !== 0) {
					uni.showModal({
						title: '提示',
						content: '请选择设备状态',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
				if (!this.formData.ID || this.formData.ID === '0') {
					this.formData.insertRecords = this.list
					this.formData.updateRecords = []
				} else {
					this.formData.updateRecords = this.list
					this.formData.insertRecords = []
				}
				const res = await SaveData(this.formData)
				if (res.ErrorInfo.Status) {
					uni.showModal({
						title: '提示',
						content: res.ErrorInfo.Message || '保存失败',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
				this.saveID = res.Result // 保存id
				if (isSingle === false) {
					uni.showModal({
						title: '提示',
						content: '保存成功，是否需要提交审核？',
						success: _ => {
							if (_.confirm) {
								this.handleSb(false)
							} else {
								uni.navigateBack({
									delta: 2 // 回退两页
								})
							}
						}
					})
					this.$voice.success()
				} else {
					backCall(true) // 回调
				}
			} catch (e) {

			}
		},
		// 提交审核
		submitFormCheck() {
			let ID = this.saveID
			if (!ID || ID === '0') {
				this.saveData(true, (e) => {
					if (e) {
						this.handleSb()
					}
				})
			} else {
				this.handleSb()
			}
		},
		handleSb(isSingle = true) {
			if (isSingle) {
				uni.showModal({
					title: '确认',
					content: '确定要提交审核吗？',
					success: _ => {
						if (_.confirm) {
							this.sbApi()
						}
					}
				})
			} else {
				this.sbApi()
			}
		},
		async sbApi() {
			let ID = this.saveID
			const res = await PostToCheck({
				ID,
				Operator: this.userInfo.USER_NAME
			})
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '提交审核失败',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			if (config.AUTO_CHECK) {
				// TODO 加入全部合格自动审核通过的逻辑
				let count = 0
				let buhege = 0
				this.list.map(i => {
					if (i.STATUS == 1) {
						count++
					} else if (i.STATUS === '0') {
						buhege++
					}
				})
				if (count === this.list.length) {
					// TODO 自动审核成功
					this.formData.ID = this.saveID || 0
					this.submitFormCheckOk()
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			} else {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '提交审核成功',
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
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 单选事件
		radioChange(e, index) {
			this.list[index].STATUS = e.detail.value
			// 判断
			let count = 0
			let buhege = 0
			this.list.map(i => {
				if (i.STATUS == 1) {
					count++
				} else if (i.STATUS === '0') {
					buhege++
				}
			})
			if (count === this.list.length) {
				this.EquipStatusList = this.OriginEquipStatusList.slice(0, 2)
				this.EquipStatusIndex = -1
				this.formData.EQUIP_STATUS = null
			} else {
				// 有不合格
				if (buhege) {
					this.EquipStatusList = this.OriginEquipStatusList.slice(2)
				} else {
					this.EquipStatusList = this.OriginEquipStatusList
				}
				this.EquipStatusIndex = -1
				this.formData.EQUIP_STATUS = null
			}
		},
		// 作业图
		async handleLookImages(item) {
			const res = await LoadSOPData(item.ID)
			
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取作业图失败',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			const data = JSON.parse(res.Result)
			uni.previewImage({
				urls: data.map(item => 'http://' + this.host + config.MES_BS_HOST + item.RESOURCE_URL)
			})
		},
		// 审核通过
		submitFormCheckOk() {
			const form = {
				ID: this.formData.ID || 0,
				Operator: this.userInfo.USER_NAME || ''
			}
			if (!form.ID) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择点击记录',
					showCancel: false
				})
				return false
			}
			if (!this.formData.EQUIP_STATUS && this.formData.EQUIP_STATUS !== 0) {
				uni.showModal({
					title: '提示',
					content: '请选择设备状态',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			form.StatusList = this.list
			form.EquipStatus = this.formData.EQUIP_STATUS
			
			// 提示
			// if (this.formData.EQUIP_STATUS != this.ORIGIN_EQUIP_STATUS) {
			// 	let yuan = ''
			// 	let xian = ''
			// 	this.EquipStatusList.map(i => {
			// 		if (i.Value == this.ORIGIN_EQUIP_STATUS) {
			// 			yuan = i.Text
			// 		}
			// 		if (i.Value == this.formData.EQUIP_STATUS) {
			// 			xian = i.Text
			// 		}
			// 	})
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '原状态为：' + yuan + '  ' + ',变更后的状态为：' + xian,
			// 		success: _ => {
			// 			if (_.confirm) {
			// 				this.apiSubmitFormOk(form)
			// 			}
			// 		}
			// 	})
			// 	return false
			// }
			this.apiSubmitFormOk(form)
		},
		async apiSubmitFormOk(form) {
			const res = await CheckBill(form)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '审核失败',
					showCancel: false
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '审核成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							let count = 0
							this.list.map(i => {
								if (i.STATUS == 1) {
									count++
								}
							})
							if (config.AUTO_CHECK && count === this.list.length) { // 回退两层
								uni.navigateBack({
									delta: 1
								})
							} else {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '审核失败',
					showCancel: false
				})
			}
		},
		submitFormCheckNo() {
			const form = {
				ID: this.formData.ID || 0,
				Operator: this.userInfo.USER_NAME || ''
			}
			if (!form.ID) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择点击记录',
					showCancel: false
				})
				return false
			}
			if (!this.formData.EQUIP_STATUS && this.formData.EQUIP_STATUS !== 0) {
				uni.showModal({
					title: '提示',
					content: '请选择设备状态',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			uni.showModal({
				title: '确认',
				content: "确定要拒绝审核吗？",
				success: async _ => {
					if (_.confirm) {
						const res = await RejectBill(form)
						if (res.ErrorInfo.Status) {
							this.$voice.error()
							uni.showModal({
								title: '提示',
								content: res.ErrorInfo.Message || '拒绝失败',
								showCancel: false
							})
						}
						if (res.Result) {
							this.$voice.success()
							uni.showModal({
								title: '提示',
								content: '拒绝成功',
								showCancel: false,
								success: _ => {
									if (_.confirm) {
										uni.navigateBack({
											delta: 1
										})
									}
								}
							})
						} else {
							this.$voice.error()
							uni.showModal({
								title: '提示',
								content: '拒绝失败',
								showCancel: false
							})
						}
					}
				}
			})
		}
	},
	onLoad(e) {
		this.formData = e.formData ? JSON.parse(e.formData) : {};
		this.EquipStatusList = e.EquipStatusList ? JSON.parse(e.EquipStatusList) : [];
		this.OriginEquipStatusList = this.EquipStatusList
		this.ORIGIN_EQUIP_STATUS = this.formData.EQUIP_STATUS || 0
		this.EquipStatusList.map((i, k) => {
			if (i.Value == this.formData.EQUIP_STATUS) {
				this.EquipStatusIndex = k
			}
		})
		if (!this.formData.PRODUCT_NO) {
			uni.showModal({
				title: '提示',
				content: '数据错误',
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
		if (!this.formData.ID || this.formData.ID === '0') {
			this.getKeepConfigData()
			
		} else {
			this.getLoadDtlData()
		}
	},
	components: {
		graceHeader,
		gracePage
	}
}
