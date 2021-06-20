import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import { mapState } from 'vuex'
import {
	Index,
	LoadData,
	Delete,
	CheckBill,
	RejectBill
} from '@/api/SfcsEquipKeep.js'
export default {
	computed: {
		isfilter() {
			return this.listQuery.create_begin || this.listQuery.create_end || this.listQuery.KEEP_TYPE || this.listQuery.STATION_ID
		}
	},
	data() {
		return {
			statusBarHeight: 0,
			deviceType: [],
			LinesList: [],
			LinesIndex: -1,
			listQuery: {
				Page: 1,
				Limit: 15,
				Key: '',
				KEEP_USER: '',
				CATEGORY: '',
				STATION_ID: '',
				KEEP_TYPE: '',
				KEEP_CHECK_STATUS: '',
				create_begin: '',
				create_end: ''
			},
			statusList: [
				{
					ID: '',
					SBU_CHINESE: '全部'
				},
				{
					ID: '0',
					SBU_CHINESE: '待审核'
				},
				{
					ID: '1',
					SBU_CHINESE: '已审核'
				},
				{
					ID: '3',
					SBU_CHINESE: '拒绝'
				},
				{
					ID: '4',
					SBU_CHINESE: '新增'
				}
			],
			checkStatusIndex: 0,
			LoadData: [],
			keepTypeList: [{
				KEEP_TYPE: 0,
				label: '日保养'
			}, {
				KEEP_TYPE: 3,
				label: '周保养'
			}, {
				KEEP_TYPE: 1,
				label: '月保养'
			}, {
				KEEP_TYPE: 4,
				label: '季度保养'
			}, {
				KEEP_TYPE: 2,
				label: '年保养'
			}],
			keepTypeIndex: -1,
			keepCheckStatusList: [{
				status: 0,
				label: '待审核'
			}, {
				status: 1,
				label: '已审核'
			}, {
				status: 3,
				label: '拒绝'
			}, {
				status: 4,
				label: '新增'
			}],
			showFilter: false
		}
	},
	methods: {
		getKeepCheckStatusColor(keepCheckStatus) {
			let res = ''
			this.keepCheckStatusList.map(item => {
				if (item.status === keepCheckStatus) {
					if (item.status == 0) {
						res = '#fa810f'
					} else if (item.status == 1) {
						res = '#00b16f'
					} else if (item.status == 3) {
						res = '#f14000'
					} else if (item.status == 4) {
						res = '#009c50'
					}
				}
			})
			return res
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getIndex() {
			const res = await Index()
			const data = res.Result
			this.deviceType = data.CategoryList
			this.LinesList = data.LinesList
			this.getLoadData()
		},
		// 获取列表数据
		async getLoadData() {
			const res = await LoadData(this.listQuery)
			const data = JSON.parse(res.Result)
			console.log('data: ', data)
			if (this.listQuery.Page === 1) {
				this.LoadData = data
			} else {
				this.LoadData = this.LoadData.concat(data)
			}
			this.listQuery.Page++
		},
		handleChangeStatus(index) {
			this.checkStatusIndex = index
			this.listQuery.KEEP_CHECK_STATUS = this.statusList[index].ID
			this.listQuery.Page = 1
			this.getLoadData()
		},
		getKeepType(keepType) {
			let res = ''
			this.keepTypeList.map(item => {
				if (item.KEEP_TYPE === keepType) {
					res = item.label
				}
			})
			return res
		},
		getKeepCheckStatus(keepCheckStatus) {
			let res = ''
			this.keepCheckStatusList.map(item => {
				if (item.status === keepCheckStatus) {
					res = item.label
				}
			})
			return res
		},
		handlePickLine(e) {
			this.LinesIndex = e.detail.value
			this.listQuery.STATION_ID = this.LinesList[this.LinesIndex].ID
		},
		handlePickKeepType(e) {
			this.keepTypeIndex = e.detail.value
			this.listQuery.KEEP_TYPE = this.keepTypeList[this.keepTypeIndex].KEEP_TYPE
		},
		handlePickCreateBegin(e) {
			this.listQuery.create_begin = e.detail.value
		},
		handlePickCreateEnd(e) {
			this.listQuery.create_end = e.detail.value
		},
		resetListQuery() {
			this.listQuery.STATION_ID = ''
			this.LinesIndex = -1
			this.listQuery.KEEP_TYPE = ''
			this.keepTypeIndex = -1
			this.listQuery.create_begin = ''
			this.listQuery.create_end = ''
		},
		handleToSearch() {
			this.showFilter = false
			this.listQuery.Page = 1
			this.getLoadData()
		},
		handleToDetails(item) {
			uni.navigateTo({
				url: '/pages/SfcsEquipKeep/index?ID=' + item.ID
			})
		},
		// 开启扫描
		openScanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				scanType: ['qrCode', 'barCode'],
				success: _ => {
					this.listQuery.Key = _.result
					this.handleToSearch()
				},
				fail: _ => {
					
				}
			})
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onShow() {
		this.listQuery.Page = 1
		this.getIndex()
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	},
	onPullDownRefresh() {
		this.listQuery.Page = 1
		this.LoadData = []
		this.getLoadData()
	},
	onReachBottom() {
		
		this.getLoadData()
	}
}