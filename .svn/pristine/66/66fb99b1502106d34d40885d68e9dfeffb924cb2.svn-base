import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
// import { mapGetters } from 'vuex'
import {
	GetEquipmentList,
	LoadData,
	Index,
	GetEquipRepairDetail
} from '@/api/SfcsEquipRepairHead.js'
export default {
	name: 'SfcsEquipRepairHead',
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			netData: {},
			list: [],
			tableHeight: 200,
			currentSubsection: 0,
			peiJianList: [],
			currentListId: 0,
			EquipStatusList: []
		}
	},
	methods: {
		async getPageData() {
			const res = await GetEquipmentList({
				STATUS: 3,
				Page: 1,
				Limit: 2
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				this.netData = {}
				return false
			}
			if (res.Result) {
				const data = JSON.parse(res.Result) || []
				this.netData = data[0] || {}
			} else {
				this.netData = {}
			}
		},
		// 获取维修记录
		async LoadData() {
			const res = await LoadData({
				EQUIP_ID: this.netData.ID || 0,
				Page: 1,
				Limit: 100000
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取维修记录失败',
					showCancel: false
				})
				this.list = []
				return false
			}
			if (res.Result) {
				const data = JSON.parse(res.Result) || []
				this.list = data
				this.GetEquipRepairDetail(this.list[0] ? this.list[0].ID : 0)
			} else {
				this.list = []
			}
		},
		async getIndex() {
			const res = await Index()
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取数据失败',
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
				const EquipStatusList = res.Result.EquipStatusList || []
				this.EquipStatusList = EquipStatusList
			} else {
				this.EquipStatusList = []
			}
		},
		getStatusText(status) {
			let res = ''
			this.EquipStatusList.map(i => {
				if (i.Value == status) {
					res = i.Text || ''
				}
			})
			return res
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 获取配件列表
		async GetEquipRepairDetail(headId) {
			this.currentListId = headId
			const res = await GetEquipRepairDetail(headId)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取配件信息失败',
					showCancel: false
				})
				this.peiJianList = []
				return false
			}
			if (res.Result) {
				const data = JSON.parse(res.Result) || {}
				this.peiJianList = data.data || []
			} else {
				this.peiJianList = []
			}
		},
		handleChangeSub(e) {
			this.currentSubsection = e
		},
		async changePeiJianList(id) {
			await this.GetEquipRepairDetail(id)
			if (this.peiJianList.length) {
				this.currentSubsection = 1
			}
		},
		handleKeep() {
			uni.navigateTo({
				url: '/pages/SfcsEquipRepairHeadDo/index?EquipStatusList=' + JSON.stringify(this.EquipStatusList) + '&ID=' + this.netData.ID
			})
		},
		getStatus(status) {
			let res = ''
			this.EquipStatusList.map(i => {
				if (i.Value == status) {
					res = i.Text || ''
				}
			})
			return res
		}
	},
	onLoad() {
		
	},
	async onShow() {
		await this.getIndex()
		await this.getPageData()
		this.LoadData()
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.tableHeight = windowHeight - 44 - uni.upx2px(680)
			}
		})
	}
}