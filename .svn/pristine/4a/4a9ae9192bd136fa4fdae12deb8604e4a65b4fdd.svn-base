import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function LoadData(query) {
	return request.get('api/SmtFeederReplace/LoadData', requestOptions({USER_ID: query.USER_ID,
		FEEDER: query.FEEDER}))
}
export function QueryByNewFeeder(query) {
	return request.get('api/SmtFeederReplace/QueryByNewFeeder', requestOptions({
		feeder: query,
	}))
}

export function SaveData(data) {
	return request.post('api/SmtFeederReplace/SaveData', {
		updateRecords: [
			data
		]
	}, requestOptions())
}
