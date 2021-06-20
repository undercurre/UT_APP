import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import * as config from '@/utils/config.js';
import {
	GetFeeder,
	GetFeederLocation,
	GetFeederDefectCode,
	PostFeederDefect
} from '@/api/feidaRepair.js';
import {
	mapGetters
} from 'vuex'
export default {
	data() {
		return {
			formData: {
				feederNo: '',
				defectCode: '',
				smtLineId: ''
			},
			autoFocus: false,
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			timer: null,
			locationList: [],
			defectCodeList: [],
			defectCodeIndex: -1,
			scrollHeight: 50,
			lineIndex: -1
		}
	},
	computed: {
		...mapGetters([
			'lineList', 'currentLine'
		])
	},
	methods: {
		async getLocationList() {
			const linesID = this.lineList[this.lineIndex].SMT_LINE_ID || 0
			return await GetFeederLocation(linesID)
		},
		async getDefectCodeList() {
			return await GetFeederDefectCode()
		},
		initScrollView() {
			this.$nextTick(() => {
				uni.getSystemInfo({
					success: res => {
						const windowHeight = res.windowHeight
						this.scrollHeight = windowHeight - uni.upx2px(130) - 44 - uni.upx2px(60) - uni.upx2px(363) + uni.upx2px(60)
					}
				})
			})

		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		async submitForm() {
			if (!this.formData.feederNo) {
				this.$voice.error()
				this.autoFocus = false
				uni.showModal({
					title: '提示',
					content: '请输入飞达',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
						}
					}
				})
				return false
			}
			if (!this.formData.defectCode) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择不良原因',
					showCancel: false
				})
				return false
			}
			if (!this.formData.smtLineId) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择飞达位置',
					showCancel: false
				})
				return false
			}
		
			const result = await PostFeederDefect(this.formData)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '处理成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetForm()
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: result.Msg || '处理失败'
				})
			}
		},
		resetForm() {
			this.formData = {
				feederNo: '',
				defectCode: '',
				smtLineId: ''
			}
			this.autoFocus = false
			this.timer = setTimeout(() => {
				this.autoFocus = true
				clearTimeout(this.timer)
			}, 200)
			this.defectCodeIndex = -1
			this.selection = false
			this.selectionStart = 0
			this.selectionEnd = 0
		},
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.timer = setTimeout(() => {
				this.selection = true
				this.selectionStart = 0
				this.selectionEnd = value ? value.toString().length : 0;
				clearTimeout(this.timer)
			}, 200)
		},
		async handleCheckFeeder() {
			if (!this.formData.feederNo) {
				return false
			}
	
			this.autoFocus = false
			const result = await GetFeeder(this.formData.feederNo)
			if (result.Code === config.SUCCESS_CODE && result.Data) {
				// 飞达检验通过
			} else {
				uni.showModal({
					title: '提示',
					content: result.Msg || '飞达检验错误',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.autoFocus = true
							this.formData.feederNo = ''
						}
					}
				})
				this.$voice.error()
			}
		},
		handleChangeDefectCode(e) {
			this.defectCodeIndex = parseInt(e.detail.value)
			this.formData.defectCode = this.defectCodeList[this.defectCodeIndex].CODE
		},
		radioChange(e) {
			this.formData.smtLineId = parseInt(e.detail.value)
		},
		async handleFilterLine(e) {
			this.lineIndex = e.detail.value
			const linesID = this.lineList[this.lineIndex].SMT_LINE_ID || 0
			const res = await GetFeederLocation(linesID)
			if (res.Code === config.SUCCESS_CODE) {
				this.locationList = res.Data || []
			} else {
				this.locationList = []
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.lineIndex = this.currentLine || 0
	},
	async onShow() {
		this.initScrollView()
		const result = await Promise.all([this.getLocationList(), this.getDefectCodeList()])
		if (result[0].Code === config.SUCCESS_CODE && result[1].Code === config.SUCCESS_CODE) {
			this.locationList = result[0].Data || []
			this.defectCodeList = result[1].Data || []
			
			this.$nextTick(() => {
				this.autoFocus = true
			})
		} else {
			uni.showModal({
				title: '提示',
				content: result[0].Msg || result[1].Msg,
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
	onUnload() {
		clearTimeout(this.timer)
	}
}
