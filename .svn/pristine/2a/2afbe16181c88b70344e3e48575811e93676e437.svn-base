import request from '../utils/request.js'
import {
	requestOptions
} from '@/utils/utils.js'


// 获取工装信息
export function LoadData(query) {
	return request.get('api/MesTongsInfo/LoadData', requestOptions(query))
}

export function AddOrModifySave(data) {
	return request.post('api/MesTongsInfo/AddOrModifySave', data, requestOptions())
}
// 获取呼叫类型
export function CallWindow(query) {
	return request.get('api/SfcsOperationSites/CallWindow', requestOptions(query))
}
// 获取呼叫类型内容
export function GetCallCodeChinese(query) {
	return request.get('api/SfcsOperationSites/GetCallCodeChinese', requestOptions(query))
}
// 呼叫内容保存
export function AddCallRecord(data) {
	return request.post('api/SfcsOperationSites/AddCallRecord', data, requestOptions())
}
// 获取工装上线信息
export function GetTongsSiteByCodeAsync(query) {
	return request.get('api/MesTongsInfo/GetTongsSiteByCodeAsync', requestOptions(query))
}
//工装盘点
// PDA工装盘点列表
export function LoadPDATongsCheckList(query) {
	return request.get('api/MesTongsInfo/LoadPDATongsCheckList', requestOptions(query))
}
// 获取需要点检的工装类型列表
export function LoadPDATongsCheckInfo(query) {
	return request.get('api/MesTongsInfo/LoadPDATongsCheckInfo', requestOptions(query))
}
// 保存PDA工装盘点数据
export function SavePDATongsCheckData(data) {
	return request.post('api/MesTongsInfo/SavePDATongsCheckData', data, requestOptions())
}
// 确认PDA工装盘点数据
export function AuditTongsCheckData(data) {
	return request.post('api/MesTongsInfo/AuditTongsCheckData', data, requestOptions())
}
// 删除PDA工装盘点数据记录
export function DeletePDATongsCheckData(data) {
	return request.post('api/MesTongsInfo/DeletePDATongsCheckData?check_code=' + data, '', requestOptions())
}
// PDA工装验证列表
export function LoadPDATongsValidationList(query) {
	return request.get('api/MesTongsInfo/LoadPDATongsValidationList', requestOptions(query))
}
// 确认PDA工装验证
export function AuditTongsValidationData(data) {
	return request.post('api/MesTongsInfo/AuditTongsValidationData', data, requestOptions())
}
// 获取需要验证的工装类型列表
export function LoadPDATongsValidationInfo(query) {
	return request.get('api/MesTongsInfo/LoadPDATongsValidationInfo', requestOptions(query))
}
// 删除PDA工装验证数据记录
export function DeletePDATongsValidationData(data) {
	return request.post('api/MesTongsInfo/DeletePDATongsValidationData?check_code=' + data, '', requestOptions())
}
// 保养提交
export function PDAMaintain(data) {
	return request.post('api/MesTongsInfo/PDAMaintain', data, requestOptions())
}
// bs保养提交
export function EndMaintain(data) {
	return request.post('api/MesTongsInfo/EndMaintain', data, requestOptions())
}

// 是否保养保养
export function QueryPDATongsValidationBy(data) {
	return request.post('api/MesTongsInfo/QueryPDATongsValidationBy?check_code='+ data.TONGS_BODYMARK+'&hid='+data.hid,'',requestOptions())
}

// MesTongsInfo/GetMaintainItemsData?tongsType=3
export function GetMaintainItemsData(query) {
	return request.get('api/MesTongsInfo/GetMaintainItemsData', requestOptions(query))
}
//开始保养 
export function BeginMaintain(data) {
	return request.post('api/MesTongsInfo/BeginMaintain', data, requestOptions())
}
// 保存PDA工装盘点数据
export function SavePDATongsValidationData(data) {
	return request.post('api/MesTongsInfo/SavePDATongsValidationData', data, requestOptions())
}