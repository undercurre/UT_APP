import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Sites(query) {
	return request.get('api/SfcsOperationSites/LoadData', requestOptions(query))
}
// 保存站点
export function SaveSite(data) {
	return request.post('api/AssemblyOperation/SaveSite', data, requestOptions())
}

// 采集数据接口
export function CollectData(data) {
	return request.post('api/AssemblyOperation/CollectData', data, requestOptions())
}

// 获取工单信息

export function GetKanbanWoData(query) {
	return request.get('api/Kanban/GetKanbanWoData', requestOptions(query))
}

//提交无码报工
export function PostToUncodedReport(data) {
	return request.post('api/CollectProducts/PostToUncodedReport', data, requestOptions())
}
// 撤销无码报工
export function ClearUncodedReport(data) {
	return request.post('api/CollectProducts/ClearUncodedReport', data, requestOptions())
}

// 置满接口
export function SetCatonFull(data) {
	return request.post('api/AssemblyOperation/SetCatonFull', data, requestOptions())
}


// 根据id打印任务数据
export function GetPrintDataById(query) {
	return request.get('api/SfcsPrintTasks/GetPrintDataById', requestOptions(query))
}

// lingk栈板作业
export function CollectPalletData(data) {
	return request.post('api/AssemblyOperation/CollectPalletData', data, requestOptions())
}
// 置满lingk栈板作业
export function SetPalletFull(data) {
	return request.post('api/AssemblyOperation/SetPalletFull', data, requestOptions())
}