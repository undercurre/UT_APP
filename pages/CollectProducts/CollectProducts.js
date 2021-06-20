import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	Sites,
	SaveSite, // 保存站点
	CollectData
} from '@/api/CollectProducts.js'

export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			// 保存站点
			SiteFrom: {
				SiteId: '',
				UserName: ''
			},
			SiteObj: '',
			enterVal: '',
			NewsInfo: '',
			statusBarHeight: 0,
			checkStatusIndex: 0,
			statusList: [{
					ID: '1',
					SBU_CHINESE: '采集数据'
				},
				{
					ID: '2',
					SBU_CHINESE: '消息区'
				},
			],
			collectList: [],
			autoFocus: true,
			zhichengList: [],
			zhichengIndex: -1,
			LINEID: ''
		}
	},
	onLoad() {
		// currentLine
		console.log(this.$store.state.system)
		var lineBox = this.$store.state.system.lineList
		lineBox.map((v, i) => {
			// console.log(v,'VVV',i,'iiii')
			if (this.$store.state.system.currentLine === i) {
				this.LINEID = v.SMT_LINE_ID
				this.getSites()
			}
		})
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

		this.SiteFrom.UserName = this.userInfo.USER_NAME
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async getSites() {
			console.log(this.LINEID, 'this.LINEID')
			var obj = {
				OPERATION_LINE_ID: this.LINEID,
				Page: 1,
				Limit: 1000000
			}
			const res = await Sites(obj)
			const data = JSON.parse(res.Result)
			this.zhichengList = data || []
		},
		handleChangeZhiCheng(e) {
			this.zhichengIndex = e.detail.value
			this.SiteFrom.SiteId = this.zhichengList[this.zhichengIndex].ID || ''
			this.getSaveSite()
		},
		async getSaveSite() {
			const res = await SaveSite(this.SiteFrom)
			this.SiteObj = res.Result || {}
			console.log(res, 'resresresb保存站点')

		},
		async EnterCheckRee(e) {
			if (!this.SiteFrom.SiteId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择工位',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			this.autoFocus = false
			this.SiteObj.data = this.enterVal
			const res = await CollectData(this.SiteObj)
			console.log(res, 'CollectData')
			if (res.Result) {
				this.SiteObj = res.Result
				this.NewsInfo = res.Result.msg || ''
				this.collectList = res.Result.collectDataViews || []
				// this.collectList = [{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	},
				// 	{
				// 		OBJECT_NAME: '1',
				// 		NEED_ASSEMBLY_QTY: '2',
				// 		COLLECTED_QTY: '3',
				// 		DATA_FORMAT: '4',
				// 		PART_NO: '5'
				// 	}
				// ]
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}


		},
		handleChangeStatus(index) {
			this.checkStatusIndex = index
		},
		resetFormData(isVibrate = false) {

			this.zhichengIndex = -1
			this.enterVal = ''
			this.NewsInfo = ''
			this.collectList = []
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		}
	}
}
