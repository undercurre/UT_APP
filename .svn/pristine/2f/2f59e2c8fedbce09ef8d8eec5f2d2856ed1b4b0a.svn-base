import request from '../utils/request.js'
import store from '../store'

// 对料
export function Compare(formData) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('Compare/Compare', formData, {
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

// 获取下一站点 
export function GetNextLocationEx(currentFullSlot) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('Supply/GetNextLocationEx', {
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

// 线体的机台
export function GetCurrentStations() {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('Compare/GetCurrentStations', {
		params: {
			smtLineID: lineList[currentList].SMT_LINE_ID
		},
		baseUrl: lineList[currentList].SERVICE_URL
	})
}

// 对料重置
export function ResetCompare(stationName) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('Compare/ResetCompare', {
		stationName
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

