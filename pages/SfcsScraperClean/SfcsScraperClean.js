import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	Index,
	LoadData,
	SaveData
} from '@/api/SfcsScraperClean.js'
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
			form: {},
			autoFocus: true,
			SmtLineList: [],
			SmtLineIndex: -1,
			ScraperStatusList: [],
			ScraperStatusIndex: -1,
			disabled: false,
			isNG: false,
			INSPECT_RESULT: [],
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
				const data = res.Result.RuncardInfo
				this.form.PrintCount = data.PrintCount
				this.form.Status = String(data.Status)
				this.ScraperStatusList.map((item, index) => {
					if (item.ID === this.form.Status.toString()) {
						this.ScraperStatusIndex = index
					}
				})
				this.form.ProductCount = data.ProductCount
				this.form.SiteName = data.SiteName
				this.form.LastCleanTime = data.LastCleanTime
				this.form.SiteID = data.SiteID
				this.disabled = true
			}
		},
		async submitForm() {
			this.autoFocus = false
			if (!this.form.SCRAPER_NO) {
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
				this.$voice.error()
				return false
			}
			// this.form.InspectResult = this.INSPECT_RESULT.join(',')
			if (this.INSPECT_RESULT.length === 0) {
				uni.showModal({
					title: '提示',
					content: '请选择检查结果',
					showCancel: false,
				})
				this.$voice.error()
				return false
			}

			const newData = {}
			newData.SCRAPER_NO = this.form.SCRAPER_NO
			newData.PRINT_COUNT = this.form.PrintCount
			newData.CLEAN_USER = this.form.CLEAN_USER
			newData.INSPECT_RESULT = this.form.INSPECT_RESULT.join('，')
			newData.SiteID = this.form.SiteID
			console.log(newData)
			const res = await SaveData(newData)
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '刮刀清洗失败',
					showCancel: false
				})
				return false
			}
			if (res.Result === true) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '刮刀清洗成功',
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
					content: '刮刀清洗失败',
					showCancel: false
				})
			}
		},
		handleChangeCheckBox(e) {
			this.INSPECT_RESULT = e.detail.value
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
				this.getIndex()
				this.disabled = false
				this.form.CLEAN_USER = this.userInfo.USER_NAME
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},
	},
	onLoad() {
		this.getIndex()
		this.form.CLEAN_USER = this.userInfo.USER_NAME
	},
	watch: {
		INSPECT_RESULT: {
			handler(val, oldVal) {
				console.log(val, oldVal)
				if (oldVal.indexOf('OK') === -1 && val.indexOf('OK') !== -1) {
					// 原数组没有ok 新数组有 ok
					this.INSPECT_RESULT = ['OK']
				} else if (oldVal.indexOf('OK') !== -1 && val.length > 1) {
					const arr = []
					val.map(item => {
						if (item !== 'OK') arr.push(item)
					})
					this.INSPECT_RESULT = arr
				}
				this.form.INSPECT_RESULT = this.INSPECT_RESULT
			},
			deep: false
		}
	}
}
