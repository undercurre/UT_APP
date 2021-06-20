import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function LoadData(query) {
	return request.get('api/SmtFeederScrap/LoadData', requestOptions({
		feeder: query
	}))
}

export function SaveData(data) {
	return request.post('api/SmtFeederScrap/SaveData', data, requestOptions())
}

