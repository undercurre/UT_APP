import request from '../utils/request.js'
import store from '../store'

// 获取楼层信息
export function GetFloor() {
	return request.get('apiSMT/GetFloor')
}
// 获取楼层线别信息
export function GetLinesByFloor(i) {
	return request.get('apiSMT/GetLinesByFloor',{
		params: {
			floor: i
		}
	})
}
// 获取低水位信息
export function GetLinePlacementByLine(i) {
	return request.get('apiSMT/GetLinePlacementByLine',{
		params: {
			floor: i.floor,
			line_name: i.line_name
		}
	})
}

