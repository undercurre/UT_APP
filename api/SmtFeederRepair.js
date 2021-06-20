import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

// 获取维修结果列表
export function GetResultList() {
	return request.get('api/SmtFeederRepair/GetResultList', requestOptions())
}

// 查询飞达维修信息
export function LoadData(query) {
	return request.get('api/SmtFeederRepair/LoadData', requestOptions({
		feeder: query
	}))
}

// 获取报修飞达列表
export function GetFeeder2RepairList(query) {
	return request.get('api/SmtFeederRepair/GetFeeder2RepairList', requestOptions(query))
}
// 获取根本原因列表
export function GetReasonList(query) {
	return request.get('api/SmtFeederRepair/GetReasonList', requestOptions(query))
}
// 获取损坏部件列表
export function GetDamagePartList(query) {
	return request.get('api/SmtFeederRepair/GetDamagePartList', requestOptions(query))
}
export function SaveData(data) {
	return request.post('api/SmtFeederRepair/SaveData', data, requestOptions())
}

