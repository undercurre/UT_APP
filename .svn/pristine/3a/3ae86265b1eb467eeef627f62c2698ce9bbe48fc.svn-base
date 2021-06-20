import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SmtStencilTake/Index', requestOptions())
}

export function LoadData(query) {
	return request.get('api/SmtStencilTake/LoadData', requestOptions(query))
}

export function SaveData(data) {
	return request.post('api/SmtStencilTake/SaveData', data, requestOptions())
}

// PDA查询
export function LoadDataPDA({
	USER_ID = '',
	PartNo = '',
	Page = 1,
	Limit = 10,
	Key = ''
}) {
	return request.get('api/SmtStencilConfig/LoadDataPDA', requestOptions({
		USER_ID,
		PartNo,
		Page,
		Limit,
		Key
	}))
}

// 工单号查询
export function WoNoLoadData(query) {
	return request.get('api/SmtWo/LoadData', requestOptions(query))
}


export function getSmtWoByNo(query) {
	return request.get('api/SmtWo/GetSmtWoByNo', requestOptions(query))
}