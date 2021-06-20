import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'
import store from '../store'

export function GetStenciLOC() {
	return request.get('api/SmtStencilPart/GetStencilLOC', requestOptions())
}

export function TraceStencilFindPartNo({
	stencil_no = '',
	wo_no = '',
	Tag = ''
}) {
	const lineList = store.getters.lineList
	const currentList = store.getters.currentLine
	const PDA_ID = store.getters.PDA_ID
	const token = store.getters.token
	return request.get('apiSMT/TraceStencilFindPartNo', {
		params:{
			stencil_no,
			wo_no,
			Tag,
			userName: token,
			lineId: lineList[currentList].SMT_LINE_ID,
		}
	})
}