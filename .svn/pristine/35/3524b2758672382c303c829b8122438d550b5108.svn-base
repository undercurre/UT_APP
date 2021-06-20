import request from '@/utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/SfcsEquipRepairHead/Index', requestOptions())
}

// 根据设备ID查询对应的维修记录
export function LoadData(query) {
	return request.get('api/SfcsEquipRepairHead/LoadData', requestOptions(query))
}

// 添加或修改视图
export function AddOrModify(query) {
	return request.get('api/SfcsEquipRepairHead/AddOrModify', requestOptions(query))
}

// 保存操作
export function AddOrModifySave(data) {
	return request.post('api/SfcsEquipRepairHead/AddOrModifySave', data, requestOptions())
}

// 删除
export function DeleteOneById(id) {
	return request.post('api/SfcsEquipRepairHead/DeleteOneById', {}, requestOptions({
		id
	}))
}

// 根据设备条件获取设备信息
export function GetEquipmentList(query) {
	return request.get('api/SfcsEquipRepairHead/GetEquipmentList', requestOptions(query))
}

// 根据维修记录获取维修配件信息
export function GetEquipRepairDetail(headId) {
	return request.get('api/SfcsEquipRepairHead/GetEquipRepairDetail', requestOptions({
		headId
	}))
}
