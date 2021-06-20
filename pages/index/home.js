import gracePage from '@/graceUI/components/gracePage.vue';
import graceHeader from '@/graceUI/components/graceHeader.vue';
import graceFullLoading from '@/graceUI/components/graceFullLoading.vue';
import gridsDataOrigin from './gridsData.js'
import {
	GetRoleMenu
} from '@/api/system.js'
import {
	GetSmtServerList,
	GetMesOperationLines
} from '@/api/system.js'
import * as config from '@/utils/config.js'
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			graceFullLoading: false,
			gridsDataOrigin: [],
			gridsData: [],
			OLIST: [],
			menuList: [],
			menuNode: [],
			menuName: '首页',
			timer: null
		};
	},
	onLoad() {
		const token = this.$store.getters.token
		if (!token) {
			uni.redirectTo({
				url: '/pages/login/index'
			})
			return false
		}
		const currentLine = this.currentLine
		const lineList = this.lineList
		const PDA_ID = this.PDA_ID
		if (!PDA_ID || !lineList || lineList.length === 0 || currentLine === null || currentLine < 0 || !lineList[currentLine]) {
			uni.redirectTo({
				url: '/pages/links/index'
			})
			return false
		}
		this.getSmtList() // 更新线体server_url
		this.gridsDataOrigin = JSON.parse(JSON.stringify(gridsDataOrigin))
		this.gridsData = JSON.parse(JSON.stringify(gridsDataOrigin))
		this.OLIST = JSON.parse(JSON.stringify(gridsDataOrigin))
		this.initMenu()
	},
	computed: {
		...mapState({
			currentLine: state => state.system.currentLine,
			globalLoading: state => state.system.globalLoading,
			lineList: state => state.system.lineList,
			PDA_ID: state => state.system.PDA_ID
		})
	},
	onShow() {
		const globalLoading = this.globalLoading
		if (globalLoading) {
			this.graceFullLoading = true
			this.timer = setTimeout(() => {
				this.graceFullLoading = false
				this.SET_GLOBALLOADING(false)
				clearTimeout(this.timer)
			}, 2000)
		}
	},
	methods: {
		...mapMutations({
			SET_MENULIST: 'system/SET_MENULIST',
			SET_CURRENTLINE: 'system/SET_CURRENTLINE',
			SET_LINELIST: 'system/SET_LINELIST',
			SET_GLOBALLOADING: 'system/SET_GLOBALLOADING'
		}),
		handleMenuClick(item, index) {
			if (item.isDir) {
				this.gridsData = [item]
				this.menuNode.push(index)
				this.menuName = item.name
			
			} else {
				if (item.href) {
					uni.navigateTo({
						url: item.href
					})
				}
			}
		},
		async initMenu() {
			const userInfo = this.$store.getters.userInfo
			const res = await GetRoleMenu(userInfo.roleIDs.join(','))
			if (res.Code === config.SUCCESS_CODE) {
				this.SET_MENULIST(res.Data)
				res.Data.map(item => {
					this.menuList.push(item.FORM_NAME)
				})
			} else {
				this.SET_MENULIST([])
				this.menuList = []
			} // 全量
			this.filtersMenu() // 菜单显示隐藏开关
		},
		filtersMenu() {
			let _this = this
			function getTreeData(data) {
				let arr = []
				data.map(item => {
					if (item.isDir) {
						if (item.child && item.child.length > 0) {
							item.child =  getTreeData(item.child)
						}
						arr.push(item)
					} else {
						if (_this.menuList.indexOf(item.markId) !== -1 || _this.menuList.indexOf(item.markId2) !== -1) { // 兼容写法
							arr.push(item)
						}
					}
				})
				return arr
			}
			const _menu = getTreeData(_this.OLIST)
			let tempMenu = []
			_menu.map(item => {
				if (item.isDir && item.child && item.child.length !== 0) {
					tempMenu.push(item)
				}
				if (!item.isDir) {
					tempMenu.push(item)
				}
			})
			_this.gridsDataOrigin = _this.gridsData = tempMenu
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		backReturn() {
			if (!this.menuNode.length) {
				this.menuName = '首页'
				return false
			}
			const origin = JSON.parse(JSON.stringify(this.OLIST))
			this.menuNode.splice(this.menuNode.length - 1, 1)
			if (this.menuNode.length === 0) {
				this.filtersMenu()
				this.menuName = '首页'
				return false
			}
			let arr = origin
			const xindex = this.menuNode[this.menuNode.length - 1]
			arr = arr[xindex] ? arr[xindex] : [];
			this.menuName = arr ? arr.name : '';
			this.gridsData = arr.child
		},
		async getSmtList() {
			// 拉取smt线体列表
			const res = await Promise.all([
				await GetMesOperationLines(),
				await GetSmtServerList()
			])
			let count = 0
			if (res) {
				res.map(item => {
					if (item.Code === config.SUCCESS_CODE && item.Data) {
						count++
					}
				})
			}
			if (count === 0) {
				const smtList = res[0].Data.concat(res[1].Data)
				let list = smtList
				const lineList = this.lineList
				const currentList = this.currentLine
				const SMTLineID = lineList[currentList].SMT_LINE_ID			
				let flag = false
				list.map((item, index) => {
					if (item.SMT_LINE_ID === parseInt(SMTLineID)) {
						this.SET_CURRENTLINE(index)
						this.SET_LINELIST(list)
						flag = true
					}
				})
				if (flag === false) {
					this.SET_CURRENTLINE(-1)
					this.SET_LINELIST([])
					uni.redirectTo({
						url: '/pages/links/index'
					})
				}
			}
		},
		handleShow(item) {
			if (item.isDir) {
				let child = item.child
				if (child && child.length) {
					child = child.filter(i => {
						if (i.isDir) {
							if (i.child && i.child.length) {
								return true
							} else {
								return false
							}
						} else return true
					})
				}
				if (child.length) {
					return true
				} else {
					return false
				}
			}
			return true
		}
	},
	components: {
		gracePage,
		graceHeader,
		graceFullLoading
	},
	onUnload() {
		clearTimeout(this.timer)
	},
	// onBackPress(event) 监听返回按钮的api
	onBackPress() {
		if (this.menuNode.length > 0) {
			this.backReturn()
			return true
		}
		this.menuName = '首页'
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
