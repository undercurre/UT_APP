import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function ChangeLocationIndex() {
	return request.get('api/SmtStencilStore/ChangeLocationIndex', requestOptions())
}

export function ChangeLocationLoadData(stencil_no = '') {
	return request.get('api/SmtStencilStore/ChangeLocationLoadData', requestOptions({
		stencil_no
	}))
}

export function ChangeLocationSave(data) {
	return request.post('api/SmtStencilStore/ChangeLocationSave', data, requestOptions())
}