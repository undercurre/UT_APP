import request from '../utils/request.js'
import store from '../store'
import { requestOptions } from '@/utils/utils.js'
// 获取条码信息
export function GetBarCodeData(barCode,apiStatus=true) {
	return request.get('apiSMT/GetBarCodeData', {
		params: {
			barCode,
			apiStatus
		}
	})
}
export function ReelCodeSplitEx(query) {
	return request.post('api/MesPartTempWarehouse/ReelCodeSplitEx',query, requestOptions())
}

// 拆分条码
export function SnCodeUpdateBar({
	oldBarcode = '',
	newBarcode = '',
	original_qty = 0
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.post('apiSMT/SnCodeUpdateBar', {
		user: token,
		oldBarcode,
		newBarcode,
		original_qty
	})
}