import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function GetStencilInfo(stencil_no) {
	return request.get('api/SmtStencilClean/GetStencilInfo', requestOptions({
		stencil_no
	}))
}

export function LoadData(query) {
	return request.get('api/SmtStencilClean/LoadData', requestOptions(query))
}

export function SaveData(data) {
	return request.post('api/SmtStencilClean/SaveData', data, requestOptions())
}