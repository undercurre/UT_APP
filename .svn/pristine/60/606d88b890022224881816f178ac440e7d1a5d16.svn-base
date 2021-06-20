import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'


// 获取设备信息
export function LoadData(query) {
	return request.get('api/SfcsEquipment/LoadData', requestOptions(query))
}

export function AddOrModifySave(data) {
	return request.post('api/SfcsEquipment/AddOrModifySave', data,requestOptions())
}

// 设备盘点
// 列表
export function LoadPDAEquipmentCheckList(query) {
	return request.get('api/SfcsEquipment/LoadPDAEquipmentCheckList', requestOptions(query))
}
// 审核
export function AuditEquipmentCheckData(data) {
	return request.post('api/SfcsEquipment/AuditEquipmentCheckData', data,requestOptions())
}
// 删除
export function DeletePDAEquipmentCheckData(data) {
	return request.post('api/SfcsEquipment/DeletePDAEquipmentCheckData?check_code='+ data, data,requestOptions())
}
export function SavePDAEquipmentCheckData(data) {
	return request.post('api/SfcsEquipment/SavePDAEquipmentCheckData', data,requestOptions())
}
// 获取需要点检的设备类型列表
export function LoadPDAEquipmentCheckInfo(query) {
	return request.get('api/SfcsEquipment/LoadPDAEquipmentCheckInfo', requestOptions(query))
}

// 设备保养
// PDA设备验证列表
export function LoadPDAEquipmentValidationList(query) {
	return request.get('api/SfcsEquipment/LoadPDAEquipmentValidationList', requestOptions(query))
}
// 确认PDA设备验证
export function AuditEquipmentValidationData(data) {
	return request.post('api/SfcsEquipment/AuditEquipmentValidationData', data,requestOptions())
}
// 删除PDA设备验证数据记录
export function DeletePDAEquipmentValidationData(data) {
	return request.post('api/SfcsEquipment/DeletePDAEquipmentValidationData?check_code='+ data, data,requestOptions())
}
// 获取需要验证的设备类型列表
export function LoadPDAEquipmentValidationInfo(query) {
	return request.get('api/SfcsEquipment/LoadPDAEquipmentValidationInfo', requestOptions(query))
}
// 保存PDA设备验证数据
export function SavePDAEquipmentValidationData(data) {
	return request.post('api/SfcsEquipment/SavePDAEquipmentValidationData', data,requestOptions())
}
// 查设备是否已经保养 true 为已经保养
// 保存PDA设备验证数据
export function QueryPDAEquipmentValidationBy(data) {
	return request.post('api/SfcsEquipment/QueryPDAEquipmentValidationBy', data,requestOptions())
}