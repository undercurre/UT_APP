import request from '../utils/request.js'
import store from '../store'
import {
	IS_SKYWORTH
} from '@/utils/config'

// 获取工单列表
export function GetWOData() {
	return request.get('apiSMT/GetWOData')
}

// 获取机台列表
export function GetStation(lineId) {
	return request.get('apiSMT/GetStation', {
		params: {
			lineId
		}
	})
}

// 获取工单信息
export function GetWoInfo(wo) {
	return request.get('apiSMT/GetWoInfo', {
		params: {
			wo
		}
	})
}

// 工单上线按钮
export function DoWoOnline(formData) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	console.log(lineList)
	return request.post('apiWo/DoWoOnline', formData, {
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

// 更新拼版数
export function RecordWoMultNo(formData) {
	return request.post('apiSMT/RecordWoMultNo', formData)
}

// PDA连接监控台(server_url不为空才调用)
export function SysConnectPTS(newUrl) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	const password = store.getters.password
	return request.post('Sys/Login', {
		Domain: '',
		UserName: token,
		Password: password
	}, {
		baseUrl: newUrl,
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

/**
 * 替代料
 */
export function GetReplacePn(woNO) {
	if (IS_SKYWORTH) {
		return request.post('apiSMT/GetReplacePn', {}, {
			params: {
				woNO
			}
		})
	} else {
		const lineList = store.getters.lineList
		const currentList = store.getters.currentLine
		const PDA_ID = store.getters.PDA_ID
		const token = store.getters.token
		const baseUrl = lineList[currentList].SERVICE_URL
		return request.post('apiWo/GetReplacePn', {}, {
			params: {
				woNO
			},
			baseUrl,
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
}
