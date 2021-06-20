import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'
import store from '../store'

export function OfflineUnloading(KEY) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('api/OfflineMaterials/OfflineUnloading', {
		KEY,
		LINE_ID: lineList[currentList].SMT_LINE_ID
	}, requestOptions())
}
