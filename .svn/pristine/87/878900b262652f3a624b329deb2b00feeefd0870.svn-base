import request from '../utils/request.js'
import store from '../store'

// 作业记录
export function GetReelHistory(reelCode) {
	return request.get('apiSMT/GetReelHistory', {
		params: {
			reelCode
		}
	})
}

// 获取料卷信息
export function GetReel(reelCode) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('apiSMT/GetReel', {
		params: {
			userName: token,
			reelCode
		}
	})
}
