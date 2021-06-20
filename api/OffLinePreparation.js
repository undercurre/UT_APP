import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'
import store from '@/store/index.js'

export function CheckOfflineMaterials(data) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	Object.assign(data, {
		LINE_ID: lineList[currentList].SMT_LINE_ID,
		UserName: token
	})
	return request.post('api/OfflineMaterials/CheckOfflineMaterials', data, requestOptions())
}

export function LoadData(query) {
	return request.get('api/OfflineMaterials/LoadData', requestOptions(query))
}

export function CheckOfflineMaterialsEx(data) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	Object.assign(data, {
		LINE_ID: lineList[currentList].SMT_LINE_ID,
		UserName: token
	})
	return request.post('api/OfflineMaterials/CheckOfflineMaterialsEx', data, requestOptions())
}
