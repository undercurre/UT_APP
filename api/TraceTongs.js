import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

//获取工位
export function SfcsOperationSites(query) {
	return request.get('api/SfcsOperationSites/LoadData',requestOptions(query))
}

// 获取工装信息
export function LoadData(query) {
	return request.get('api/MesTongsInfo/LoadData', requestOptions(query))
}

export function TraceTongs(data) {
	return request.post('apiSMT/TraceTongs', data)
}

