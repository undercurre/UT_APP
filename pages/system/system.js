import gracePage from '../../graceUI/components/gracePage.vue';
import graceHeader from '../../graceUI/components/graceHeader.vue';
import items from './items.js'
export default {
	data() {
		return {
			list: items
		}
	},
	computed: {
		userName() {
			return this.$store.getters.token
		}
	},
	methods: {
		handleClick(item) {
			if (item.eventType === 'link') {
				this.linkTo(item)
			} else {
				this[item.eventName]()
			}
		},
		linkTo(item) {
			if (item.href) {
				uni.navigateTo({
					url: item.href
				})
			}
		},
		signOut() {
			uni.showModal({
				title: '确认',
				content: '确定要注销当前用户吗？',
				success: async res => {
					if (res.confirm) {
						const result = await this.$store.dispatch('user/logout')
						if (result) {
							this.$voice.vibrate()
							uni.showModal({
								title: '提示',
								content: '用户注销成功!',
								showCancel: false,
								success: _ => {
									if (_.confirm) {
										// 关闭所有页面，打开到应用内的某个页面。
										uni.reLaunch({
											url: '/pages/login/index'
										})
									}
								}
							})
						}
					}
				}
			})
		},
		logout() {
			uni.showModal({
				title: '确认',
				content: '确定要退出系统吗？',
				success: res => {
					if (res.confirm) {
						plus.runtime.quit();
					}
				}
			})
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		}
	},
	components: {
		gracePage,
		graceHeader
	},
	onLoad() {

	},
	onShow() {

	},
	// onBackPress(event) 监听返回按钮的api
	onBackPress() {
		if (this.touchStartTime == 0) {
			this.touchStartTime = new Date().getTime()
			uni.showToast({
				title: '再按一次退出系统',
				icon: 'none'
			})
		} else {
			if (new Date().getTime() - this.touchStartTime <= 300) {
				plus.runtime.quit()
			} else {
				uni.showToast({
					title: '再按一次退出系统',
					icon: 'none'
				})
			}
			this.touchStartTime = 0
		}
		return true // return true的意思是禁止返回到上一个界面
	}
}
