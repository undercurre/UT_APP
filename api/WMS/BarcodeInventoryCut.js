import request from '@/utils/requestWMS.js'
import { requestOptionsWMS } from '@/utils/utils.js'

export function FormatBarcode(boxCode) {
	return request.get('System/FormatBarcode', requestOptionsWMS({
		boxCode,
		bcdType: 0
	}))
}

export function GetReelInfoByReelCode(reelCode) {
	return request.get('Manager/GetReelInfoByReelCode', requestOptionsWMS({
		reelCode
	}))
}

export function SplitStock(params) {
	return request.get('Manager/SplitStock', requestOptionsWMS(params))
}

export function GetReel(barcode) {
	return request.get('Barcode/GetReel', requestOptionsWMS({
		bcd: barcode
	}))
}
