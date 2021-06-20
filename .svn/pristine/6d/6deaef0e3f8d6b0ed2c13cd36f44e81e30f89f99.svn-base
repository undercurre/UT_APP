import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import graceSelectMenu from '@/graceUI/components/graceSelectMenu.vue';
import {
	GetSmtServerList,
	GetMesOperationLines
} from '@/api/system.js'
import * as config from '@/utils/config.js'
import { mapState, mapMutations } from 'vuex'
import {
	SysConnectPTS
} from '@/api/work.js'
export default {
	data() {
		return {
			selection: false,
			selectionStart: 0,
			selectionEnd: 0,
			PDA_ID: '',
			timer: null
		};
	},
	computed: {
		...mapState({
			lineList: state => state.system.lineList,
			currentLine: state => state.system.currentLine,
			current_version: state => state.system.versionId
		}),
		list() {
			const arr = []
			const lineList = this.lineList || []
			
			lineList.map(item => {
				arr.push(item.LINE_NAME)
			})
			return arr
		},
		listIndex() {
			const index = this.currentLine
			return index === null ? -1 : index
		}
	},
	methods: {
		...mapMutations({
			SET_PDA_ID: 'system/SET_PDA_ID',
			SET_CURRENTLINE: 'system/SET_CURRENTLINE',
			SET_LINELIST: 'system/SET_LINELIST'
			
		}),
		async submitForm(e) {
			const formData = e.detail.value;
			if (this.listIndex < 0 || !this.list[this.listIndex]) {
				uni.showModal({
					title: '提示',
					content: '请选择线体',
					showCancel: false
				})
				return false
			}
			if (!formData.PDA_ID) {
				uni.showModal({
					title: '提示',
					content: '请输入PDA_ID',
					showCancel: false
				})
				return false
			}
			console.log(this.lineList)
			console.log(this.lineList[this.currentLine].SERVICE_URL)
			//this.SysContentOpenPTS()
			this.SET_PDA_ID(formData.PDA_ID)
			this.$voice.success()
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		async SysContentOpenPTS(){
			// TODO 链接监控台
			if (this.lineList[this.currentLine].SERVICE_URL) {
				const res = await SysConnectPTS(this.lineList[this.currentLine].SERVICE_URL)
				console.log(res)
				uni.showModal({
					title: '提示',
					content: JSON.stringify(res),
					showCancel: false
				})
				if (res.Code !== config.SUCCESS_CODE || !res.Data) {
					uni.showModal({
						title: '提示',
						content: res.Msg || '连接监控台失败',
						showCancel: false
					})
					this.$voice.error()
					return false
				}
			}
		},
		picker(e) {
			this.SET_CURRENTLINE(parseInt(e.detail.value))
		},
		async getLineList() {
			const res = await Promise.all([
				await GetSmtServerList(),
				await GetMesOperationLines()
			])
			let count = 0
			if (res) {
				res.map(item => {
					if (item.Code === config.SUCCESS_CODE && item.Data) {
						count++
					}
				})
			}
			if (count !== 2) {
				uni.showModal({
					title: '提示',
					content: res.Msg,
					showCancel: false,
					success: result => {

					}
				})
			} else {
				const data = []
				this.SET_LINELIST(data.concat(res[0].Data, res[1].Data))
				this.SET_CURRENTLINE(-1)
			}
		},
		handleFocus(e) {
			const value = this.PDA_ID
			this.selectionStart = this.selectionEnd = 0
			this.selection = true
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
		graceHeader,
		gracePage,
		graceSelectMenu
	},
	onLoad() {
		this.getLineList()
		this.PDA_ID = this.$store.getters.PDA_ID || Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
	},
	onShow() {
		
	},
	onUnload() {
		
	}
};
