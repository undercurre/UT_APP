import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'
// 查询料架配置数据
export function LoadConfigData() {
	return request.get('api/MesPartShelf/LoadConfigData', requestOptions())
}
// 获取工装信息
// export function LoadData(query) {
// 	return request.get('api/MesTongsInfo/LoadData', requestOptions(query))
// }

//保存
export function SaveData(data){
	return request.post('api/MesPartShelf/SaveData',data, requestOptions())
}

// 获取生产领料信息
export function GetPickingListData(query) {
	return request.get('api/MesPartShelf/GetPickingListData', requestOptions(query))
}
// 核对物料保存
export function CheckPickingByReelCode(data){
	return request.post('api/MesPartShelf/CheckPickingByReelCode',data, requestOptions())
}

// 获取生产领料信息明细
export function LoadPartCheckDetailData(query) {
	return request.get('api/MesPartShelf/LoadPartCheckDetailData', requestOptions(query))
}

// 删除
export function DeleteOneById(id){
	return request.post('api/MesPartShelf/DeleteOneById',{}, requestOptions({id}))
}

// MesPartShelf/GetShelfByWONO
// 通过工单获取物料储位
export function GetShelfByWONO(query) {
	return request.get('api/MesPartShelf/GetShelfByWONO', requestOptions(query))
}
// 将仓库物料条码与备料间的储位信息进行绑定(完成)
// MesPartShelf/LoadData
// 查询上下架情况 搜索按钮对应的处理也是这个方法
export function LoadData(query) {
	return request.get('api/MesPartShelf/LoadData', requestOptions(query))
}

//辅料库存 条码切分
export function ReelCodeSplitEx(query){
	return request.post('api/MesPartShelf/LoadData',query, requestOptions())
}