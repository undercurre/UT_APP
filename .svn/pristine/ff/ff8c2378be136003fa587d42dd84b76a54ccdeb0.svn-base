import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import ytFileSelector from '../../components/ytFileSelector/index.vue';
export default {
	data() {
		return {
			formData: {
				success: {
					name: ' '
				},
				warning: {
					name: ' '
				},
				error: {
					name: ' '
				}
			},
			show: false,
			currentType: 0,
			innerAudioContext: null
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleChooseFile(type) {
			this.currentType = type
			this.show = true
			this.$nextTick(() => {
				this.$refs.selectors.choose()
			})
		},
		selectedHandler(e) {
			this.show = false
			let obj = e[0]
			if (!obj || !obj.pathName) {
				uni.showModal({
					title: '提示',
					content: '请选择音频文件',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			// TODO 判断音频文件大小
			const max = 2 * 1024 * 1024 // 2 M 
			if (obj.size > max) {
				uni.showModal({
					title: '提示',
					content: '请选择 2M 大小以下的音频文件',
					showCancel: false
				})
				this.$voice.error()
				return false
			}
			switch (this.currentType) {
				case 1:
					this.formData.success = {
						name: obj.pathName,
						path: obj.path
					}
					break
				case 2:
					this.formData.warning = {
						name: obj.pathName,
						path: obj.path
					}
					break
				case 3:
					this.formData.error = {
						name: obj.pathName,
						path: obj.path
					}
					break
			}
		},
		async submitForm() {
			const res = await this.$store.dispatch('system/setVoice', this.formData)
			if (res) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '设置成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			} else {
				this.$voice.error()
				uni.showModal({
					title: '设置异常',
					content: '详细原因未知',
					showCancel: false
				})
			}
		},
		handlePlay(path) {
			this.innerAudioContext.src = path
			this.innerAudioContext.play()
			this.innerAudioContext.onError(res => {
				this.$voice.vibrate()
				uni.showModal({
					title: '播放异常',
					content: res.errMsg,
					showCancel: false
				})
			})
			this.innerAudioContext.onEnded(res => {

			})
		},
		reset() {
			uni.showModal({
				title: '提示',
				content: '确定要重置声音设定吗？',
				success: async res => {
					if (res.confirm) {
						this.$voice.vibrate()
						this.formData = {
							success: {
								name: 'ringin.wav',
								path: '/static/voice/ringin.wav'
							},
							warning: {
								name: 'warning.wav',
								path: '/static/voice/warning.wav'
							},
							error: {
								name: 'error.wav',
								path: '/static/voice/error.wav'
							}
						}
				
						// const result = await this.$store.dispatch('system/setVoice', this.formData)
						// if (result) {
						// 	uni.showModal({
						// 		title: '提示',
						// 		content: '设置成功',
						// 		showCancel: false
						// 	})
						// } else {
						// 	uni.showModal({
						// 		title: '设置异常',
						// 		content: '详细原因未知',
						// 		showCancel: false
						// 	})
						// }
					}
				}
			})
		}
	},
	components: {
		graceHeader,
		gracePage,
		ytFileSelector
	},
	onLoad() {
		uni.getStorage({
			key: 'voice',
			success: res => {
				this.formData = res.data
			}
		})
		this.innerAudioContext = uni.createInnerAudioContext()
	},
	onShow() {

	},
	onUnload() {
		this.innerAudioContext = null
	}
}
