import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SmtStencilStore/Index', requestOptions())
}

export function LoadData(query) {
	return request.get('api/SmtStencilStore/LoadData', requestOptions(query))
}

export function SaveData(data) {
	return request.post('api/SmtStencilStore/SaveData', data, requestOptions())
}

export function ScrapStencilStore({
	STENCIL_NO = '',
	UserName = ''
}) {
	return request.post('api/SmtStencilStore/ScrapStencilStore', {
		STENCIL_NO,
		UserName
	}, requestOptions())
}
