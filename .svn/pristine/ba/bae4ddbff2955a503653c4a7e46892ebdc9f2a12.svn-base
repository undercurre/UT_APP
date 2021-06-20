import request from '../utils/request.js'
import store from '../store'


// 产线下线
export function ProducLineEnd() {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/ProducLineEnd', {
		user: token,
		lineId: lineList[currentList].SMT_LINE_ID
	})
}

// 获取当前线别作业信息
export function GetHiProduct() {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('apiSMT/GetHiProduct', {
		params: {
			lineID: lineList[currentList].SMT_LINE_ID
		}
	})
}
