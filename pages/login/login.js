import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
import graceFlex from "../../graceUI/components/graceFlex.vue";
const graceChecker = require('../../graceUI/jsTools/graceChecker.js');
import {
	login
} from '@/api/login.js';
import {
	GetAllButtonByRoleId
} from '@/api/system.js'
import {
	GetSmtServerUrl
} from '@/api/system.js'
import * as config from '@/utils/config.js'
import {
	mapActions, mapMutations
} from 'vuex'
export default {
	data() {
		return {
			rememberPassword: true,
			formData: {
				Host: '',
				UserName: '',
				Password: ''
			},
			selection: false,
			currentSelection: '',
			selectionStart: 0,
			selectionEnd: 0,
			timer: null
		};
	},
	computed: {
		current_version() {
			return this.$store.state.system.versionId
		}
	},
	methods: {
		...mapActions({
			loginSuccess: 'user/loginSuccess',
			setHost: 'system/setHost'
		}),
		...mapMutations({
			SET_AUTH_BUTTON_LIST: 'user/SET_AUTH_BUTTON_LIST'
		}),
		checkedChange(e) {
			this.rememberPassword = e[0]
		},
		async loginNow(e) {
			// 表单验证
			const rule = [{
					name: 'Host',
					checkType: 'notnull',
					errorMsg: '请输入服务器地址'
				},
				// {
				// 	name: 'Host',
				// 	checkType: 'reg',
				// 	checkRule: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
				// 	errorMsg: '请输入正确的服务器地址'
				// },
				{
					name: 'UserName',
					checkType: 'notnull',
					errorMsg: '请输入账号'
				},
				{
					name: 'Password',
					checkType: 'notnull',
					errorMsg: '请输入密码'
				}
			];
			const formData = e.detail.value;
			const checkRes = graceChecker.check(formData, rule);
			// 验证通过
			// if (checkRes) {
			// 	await this.setHost(formData.Host)
			// 	let token = formData.UserName
			// 	const result = await login(formData)
			// 	if (result.Code === config.SUCCESS_CODE) {
			// 		const userInfo = result.Data
			// 		await this.loginSuccess({
			// 			userInfo,
			// 			token,
			// 			loginMsg: {
			// 				Host: formData.Host,
			// 				UserName: formData.UserName,
			// 				Password: this.rememberPassword ? formData.Password : ''
			// 			}
			// 		})
			// 		const currentLine = this.$store.getters.currentLine
			// 		const lineList = this.$store.getters.lineList
			// 		const PDA_ID = this.$store.getters.PDA_ID					
			// 		this.$voice.success()
			// 		// TODO 额外的逻辑
			// 		if (!PDA_ID || !lineList || lineList.length === 0 || currentLine === null || currentLine < 0 || !lineList[
			// 				currentLine]) {
			// 			uni.redirectTo({
			// 				url: '/pages/links/index'
			// 			})
			// 		} else {
			// 			uni.switchTab({
			// 				url: '/pages/index/index'
			// 			})
			// 		}
			// 	} else {
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: result.Msg,
			// 			showCancel: false
			// 		})
			// 		this.$voice.error()
			// 	}
			// } else {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: graceChecker.error,
			// 		showCancel: false
			// 	})
			// 	this.$voice.error()
			// }
			// TODO #这里是新的逻辑
			if (checkRes) {
				await this.setHost(formData.Host)
				let token = formData.UserName
				const res = await login(formData)
				if (res.ErrorInfo.Status) {
					uni.showModal({
						title: '提示',
						content: res.ErrorInfo.Message || '登录失败',
						showCancel: false
					})
					this.$voice.error()
				} else {
					const _data = res.Result || {}
					_data.Userinfo.roleIDs = [_data.Userinfo.ROLE_ID] // 处理roleIds
					const userInfo = _data.Userinfo
					const X_TOKEN = _data.Token
					await this.loginSuccess({
						userInfo,
						token,
						loginMsg: {
							Host: formData.Host,
							UserName: formData.UserName,
							Password: this.rememberPassword ? formData.Password : ''
						},
						X_TOKEN,
						password: formData.Password
					})
					const xres = await GetAllButtonByRoleId(userInfo.roleIDs[0])
					const btnlist = xres.Result || []
					this.SET_AUTH_BUTTON_LIST(btnlist)
					const currentLine = this.$store.getters.currentLine
					const lineList = this.$store.getters.lineList
					const PDA_ID = this.$store.getters.PDA_ID
					this.$voice.success()
					// TODO 额外的逻辑
					if (!PDA_ID || !lineList || lineList.length === 0 || currentLine === null || currentLine < 0 || !lineList[
							currentLine]) {
						uni.redirectTo({
							url: '/pages/links/index'
						})
					} else {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				}
			} else {
				uni.showModal({
					title: '提示',
					content: graceChecker.error,
					showCancel: false
				})
				this.$voice.error()
			}
		},
		handleFocus(ref, value) {
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
			this.currentSelection = ref
			this.selectionStart = 0
			this.selectionEnd = value ? value.toString().length : 0
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		}
	},
	components: {
		gracePage,
		graceHeader,
		graceCheckBtn,
		graceFlex
	},
	created() {
		const obj = this.$store.getters.loginMsg || {}
		const Host = uni.getStorageSync('host')
		obj.Host = Host ? Host : obj.Host;
		this.formData = JSON.parse(JSON.stringify(obj))
		// this.formData = {
		// 	Host: '172.20.62.3',
		// 	UserName: 'ADMIN',
		// 	Password: 'Admin220'
		// }
	},
	watch: {
		formData: {
			handler(val, oldVal) {
				this.selection = false
			},
			deep: true
		}
	},
	onUnload() {

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
};
