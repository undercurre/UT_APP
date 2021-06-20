import request from '@/utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function LoadData(query) {
	return request.get('api/MesTongsInfo/LoadData', requestOptions(query))
}

export function BorrowTongs(data) {
	return request.post('api/MesTongsInfo/BorrowTongs', data, requestOptions())
}


