import request from '../utils/request.js'
import store from '../store'

// 飞达校验
export function CheckFeeder(feeder) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('FeederApi/CheckFeeder', {
		params: {
			feeder
		},
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

// 离线上料
export function SupplyAndPlaceByOffline({
	feeder = '',
	fullLocation = ''
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('Supply/SupplyAndPlaceByOffline', {
		feeder,
		fullLocation
	}, {
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

// 离线上料
export function SupplyAndPlaceByOffline_for_ruijing({
	feeder = '',
	fullLocation = ''
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('Sys/SupplyAndPlaceByOffline', {
		feeder,
		fullLocation
	}, {
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

// 获取下一站点
export function GetNextLocation(currentFullSlot) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('Supply/GetNextLocation', {
		params: {
			currentFullSlot
		},
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