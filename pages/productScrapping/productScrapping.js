import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import {
	GetHiProduct
} from '@/api/producOffline.js'
import {
	IsRuncardExist
} from '@/api/replaceBarcode.js'
import {
	SnScrap
} from '@/api/productScrapping.js'
import * as config from '@/utils/config.js'
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	name: 'productScrapping',
	data() {
		return {
			autoFoucs: true,
			formData: {
				sn: ''
			},
			timer: null,
			netData: {
				
			},
			selection: '',
			selectionStart: 0,
			selectionEnd: 0
		}
	},
	components: {
		graceHeader, gracePage
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async initPage() {
			const res = await GetHiProduct()
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.netData = res.Data
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '获取工单信息失败',
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
		handleFocus() {
			const value = this.formData.sn
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		},
		async handleCheckSn() {
			this.autoFocus = false
			if (!this.formData.sn) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入产品条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const res = await IsRuncardExist(this.formData.sn)
			if (!res.Code === config.SUCCESS_CODE || !res.Data) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '条码不存在',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.formData.sn = ''
							this.autoFocus = true
						}
					}
				})
				return false
			}
			const _res = await SnScrap(this.formData.sn)
			if (_res.Code === config.SUCCESS_CODE && _res.Data) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '产品报废成功',
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
					content: res.Msg || '产品报废失败',
					showCancel: false,
					success: _ => {
						this.formData.sn = ''
						this.autoFocus = true
					}
				})
			}
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFoucs: false,
				netData: this.netData
			})
			this.timer = setTimeout(() => {
				this.autoFoucs = true
				clearTimeout(this.timer)
			}, 200)
			if (isVibrate) this.$voice.vibrate()
		}
	},
	onLoad() {
		this.initPage()
	},
	onHide() {
		clearTimeout(this.timer)
	},
	onUnload() {
		clearTimeout(this.timer)
	}
}