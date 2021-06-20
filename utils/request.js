// https://ext.dcloud.net.cn/plugin?id=392
import luchRequest from '@/common/luch-request/request.js'
import store from '@/store/index.js'
import { MES_CS_HOST } from '@/utils/config.js'
const host = store.getters.host

// 创建实例
const http = new luchRequest()
// 全局配置
http.setConfig((config) => {
	config.baseUrl = 'http://' + host + MES_CS_HOST;
	config.timeout = 100000;
	config.header = {
		'Content-Type': 'application/json'
	};
	config.sslVerify = false;
	return config
})
// 拦截器
http.interceptor.request((config, cancel) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
	uni.showLoading({
		title: 'loading...'
	})
	// uni.showModal({
	// 	title: 'network',
	// 	content: JSON.stringify(config),
	// 	showCancel: false
	// })
	return config;
})
// 响应器
http.interceptor.response((response) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
	uni.hideLoading()
	const res = response.data
	return Promise.resolve(res)
}, (error) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
	uni.hideLoading()
	if (error.statusCode === 401) {
		uni.showModal({
			title: '异常',
			content: '登录过期，请重新登录',
			showCancel: false,
			success: _ => {
				if (_.confirm) {
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}
			}
		})
	} else if (error.statusCode === 403) {
		uni.showModal({
			title: '异常',
			content: '缺少权限，无法访问',
			showCancel: false
		})
	} else {
		uni.showModal({
			title: '异常',
			content: error.errMsg,
			showCancel: false
		})
	}
	console.log('err: ', error)
	return Promise.reject(error)
})

export default http
