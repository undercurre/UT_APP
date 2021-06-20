import request from '../utils/request.js'
import store from '../store'


// 条码是否存在系统中
export function IsRuncardExist(i) {
	return request.get('apiSMT/IsRuncardExist',{
		params: {
			sn: i
		},
		header: {
			'Content-Type': 'application/json'
		}
	})
}

// 补刷条码之确认
export function InsertMultiPanelData(pnList) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/InsertMultiPanelData', {
		pnList,
		user: token
	})
}

// 补刷条码之确认
export function ScanLostSn(data) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiWO/ScanLostSn', data, {
		baseUrl: lineList[currentList].SERVICE_URL,
		header: {
			'Content-Type': 'application/json',
			'7BD87AEN3BE88D4cZHI14817E10971D13E74F': JSON.stringify({
				"Domain": "",
				"UserName": token,
				"Password": "",
				"PDAID": PDA_ID,
				"SMTLineID": lineList[currentList].SMT_LINE_ID
			})
		}
	})
}
