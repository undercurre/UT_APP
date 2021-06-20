import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

export function GetReelCode(reelStr) {
	return request.get('api/ImsReel/GetReelCode', requestOptions({
		reelStr
	}))
}

export function GetReelInfoViewModel(reelCode) {
	return request.get('api/ImsReel/GetReelInfoViewModel', requestOptions({
		reelCode
	}))
}

export function GetBatchNo() {
	return request.get('api/SmtSolderpasteBatchmapping/GetBatchNo', requestOptions())
}

export function GetLoction(para) {
	return request.get('api/SmtSolderpasteBatchmapping/GetLoction', requestOptions({
		para
	}))
}

export function GetBatchDeatil(bathNo) {
	return request.get('api/SmtSolderpasteBatchmapping/GetBatchDeatil', requestOptions({
		bathNo
	}))
}

export function GetBatchByLoc(loc) {
	return request.get('api/SmtSolderpasteBatchmapping/GetBatchByLoc', requestOptions({
		loc
	}))
}

export function AddResource(data) {
	return request.post('api/SmtSolderpasteBatchmapping/AddResource', data, requestOptions())
}
