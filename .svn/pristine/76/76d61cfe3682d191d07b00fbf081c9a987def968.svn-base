import request from '../utils/request.js'
import store from '../store'


// 获取获取制程信息
export function GetMesRouteInfo() {
	return request.get('apiSMT/GetMesRouteInfo')
}
// 获取工单信息
export function GetWoInfo(i) {
	return request.get('/apiSMT/GetWoInfo',{
		params: {
			wo: i
		}
	})
}
// 获取线体信息
export function GetMesOperationLines(i) {
	return request.get('apiSMT/GetMesOperationLines',{
		params: {
			wo: i
		}
	})
};

// 提交产线开工
export function ProducLineBegin(formData) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/ProducLineBegin', Object.assign(formData, {
		user: token,
		lineId: lineList[currentList].SMT_LINE_ID
	}), {
		header: {
			'Content-Type': 'application/json',
		}
	})
}