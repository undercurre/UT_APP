import luchRequest from '@/common/luch-request/request.js'

// 创建实例
const http = new luchRequest()

// 拦截器
http.interceptor.request((config, cancel) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
	uni.showLoading({
		title: 'loading...'
	})
	return config;
})
// 响应器
http.interceptor.response((response) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
	uni.hideLoading()
	const res = response.data
	return Promise.resolve(res)
}, (error) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
	uni.hideLoading()

	return function (callBakc) { // 统一异常处理
		uni.showModal({
			title: '提示',
			content: error.data || error.errMsg || '请求异常',
			showCancel: false,
			success: _ => {
				if (_.confirm) {
					callBakc(error)
				}
			}
		})
	}
})

export default http
