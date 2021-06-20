import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function ReturnIndex() {
	return request.get('api/SmtStencilTake/ReturnIndex', requestOptions())
}

export function ReturnLoadData(stencil_no) {
	return request.get('api/SmtStencilTake/ReturnLoadData', requestOptions({
		stencil_no
	}))
}

export function ReturnSaveData(data) {
	return request.post('api/SmtStencilTake/ReturnSaveData', data, requestOptions())
}
