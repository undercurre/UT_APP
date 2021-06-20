import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function GetReelCode(reelStr) {
	return request.get('api/ImsReel/GetReelCode', requestOptions({
		reelStr
	}))
}

export function GetResourceRuncardView(reelCode) {
	return request.get('api/SmtSolderpasteBatchmapping/GetResourceRuncardView', requestOptions({
		reelCode
	}))
}

export function GetResourceRouteOperationView(resourceId) {
	return request.get('api/SmtSolderpasteBatchmapping/GetResourceRouteOperationView', requestOptions({
		resourceId
	}))
}

export function ProcessResourceFinish(data) {
	return request.post('api/SmtSolderpasteBatchmapping/ProcessResourceFinish', data, requestOptions())
}

export function ProcessResourceGiveOut(data) {
	return request.post('api/SmtSolderpasteBatchmapping/ProcessResourceGiveOut', data, requestOptions())
}

export function ProcessResourceRuncard(data) {
	return request.post('api/SmtSolderpasteBatchmapping/ProcessResourceRuncard', data, requestOptions())
}
