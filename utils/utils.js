import store from '@/store'
import { MES_BS_HOST } from '@/utils/config.js' // bs端请求

export function requestOptions(params = {}) { // 给bs用
	const host = store.getters.host
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	const X_TOKEN = store.getters.X_TOKEN
	return {
		params,
		baseUrl: 'http://' + host + MES_BS_HOST,
		header: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + X_TOKEN
		}
	}
}

export function requestOptionsWMS(params = {}) { // WMS 接口options
	const WMSHOST = store.getters.WMSHOST
	const WMSPORT = store.getters.WMSPORT
	return {
		params,
		baseUrl: 'http://' + WMSHOST + ':' + WMSPORT + '/',
		header: {
			'Content-Type': 'application/json'
		}
	}
}

// 判断是否设置了WMS服务器
export function isSetWMSService() {
	const WMSHOST = store.getters.WMSHOST
	const WMSPORT = store.getters.WMSPORT
	return WMSHOST && WMSPORT
}
