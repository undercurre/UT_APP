import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SfcsScraperOperat/Index', requestOptions())
}

export function LoadData(scraperNo) {
	return request.get('api/SfcsScraperOperat/LoadScraperData', requestOptions({
		scraperNo
	}))
}

export function SaveData(data) {
	return request.post('api/SfcsScraperOperat/SaveData', data, requestOptions())
}

