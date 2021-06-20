import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
const graceChecker = require('../../graceUI/jsTools/graceChecker.js');
import {
	IsRuncardExist,
	InsertMultiPanelData
} from '../../api/brushup.js'
import * as config from '@/utils/config.js'
export default {
	data() {
		return {
			sn: '',
			pnList: [],
			autoFoucs: false,
			scrollHeight: 50,
			pingBan_num: 1,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null
		};
	},
	methods: {
		// 检查条码
		async checkSn() {
			this.autoFoucs = false
			if (!this.sn) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入条码',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFoucs = true
						}
					}
				})
				return false
			}
			if (this.pingBan_num < 1) {
				this.$voice.error()
				uni.showModal({
					title: "提示",
					content: "请先选择拼版数",
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.sn = ''
							this.$nextTick(() => {
								this.autoFoucs = true
							})
						}
					}
				})
				return false
			}
			if (this.pingBan_num <= this.pnList.length) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请先增加拼版数',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.sn = ''
							this.$nextTick(() => {
								this.autoFoucs = true
							})
						}
					}
				})
				return false
			}

			if (this.pnList.indexOf(this.sn) !== -1) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '该条码已存在，请勿重复扫描',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.sn = ''
							this.$nextTick(() => {
								this.autoFoucs = true
							})
						}
					}
				})
				return false
			}
			const res = await IsRuncardExist(this.sn)
			if (res.Code === config.SUCCESS_CODE && res.Data) {
				this.$voice.success()
				this.pnList.push(this.sn)
				this.sn = ''
				if (this.pingBan_num > this.pnList.length) {
					this.$nextTick(() => {
						this.autoFoucs = true
					})
					
				}
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.Msg || '该条码不存在',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.sn = ''
							this.$nextTick(() => {
								this.autoFoucs = true
							})
						}
					}
				})
			}
		},
		// 改变平板数
		handleChange(e) {
			this.pingBan_num = e[0]
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleFocus() {
			const value = this.sn
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0
				clearTimeout(this.timer)
			})
		},
		// 提交
		async submitForm() {
			if (this.pnList.length !== this.pingBan_num) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '条码数与拼版数不一致',
					showCancel: false,
					success: _ => {}
				})
				return false
			}
			if (!this.pnList.length) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请扫描条码',
					showCancel: false
				})
				return false
			}
			uni.showModal({
				title: '确认',
				content: '确定要提交吗？',
				success: async _res => {
					if (_res.confirm) {
						const res = await InsertMultiPanelData(this.pnList)
						if (res.Code === config.SUCCESS_CODE && res.Data) {
							this.$voice.success()
							uni.showModal({
								title: '提示',
								content: '提交成功',
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
								content: res.Msg || '提交失败',
								showCancel: false
							})
						}
					}
				}
			})
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				scrollHeight: this.scrollHeight
			})
			this.$nextTick(() => {
				this.autoFoucs = true
			})
			if (isVibrate) {
				this.$voice.vibrate()
			}
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceNumberBox
	},
	onLoad() {},
	mounted() {
		const windowHeight = uni.getSystemInfoSync().windowHeight
		const query = uni.createSelectorQuery()
		query.select('#myForm').boundingClientRect(res => {
			const formHeight = res.height
			this.scrollHeight = windowHeight - 44 - formHeight - uni.upx2px(180) - uni.upx2px(60)
		}).exec(() => {

		})
		this.$nextTick(() => {
			this.autoFoucs = true
		})
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	onHide() {
		clearTimeout(this.timer)
	}
}
