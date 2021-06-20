import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	mapState
} from 'vuex'
import {
	Index,
	LoadData
} from '@/api/FixtureQuery.js'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			listQuery1: {
				CODE: '',
				Page: 1,
				Limit: 10,
				Key: ''
			},
			autoFocusNext: false,
			autoFocus: true,
			listQuery2: {
				
			},
			list: [],
			totalCount: 0
		}
	},
	methods: {
		async index() {
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
			
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getMesTongsInfo() {
			this.autoFocusNext = false
			this.autoFocus = false
			if (!this.listQuery1.CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入产品编号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocusNext = true
						}
					}
				})
				return false
			}
			const res = await LoadData(this.listQuery1)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取产品信息失败',
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
				this.$voice.success()
				this.list = JSON.parse(res.Result || [])
				console.log(this.list)
				this.totalCount = res.TotalCount || 0
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '获取产品信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			}
		},
		getCateGory(TONGS_TYPE) {
			switch (TONGS_TYPE) {
				case 1:
					return '测试工装';
					break;
				case 2:
					return '烧录工装';
					break;
				case 3:
					return '客户工装';
					break;
				case 4:
					return 'ICT单面针床';
					break;
				case 5:
					return 'ICT单面针床(托盘)';
					break;
				case 6:
					return 'ICT双面针床';
					break;
				case 7:
					return 'ICT双面针床(托盘)';
					break;
				case 8:
					return 'FCT针床';
					break;
				case 9:
					return 'FCT针床(托盘)';
					break;
				default:
					return '';
					break;
			}
		},
		getStatus(STATUS) {
			STATUS = parseInt(STATUS)
			switch (STATUS) {
				case -1:
					return '未注册';
					break;
				case 0:
					return '待入库';
					break;
				case 1:
					return '存储中';
					break;
				case 2:
					return '借出';
					break;
				case 3:
					return '使用中';
					break;
				case 4:
					return '保养中';
					break;
				case 5:
					return '维修中';
					break;
				case 6:
					return '已报废';
					break;
				case 7:
					return '永久借出';
					break;
				default:
					return '未知状态';
					break;
			}
		},
		submitForm() {
			
		}
	},
	onLoad() {
		this.index()
	},
	components: {
		graceHeader,
		gracePage
	}
}