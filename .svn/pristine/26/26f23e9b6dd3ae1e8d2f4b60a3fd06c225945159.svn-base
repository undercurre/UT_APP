import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SmtStencilMaintain/Index', requestOptions())
}

export function GetStencilInfo(stencil_no) {
	return request.get('api/SmtStencilMaintain/GetStencilInfo', requestOptions({
		stencil_no
	}))
}

export function LoadData(stencil_no) {
	return request.get('api/SmtStencilMaintain/LoadData', requestOptions({
		stencil_no
	}))
}

export function SaveData(data) {
	return request.post('api/SmtStencilMaintain/SaveData', data, requestOptions())
}
