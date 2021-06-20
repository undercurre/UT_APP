// import request from '@/utils/request.js'

const host = uni.getStorageSync('host')
const lineList = uni.getStorageSync('lineList')
const currentLine = uni.getStorageSync('currentLine')
const PDA_ID = uni.getStorageSync('PDA_ID')
const globalLoading = uni.getStorageSync('globalLoading')
const voice = uni.getStorageSync('voice')
const WMSHOST = uni.getStorageSync('WMSHOST')
const WMSPORT = uni.getStorageSync('WMSPORT')
const state = {
	host,
	lineList,
	currentLine,
	menuList: [],
	PDA_ID,
	globalLoading,
	voice,
	versionId: '1.0.0',
	WMSHOST,
	WMSPORT
}

const mutations = {
	SET_HOST: (state, host) => {
		state.host = host
		uni.setStorage({
			key: 'host',
			data: host
		})
	},
	SET_LINELIST: (state, list) => {
		state.lineList = list
		uni.setStorage({
			key: 'lineList',
			data: list
		})
	},
	SET_CURRENTLINE: (state, value) => {
		state.currentLine = value
		uni.setStorage({
			key: 'currentLine',
			data: value
		})
	},
	SET_MENULIST: (state, value) => {
		state.menuList = value
	},
	SET_PDA_ID: (state, pdaId) => {
		state.PDA_ID = pdaId
		uni.setStorage({
			key: 'PDA_ID',
			data: pdaId
		})
	},
	SET_GLOBALLOADING: (state, value) => {
		state.globalLoading = value
		uni.setStorage({
			key: 'globalLoading',
			data: value
		})
	},
	SET_VOICE: (state, value) => {
		state.voice = value
		uni.setStorage({
			key: 'voice',
			data: value
		})
	},
	SET_VERSION_ID: (state, value) => {
		state.versionId = value
	},
	SET_WMS_HOST: (state, value) => {
		state.WMSHOST = value
		uni.setStorage({
			key: 'WMSHOST',
			data: value
		})
	},
	SET_WMS_PORT: (state, value) => {
		state.WMSPORT = value
		uni.setStorage({
			key: 'WMSPORT',
			data: value
		})
	}
}

const actions = {
	setHost: ({
		commit
	}, value) => {
		return new Promise((resolve) => {
			commit('SET_HOST', value)
			resolve(value)
		})
	},
	setVoice: ({
		commit
	}, value) => {
		return new Promise((resolve, reject) => {
			commit('SET_VOICE', value)
			resolve(true)
		})
	},
	setWMSService: ({ commit }, {
		HOST = '',
		PORT = ''
	}) => {
		return new Promise(async resolve => {
			// const res = await request.post('System/Login', {
			// 	UserName: 'enzhi.zhou',
			// 	Password: 'any',
			// 	DeviceID: 'enzhi.zhou'
			// })
			
			commit('SET_WMS_HOST', HOST)
			commit('SET_WMS_PORT', PORT)
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
