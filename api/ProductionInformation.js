import request from '../utils/request.js'
import store from '../store'

export function GetSMTWoInfo({
	lineID = '',
	stationID = ''
}) {
	return request.get('apiSMT/GetSMTWoInfo', {
		params: {
			lineID,
			stationID
		}
	})
}
