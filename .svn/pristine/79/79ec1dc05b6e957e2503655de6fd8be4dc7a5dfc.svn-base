import request from '../utils/request.js'
import store from '../store'


// 产品报废
export function SnScrap(sn) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/SnScrap', {
		user: token,
		sn
	})
}
