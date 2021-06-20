import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	Index,
	LoadData,
	SaveData
} from '@/api/SfcsScraperUsr.js'
import {
	mapState
} from 'vuex'
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
			form: {
				SCRAPER_NO: '',
				LOCATION: '',
				WorkerNo: '',
				SiteID: '',
				Status: '',
				Collar: '领用'
			},
			autoFocus: true,
			SmtLineList: [],
			SmtLineIndex: -1,
			ScraperStatusList: [],
			ScraperStatusIndex: -1,
			disabled: false
		}
	},
	methods: {
		async getIndex() {
			const res = await Index()
			if (res.Result) {
				const data = res.Result
				this.SmtLineList = data.SmtLineList || []
				this.ScraperStatusList = data.ScraperStatusList || []
			}
		},
		async getLoadData() {
			if (!this.form.SCRAPER_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入刮刀号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await LoadData({
				scraperNo: this.form.SCRAPER_NO
			})
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '获取刮刀信息失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
				this.$voice.error()
				return false
			}
			if (res.Result) {
				this.$voice.success()
				const data = res.Result.ScraperInfo
				this.form.Status = data.Status || ''
				this.form.SiteID = data.SiteID || ''
				this.ScraperStatusIndex = -1
				this.ScraperStatusList.map((item, index) => {
					if (item.ID === this.form.Status.toString()) {
						this.ScraperStatusIndex = index
					}
				})
				this.SmtLineIndex = -1
				this.SmtLineList.map((item, index) => {
					if (item.ID === this.form.SiteID.toString()) {
						this.SmtLineIndex = index
					}
				})
				// console.log(this.SmtLineList[SmtLineIndex])
				this.form.LOCATION = data.LOCATION
				this.form.WorkerNo = this.form.UserName = this.userInfo.USER_NAME
				this.disabled = true
			} else {
				this.$voice.error()
				this.resetFormData()
			}
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.form.SCRAPER_NO) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入刮刀号',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.form.WorkerNo) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入借用人工号',
					showCancel: false
				})
				return false
			}
			if (!this.form.SiteID) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择站点',
					showCancel: false
				})
				return false
			}
			const res = await SaveData({
				SCRAPER_NO: this.form.SCRAPER_NO,
				ActionType: 6,
				WorkerNo: this.form.WorkerNo,
				UserName: this.form.UserName,
				SiteID: this.form.SiteID ? parseInt(this.form.SiteID) : 0
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '刮刀领用失败',
					showCancel: false
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '刮刀领用成功',
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
					content: '刮刀领用失败',
					showCancel: false
				})
			}
		},
		handlePickeLine(e) {
			this.SmtLineIndex = e.detail.value
			this.form.SiteID = this.SmtLineList[this.SmtLineIndex].ID
		},
		handlePickeStatus(e) {
			this.ScraperStatusIndex = e.detail.value
			this.form.Status = this.ScraperStatusList[this.ScraperStatusIndex].ID
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			this.disabled = false
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
				// this.form.WorkerNo = this.userInfo.USER_NAME
				this.getIndex()
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
	},
	onLoad() {
		this.getIndex()
	}
}
