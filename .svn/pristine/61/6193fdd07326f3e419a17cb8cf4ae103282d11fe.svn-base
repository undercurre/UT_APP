import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	mapGetters
} from 'vuex'
import {
	AddOrModifySave
} from '@/api/SfcsEquipRepairHead.js'
export default {
	name: 'SfcsEquipRepairHeadDo',
	components: {
		gracePage,
		graceHeader
	},
	computed: {
		...mapGetters([
			'token'
		])
	},
	data() {
		return {
			EquipStatusList: [{
				Text: '正常',
				Value: 0
			}, {
				Text: '报废',
				Value: 4
			}],
			EquipStatusListIndex: -1,
			formData: {},
			DetailForm: {},
			DetailList: [],
			tableHeight: 200,
			COMPONENT_NAME: false,
			COMPONENT_MODEL: false,
			REPAIR_CONTENT: false
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		changeEquipStatus(e) {
			this.EquipStatusListIndex = e.detail.value
			this.formData.REPAIR_STATUS = this.EquipStatusList[this.EquipStatusListIndex].Value
		},
		handleAdd() {
			this.COMPONENT_NAME = false
			this.COMPONENT_MODEL = false
			if (!this.DetailForm.COMPONENT_NAME) {
				uni.showToast({
					title: '请输入配件名称',
					icon: 'none'
				})
				this.$voice.error()
				this.$nextTick(() => {
					this.COMPONENT_NAME = true
				})
				return false
			}
			if (!this.DetailForm.COMPONENT_MODEL) {
				uni.showToast({
					title: '请输入配件规格',
					icon: 'none'
				})
				this.$voice.error()
				this.$nextTick(() => {
					this.COMPONENT_MODEL = true
				})
				return false
			}
			this.DetailList.push(this.DetailForm)
			this.DetailForm = {}
		},
		hanldeDelete(index) {
			this.DetailList.splice(index, 1)
		},
		async handleSubmitForm() {
			this.REPAIR_CONTENT = false
			if (!this.formData.REPAIR_STATUS && this.formData.REPAIR_STATUS !== 0) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择维修结果',
					showCancel: false
				})
				return false
			}
			if (!this.formData.REPAIR_CONTENT) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入维修内容',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.REPAIR_CONTENT = true
						}
					}
				})
				return false
			}
			const form = {
				ID: 0,
				EQUIP_ID: this.formData.EQUIP_ID,
				REPAIR_STATUS: this.formData.REPAIR_STATUS,
				REPAIR_CONTENT: this.formData.REPAIR_CONTENT,
				REPAIR_USER: this.token || '',
				DetailList: this.DetailList || []
			}
			const res = await AddOrModifySave(form)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '提交失败',
					showCancel: false
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
					content: '提交失败',
					showCancel: false
				})
			}
		}
		
	},
	onLoad(e) {
		this.formData.EQUIP_ID = e.ID || 0
		if (!this.formData.EQUIP_ID) {
			uni.showModal({
				title: '提示',
				content: '缺少参数信息',
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
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.tableHeight = windowHeight - 44 - uni.upx2px(600)
			}
		})
	}
}