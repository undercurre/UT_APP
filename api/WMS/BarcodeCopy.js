import request from '@/utils/requestWMS.js'
import { requestOptionsWMS } from '@/utils/utils.js'

export function ParseBarcodes(barcodeString) {
	return request.get('Receive/ParseBarcodes', requestOptionsWMS({
		barcodeString
	}))
}

export function GetPartVendorList(partNo) {
	return request.get('Barcode/GetPartVendorList', requestOptionsWMS({
		partNo
	}))
}

export function DoCreateAndSaveBcd(params) {
	return request.post('Barcode/CreateAndSaveBcd', params, requestOptionsWMS())
}
