import request from '../utils/request.js'
import store from '../store'


// 条码是否存在系统中
export function IsRuncardExist(sn) {
	return request.get('apiSMT/IsRuncardExist', {
		params: {
			sn
		}
	})
}

// 产品替换条码
export function ReplaceMultiPanelSN(data) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/ReplaceMultiPanelSN', Object.assign(data, {
		user: token
	}))
}
