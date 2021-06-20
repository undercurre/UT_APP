import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SfcsScraperClean/Index', requestOptions())
}

export function LoadData(query) {
	return request.get('api/SfcsScraperClean/LoadScraperData', requestOptions(query))
}

export function LoadGetScraperCleanHistory(query) {
	return request.get('api/SfcsScraperClean/LoadGetScraperCleanHistory', requestOptions(query))
}

export function SaveData(data) {
	return request.post('api/SfcsScraperClean/SaveData', data, requestOptions())
}