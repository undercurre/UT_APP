import {
	MES_BS_HOST
} from '@/utils/config'

import store from '@/store'
import * as config from '../utils/config.js'

/**
 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
 * @param {String} ov
 * @param {String} nv
 * @return {Boolean} 
 */
function compareVersion(ov, nv) {
	if (!ov || !nv || ov == "" || nv == "") {
		return false;
	}
	var b = false,
		ova = ov.split(".", 4),
		nva = nv.split(".", 4);
	for (var i = 0; i < ova.length && i < nva.length; i++) {
		var so = ova[i],
			no = parseInt(so),
			sn = nva[i],
			nn = parseInt(sn);
		if (nn > no || sn.length > so.length) {
			return true;
		} else if (nn < no) {
			return false;
		}
	}
	if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
		return true;
	}
}

export function checkUpdater(currentId, updaterPage) {
	const host = store.getters.host
	const cur_url = 'http://' + host + MES_BS_HOST + '/api/PADUpgrade/GetUpgradeInfo'
	if (!host) {
		return false
	}
	uni.request({
		url: cur_url,
		method: 'GET',
		data: {},
		success: res => {
			if (res.statusCode === 200) {
				console.log(JSON.stringify(res))
				let response = res.data
				if (!response.ErrorInfo.Status) {
					response = response.Result
					const srvVer = response.Version
					const note = response.Note
					const app_url = response.Url
					console.log(srvVer, app_url, currentId)
					if (!srvVer) {
						console.log('当前没有发行版本')
					} else if (compareVersion(currentId, srvVer)) {
						console.log('检测到更新')
						uni.showModal({
							title: '发现新版本',
							content: '有新版本可用 (版本:' + srvVer + ')，请问您是否更新？',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: updaterPage
									})
								} else if (res.cancel) {
									console.log('取消')
								}
							}
						})
					} else {
						console.log('现在是最新版本')
					}
				} else {
					// TODO 错误处理
				}
			} else {
				// TODO 异常处理
			}
		}
	})
}
