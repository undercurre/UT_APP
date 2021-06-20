import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

//部件解绑 物料条码  操作人ID 操作人 站点 
export function SfcsCollectTComponents(barCode,rework_Operation_ID,rework_Operator,rework_Operation_Site='') {
	return request.get('api/SimpleSOPRoutes/SfcsCollectTComponents',requestOptions({barCode,rework_Operation_ID,rework_Operator,rework_Operation_Site}))
}