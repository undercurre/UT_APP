import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

// 设备点检首页
export function Index() {
	return request.get('api/SfcsEquipKeep/Index', requestOptions())
}

// 查询列表 搜索按钮对应的处理也是这个方法
export function LoadData(query) {
	return request.get('api/SfcsEquipKeep/LoadData', requestOptions(query))
}

// 查询明细数据
export function LoadDtlData(m_id) {
	return request.get('api/SfcsEquipKeep/LoadDtlData', requestOptions({
		m_id
	}))
}

// 查询主表数据
export function LoadMainData(id) {
	return request.get('api/SfcsEquipKeep/LoadMainData', requestOptions({
		id
	}))
}

// 获取点检配置列表
export function GetKeepConfigData({
	equip_id,
	keep_type
}) {
	return request.get('api/SfcsEquipKeep/GetKeepConfigData', requestOptions({
		equip_id,
		keep_type
	}))
}

// 获取设备状态
export function GetEquipmentStatus(equip_id) {
	return request.get('api/SfcsEquipKeep/GetEquipmentStatus', requestOptions({
		equip_id
	}))
}

// 添加或修改视图
export function AddOrModify(id) {
	return request.get('api/SfcsEquipKeep/AddOrModify', requestOptions({
		id
	}))
}

// 获取设备列表
export function GetEquipmentList() {
	return request.get('api/SfcsEquipKeep/GetEquipmentList', requestOptions())
}

// 查询点检作业图数据
export function LoadSOPData(id) {
	return request.get('api/SfcsEquipKeep/LoadSOPData', requestOptions({
		id
	}))
}

// 保存数据
export function SaveData(data) {
	return request.post('api/SfcsEquipKeep/SaveData', data, requestOptions())
}

// 删除单据
export function Delete(id) {
	return request.post('api/SfcsEquipKeep/Delete', {}, requestOptions({
		id
	}))
}

// 提交审核
export function PostToCheck(data) {
	return request.post('api/SfcsEquipKeep/PostToCheck', data, requestOptions())
}

// 审核
export function CheckBill(data) {
	return request.post('api/SfcsEquipKeep/CheckBill', data, requestOptions())
}

// 拒绝
export function RejectBill(data) {
	return request.post('api/SfcsEquipKeep/RejectBill', data, requestOptions())
}

// 取消审核
export function UnCheckBill(data) {
	return request.post('api/SfcsEquipKeep/UnCheckBill', data, requestOptions())
}
