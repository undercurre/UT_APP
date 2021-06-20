import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SmtFeederMaintain/Index', requestOptions())
}

export function GetFeederInfo(query) {
	return request.get('api/SmtFeederMaintain/GetFeederInfo', requestOptions(query))
}

export function QueryByNewFeeder(query) {
	return request.get('api/SmtFeederMaintain/QueryByNewFeeder', requestOptions({
		feeder: query
	}))
}

export function SaveData(data) {
	return request.post('api/SmtFeederMaintain/SaveData', {
		insertRecords: [
			data
		]
	}, requestOptions())
}

