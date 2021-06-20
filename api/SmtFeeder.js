import request from '../utils/request.js'
import store from '../store'
import { requestOptions } from '@/utils/utils.js'

// PDA飞达盘点列表
export function LoadPDAFeederCheckList(query) {
	return request.get('api/SmtFeeder/LoadPDAFeederCheckList', requestOptions(query))
}
// 确认PDA飞达盘点数据
export function AuditFeederCheckData(data) {
	return request.post('api/SmtFeeder/AuditFeederCheckData', data, requestOptions())
}
// 保存PDA飞达盘点数据
export function SavePDAFeederCheckData(data) {
	return request.post('api/SmtFeeder/SavePDAFeederCheckData', data, requestOptions())
}
// 获取飞达盘点明细数据
export function LoadPDAFeederCheckDetailList(query) {
	return request.get('api/SmtFeeder/LoadPDAFeederCheckDetailList', requestOptions(query))
}
// 删除PDA飞达盘点数据记录
export function DeletePDAFeederCheckData(data) {
	return request.post('api/SmtFeeder/DeletePDAFeederCheckData?check_code='+data,'', requestOptions())
}
// 获取需要点检的飞达类型列表
export function LoadPDAFeederCheckInfo(query) {
	return request.get('api/SmtFeeder/LoadPDAFeederCheckInfo?CHECK_USER='+query, requestOptions())
}
// export function LoadPDAFeederCheckInfo(query) {
// 	return request.get('api/SmtFeeder/LoadPDAFeederCheckInfo',{
// 		params: {
// 			CHECK_USER: query
// 		}
// 	})
// }