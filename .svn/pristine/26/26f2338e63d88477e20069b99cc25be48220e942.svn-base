class Toast {
	msg(title, {
		icon = 1
	}) {
		uni.showToast({
			title,
			icon: ['success', 'none'][icon]
		})
	}
	confirm({
		title = '提示',
		content,
		callback,
		confirmText = '好的'
	}) {
		uni.showModal({
			title,
			content,
			confirmText,
			success(res) {
				if (res.confirm) {
					callback(true)
				} else if (res.cancel) {
					callback(false)
				}
			}
		})
	}
	alert({
		title = '提示',
		content,
		callback
	}) {
		uni.showModal({
			title,
			content,
			showCancel: false,
			success(res) {
				callback(res)
			}
		})
	}
}

let Ins = null

const getInsterface = () => {
	Ins = Ins || new Toast() 
	return Ins
}

export default getInsterface()
