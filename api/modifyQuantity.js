import request from '../utils/request.js'
import store from '../store'


// 料卷校验
export function GetReel(reelCode) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('apiSMT/GetReel', {
		params: {
			reelCode,
			userName: token
		}
	})
}

// 修改料卷数量
export function UpdateReelOnhandQty({
	reelID = '',
	qty = ''
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('ReelApi/UpdateReelOnhandQty', {
		reelID,
		qty
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

