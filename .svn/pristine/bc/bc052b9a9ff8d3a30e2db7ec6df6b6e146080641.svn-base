import request from '@/utils/request.js'
import { requestOptions } from '@/utils/utils.js'
import store from '@/store/index.js'

export function GetSmtResourceWarm() {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('api/SmtResourceRules/GetSmtResourceWarm', requestOptions())
}

export function GetSmtResourceUse() {
	return request.get('api/SmtResourceRules/GetSmtResourceUse', requestOptions())
}
