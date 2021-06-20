const getters = {
	token: state => state.user.token,
	X_TOKEN: state => state.user.X_TOKEN,
	host: state => state.system.host,
	loginMsg: state => state.user.userLoginMsg,
	currentLine: state => state.system.currentLine,
	lineList: state => state.system.lineList,
	userInfo: state => state.user.userInfo,
	menuList: state => state.system.menuList,
	PDA_ID: state => state.system.PDA_ID,
	globalLoading: state => state.system.globalLoading,
	password: state => state.user.password,
	WMSPORT: state => state.system.WMSPORT,
	WMSHOST: state => state.system.WMSHOST
}

export default getters
