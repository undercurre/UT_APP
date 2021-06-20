import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	Index,
	LoadData,
	SaveData
} from '@/api/SfcsScraperReturn.js'
import {
	mapState
} from 'vuex'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			form: {
				SCRAPER_NO: '',
				LOCATION: '',
				WorkerNo: '',
				SiteID: '',
				Status: '',
				Collar: '归还'
			},
			autoFocus: true,
			selection: '',
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			SmtLineList: [],
			ScraperStatusList: [],
			disabled: false,
			SmtLineIndex: -1,
			ScraperStatusIndex: -1
		}
	},
	methods: {
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
				this.form.WorkerNo = this.userInfo.USER_NAME
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
		async getIndex() {
			const res = await Index()
			if (res.Result) {
				const data = res.Result
				this.SmtLineList = data.SmtLineList || []
				this.ScraperStatusList = data.ScraperStatusList || []
			}
		},
		async getLoadData() {
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
			const res = await LoadData(this.form.SCRAPER_NO)
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
				this.ScraperStatusList.map((item, index) => {
					if (item.ID === this.form.Status.toString()) {
						this.ScraperStatusIndex = index
					}
				})
				this.SmtLineList.map((item, index) => {
					if (item.ID === this.form.SiteID.toString()) {
						this.SmtLineIndex = index
					}
				})
				this.form.LOCATION = data.LOCATION || ''
				this.disabled = true
			} else {
				this.$voice.error()
				this.resetFormData()
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
					content: '请输入归还人工号',
					showCancel: false
				})
				return false
			}
			const res = await SaveData({
				SCRAPER_NO: this.form.SCRAPER_NO,
				ActionType: 7,
				WorkerNo: this.form.WorkerNo || this.userInfo.USER_NAME,
				UserName: this.form.WorkerNo || this.userInfo.USER_NAME,
				SiteID: 0
			})
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '归还刮刀失败',
					showCancel: false
				})
				return false
			}
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '刮刀归还成功',
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
					content: '归还刮刀失败',
					showCancel: false
				})
			}
		}
	},
	onLoad() {
		this.getIndex()
		this.form.WorkerNo = this.userInfo.USER_NAME
	},
	components: {
		graceHeader,
		gracePage
	}
}