const token = uni.getStorageSync('token')
const userInfo = uni.getStorageSync('userInfo')
const loginMsg = uni.getStorageSync('loginMsg')
const X_TOKEN = uni.getStorageSync('X_TOKEN')
const password = uni.getStorageSync('password')
const authBtnList = uni.getStorageSync('authBtnList')
const state = {
	token: token,
	userInfo: userInfo,
	userLoginMsg: loginMsg,
	X_TOKEN: X_TOKEN,
	password: password,
	authBtnList: authBtnList
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
		uni.setStorageSync('token', token)
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
	},
	SET_USER_LOGIN_MSG: (state, loginMsg) => {
		state.userLoginMsg = loginMsg
		uni.setStorageSync('loginMsg', loginMsg)
	},
	SET_X_TOKEN: (state, value) => {
		state.X_TOKEN = value
		uni.setStorageSync('X_TOKEN', value)
	},
	SET_PASSWORD: (state, value) => {
		state.password = value
		uni.setStorageSync('password', value)
	},
	SET_AUTH_BUTTON_LIST: (state, value) => {
		const res = value.map(i => {
			return i.Menu_Code
		})
		state.authBtnList = res
		uni.setStorageSync('authBtnList', res)
	}
}

const actions = {
	loginSuccess: ({ commit }, value) => {
		return new Promise(async (resolve, reject) => {
			const {
				userInfo = {},
				token = null,
				loginMsg = {},
				X_TOKEN = null,
				password = null
			} = value
			commit('SET_USERINFO', userInfo)
			commit('SET_TOKEN', token)
			commit('SET_USER_LOGIN_MSG', loginMsg)
			commit('SET_X_TOKEN', X_TOKEN)
			commit('SET_PASSWORD', password)
			resolve(true)
		})
	},
	logout: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit('system/SET_MENULIST', [], { root: true })
			commit('system/SET_LINELIST', null, { root: true })
			commit('system/SET_CURRENTLINE', null, { root: true })
			commit('SET_USERINFO', {})
			commit('SET_TOKEN', '')
			commit('SET_X_TOKEN', '')
			commit('SET_PASSWORD', '')
			commit('SET_AUTH_BUTTON_LIST', [])
			resolve(true)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
