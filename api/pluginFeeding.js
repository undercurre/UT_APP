import request from '../utils/request.js'
import store from '../store'


// 检查站点
export function CheckSiteByMac(mac) {
	return request.get('apiSMT/CheckSiteByMac', {
		params: {
			mac
		}
	})
}

// 料卷回车后,手插件检查备料，并记录备料信息
export function CheckHiReel(data) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/CheckHiReel', Object.assign(data, {
		User: token,
		OperationLineId: lineList[currentList].SMT_LINE_ID
	}))
}

// 同步料单
export function SyncHiReel(data) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/SyncHiReel', {
		lineId: lineList[currentList].SMT_LINE_ID
	})
}
