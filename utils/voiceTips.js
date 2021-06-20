const defaultVoiceSet = {
	success: {
		name: 'ringin.wav',
		path: '../../static/voice/ringin.wav' // 播放本地音频资源在乐队路径前加 http://localhost
	},
	warning: {
		name: 'warning.wav',
		path: '../../static/voice/warning.wav'
	},
	error: {
		name: 'error.wav',
		path: '../../static/voice/error.wav'
	}
}

let voice = uni.getStorageSync('voice')
if (!voice) {
	voice = defaultVoiceSet
	uni.setStorageSync('voice', voice)
}
class VoiceTips {
	constructor() {
		this.innerAudioContext = uni.createInnerAudioContext()
		this.platform = uni.getSystemInfoSync().platform
	}
	play() {
		if (!this.innerAudioContext) {
			this.innerAudioContext = uni.createInnerAudioContext()
		}
		this.innerAudioContext.play()
		this.innerAudioContext.onError(res => {
			uni.showModal({
				title: '播放异常',
				content: res.errMsg + '  ' + res.errCode,
				showCancel: false
			})
			uni.setStorageSync('voice', defaultVoiceSet)
		})
	}
	vibrate() {
		this.platform === 'ios' ? uni.vibrateLong() : uni.vibrateLong()
	}
	success() {
		this.innerAudioContext.src = voice.success.path
		this.play()
		this.vibrate()
	}
	error() {
		this.innerAudioContext.src = voice.error.path
		this.play()
		this.vibrate()
	}
	warning() {
		this.innerAudioContext.src = voice.warning.path
		this.play()
		this.vibrate()
	}
}

let Ins = null

const getInsterface = () => {
	Ins = Ins || new VoiceTips()
	return Ins
}

export default getInsterface()
