import request from '../utils/request.js'
import store from '../store'

// 四大件获取当前上线工单
export function GetWo() {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiWO/GetWo', {}, {
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

// 获取工单详细信息
export function GetWoInfo(wo) {
	return request.get('apiSMT/GetWoInfo', {
		params: {
			wo
		}
	})
}

// 提交辅料作业内容
export function TraceSolderPaste({
	solder_no = '',
	wo_no = ''
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/TraceSolderPaste', {}, {
		params: {
			solder_no,
			wo_no,
			userName: token,
			lineId: lineList[currentList].SMT_LINE_ID
		}
	})
}
