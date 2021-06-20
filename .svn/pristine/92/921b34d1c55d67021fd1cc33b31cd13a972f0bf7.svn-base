import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function Index() {
	return request.get('api/MesTongsInfo/Index', requestOptions())
}

export function LoadData(query) {
	return request.get('api/MesTongsInfo/LoadData', requestOptions(query))
}

// 领用夹具
export function BorrowTongs({
	TongsID = '',
	UserName = ''
}) {
	return request.post('api/MesTongsInfo/BorrowTongs', {
		TongsID,
		UserName
	}, requestOptions())
}

// 归还夹具
export function EnterStore({
	TongsID = '',
	StoreID = '',
	UserName = ''
}) {
	return request.post('api/MesTongsInfo/EnterStore', {
		TongsID,
		StoreID,
		UserName
	}, requestOptions())
}

export function MesTongsStoreConfigLoadData(query) {
	return request.get('api/MesTongsStoreConfig/LoadData', requestOptions(query))
}

//工装入库
export function AddOrModifySave(data){
	return request.post('api/MesTongsStoreConfig/AddOrModifySave',data, requestOptions())
}

//转储
export function ChangeStore(data){
	return request.post('api/MesTongsInfo/ChangeStore',data, requestOptions())
}

//根据ID获取夹具信息
export function GetTongsById(query){
	return request.get('api/MesTongsInfo/GetTongsById',requestOptions(query))
}

// 根据工单号或产品编号获取夹具信息
export function GetTongsInfoByWoNo(query){
	return request.get('api/MesTongsInfo/GetTongsInfoByWoNo',requestOptions(query))
}