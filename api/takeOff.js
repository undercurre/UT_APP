import request from '../utils/request.js'
import store from '../store'

// 条码格式化
export function FormatBarcode(barcode) {
	return request.get('System/FormatBarcode', {
		params: {
			barcode
		}
	})
}

// 卸料
export function TakeOff({ feederOrReel = '', endReel = '' }) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('Supply/TakeOff', {
		feederOrReel,
		endReel
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
