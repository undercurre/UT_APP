import request from '../utils/request.js'
import store from '../store'

// 获取线别列表
export function GetLines() {
	return request.get('apiSMT/GetLines')
}
// 获取机台
export function GetCanBackupStations(i) {
	return request.get('apiSMT/GetCanBackupStations',{
		params: {
			lineID: i
		}
	})
}
// 获取上料信息列表
export function GetLinePlacement(i) {
	return request.get('apiSMT/GetLinePlacement',{
		params: {
			lineID: i.lineID,
			stationID: i.stationID
		}
	})
}

