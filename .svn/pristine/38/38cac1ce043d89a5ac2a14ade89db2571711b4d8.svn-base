import request from '@/utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function LoadRouteConfig(ROUTE_ID) {
	return request.get('api/SfcsRoutes/LoadRouteConfig', requestOptions({
		ROUTE_ID,
		Page: 1,
		Limit: 100
	}))
}

export function Index() {
	return request.get('api/SfcsRoutes/Index', requestOptions())
}

export function ProducLineBegin(data) {
	return request.post('api/MesProductionLinePreparation/ProducLineBegin', data, requestOptions())
}

export function CheckHIReel(data) {
	return request.post('api/MesProductionLinePreparation/CheckHIReel', data, requestOptions())
}

export function ProducLineEnd(data) {
	return request.post('api/MesProductionLinePreparation/ProducLineEnd', data, requestOptions())
}

export function GetWONO(query) {
	return request.get('api/MesProductionLinePreparation/GetWONO', requestOptions(query))
}

// 获取根据出库单号查询出工单号列表
export function GetWoList(wo_code) {
	return request.get('api/SmtWo/GetWoList', requestOptions({
		wo_code
	}))
}

export function GetHiProductList(lineID) {
	return request.get('apiSMT/GetHiProductList', {
		params: {
			lineID
		}
	})
}

export function ProducLineBeginCopy(data) {
	return request.post('api/MesProductionLinePreparation/ProducLineBeginCopy', data, requestOptions())
}
