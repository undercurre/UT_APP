import request from '../utils/request.js'
import store from '../store'

// 检验飞达
export function GetFeeder(feeder_no) {
	return request.get('apiSMT/GetFeeder', {
		params: {
			feeder_no
		}
	})
}

// 获取飞达位置
export function GetFeederLocation(linesID) {
	return request.get('apiSMT/GetFeederLocation', {
		params: {
			linesID
		}
	})
}

// 获取飞达不良代码
export function GetFeederDefectCode() {
	return request.get('apiSMT/GetFeederDefectCode')
}

// 飞达报修提交
export function PostFeederDefect({
	feederNo = '',
	defectCode = '',
	smtLineId = ''
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/PostFeederDefect', {
		feederNo,
		defectCode,
		smtLineId,
		user: token
	})
}
