import request from '../utils/request.js'
import { requestOptions } from '@/utils/utils.js'

// 烘烤列表使用烘烤标准维护的LoadData方法
export function Index() {
	return request.get('api/SmtMsdRuncard/Index', requestOptions())
}

// 查询数据 搜索按钮对应的处理也是这个方法
export function LoadData(query) {
	return request.get('api/SmtMsdRuncard/LoadData', requestOptions(query))
}

// 輸入料卷编码 测试数据 M200516000043 获取成功就 料卷不能修改(只读),作业区和执行动作 确认按钮可以操作
export function GetMSDInfo(ReelCode) {
	return request.get('api/SmtMsdRuncard/GetMSDInfo', requestOptions({
		ReelCode
	}))
}

// 執行動作 传如下参数 ActionArea(作业区域传ID) ActionAreaType(作业区域传CODE) NewAction(执行动作CODE) MSDBakeRuleID(烘烤标准ID) ReelCode(料卷编号) UserName(用户名字)
export function TakeAction(data) {
	return request.post('api/SmtMsdRuncard/TakeAction', data, requestOptions())
}

// 操作變更
export function MsdActionLookUpChanged({
	newActionID = '',
	partLevelCode = '',
	partThickness = '',
	reelcode = ''
}) {
	return request.get('api/SmtMsdRuncard/MsdActionLookUpChanged', requestOptions({
		newActionID,
		partLevelCode,
		partThickness,
		reelcode
	}))
}

// 保存数据
export function SaveData(data) {
	return request.post('api/SmtMsdRuncard/SaveData', data, requestOptions())
}

// 添加或修改视图
export function AddOrModify() {
	return request.get('api/SmtMsdRuncard/AddOrModify', requestOptions())
}

// 删除
export function DeleteOneById(id) {
	return request.post('api/SmtMsdRuncard/DeleteOneById', {
		id
	}, requestOptions())
}