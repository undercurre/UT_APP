import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'
// 产品漏刷检查
// export function CartonOmissionCheck(data) {
// 	return request.post('api/SfcsContainerList/CartonOmissionCheck', data, requestOptions())
// }
 export function CartonOmissionCheck(query) {
 	return request.post('api/SfcsContainerList/CartonOmissionCheck?carton_no='+query.carton_no+'&sn='+ query.sn,{},requestOptions())
 }