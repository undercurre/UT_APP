
import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceSelectMenu from '../../graceUI/components/graceSelectMenu.vue';
import {
	GetLines,
	GetCanBackupStations,
	GetLinePlacement
} from '../../api/charging.js'
export default {
	data() {
		return {
			LineoData: [],
			Lineolist: [],
			LineoIndex: -1,
			
			MachineData: [],
			Machinelist: [],
			MachineIndex: -1,
			
			scrollLeft : 0,
			tableData: [],
			formData: {
				lineID: '',
				stationID: ''
			},
			scrollHeight: 50,
		}
	},
	onLoad() {
		let that = this
		this.GetLines()
		// this.getinitial()
		uni.getSystemInfo({
			success(res) {
				const windowHeight = res.windowHeight
				that.scrollHeight = windowHeight - uni.upx2px(30) - 44 - uni.upx2px(160) - uni.upx2px(195) - uni.upx2px(10)
			}
		})
	},
	onShow() {
		
	},
	//定义过滤器
	filters:{
		IsNull(value){
			if(value == null || value == undefined){
				return ''
			}
			return value
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		LineClick(e) {
			this.LineoIndex = e.detail.value
			this.LineoData.map((i, v) =>{
				if(this.LineoIndex == v) {
					this.formData.lineID = i.ID
				}
			})
			this.GetCanBackupStations(this.formData.lineID)
		},
		MachineClick(e) {
			if(this.formData.lineID == ''){
				uni.showModal({
					title: '提示',
					content: '请先选择线别',
					showCancel: false
				})
				this.$voice.vibrate()
			} else {
				this.MachineIndex = e.detail.value
				this.MachineData.map((i, v) =>{
					if(this.MachineIndex == v) {
						this.formData.stationID = i.ID
					}
				})
			}
		},
		// 初始数据
		async getinitial() {
			const result = await GetLines()
			if(result.Data) {
				this.formData.lineID = result.Data[0].ID
				const res = await GetCanBackupStations(result.Data[0].ID)
				this.formData.stationID = res.Data.pop().ID
				this.GetCanBackupStations(this.formData.lineID)
				this.searchoClick()
			}
		},
		// 获取线别列表
		async GetLines() {
			const result = await GetLines()
			const arr = []
		    const lineList = result.Data || []
			lineList.map(item => {
				arr.push(item.LINE_NAME)
			})
			this.LineoData = result.Data
			this.Lineolist = arr
		},
        // 获取机台
		async GetCanBackupStations(itme) {
			const result = await GetCanBackupStations(itme)
			const arr = []
			const lineList = result.Data || []
			lineList.map(item => {
				arr.push(item.SMT_NAME)
			})
			this.Machinelist = arr
			this.MachineData = result.Data
		},
		// 搜索 上料信息列表
		async searchoClick() {
			if (this.formData.lineID == '') {
				uni.showModal({
					title: '提示',
					content: '请选择线别',
					showCancel: false
				})
				return false
			}
			if (this.formData.stationID == '') {
				uni.showModal({
					title: '提示',
					content: '请选择机台',
					showCancel: false
				})
				return false
			}
			const result = await GetLinePlacement(this.formData)
			this.tableData = result.Data
		},
		scroll(e) {
		   this.scrollLeft = e.detail.scrollLeft;
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceSelectMenu
	},

}

