import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceSelectMenu from '../../graceUI/components/graceSelectMenu.vue';
import {
	GetFloor,
	GetLinesByFloor,
	GetLinePlacementByLine
} from '../../api/waterLevel.js'
export default {
	data() {
		return {
			floorolist: [],
			flooroIndex: -1,
			Lineolist: [],
			listIndex: -1,
			scrollLeft: 0,
			tableData: [],
			formData: {
				floor: '',
				line_name: ''
			},
			scrollHeight: 30,
			scrollTop: 0
		}
	},
	onLoad() {
		this.GetFloor()
		this.GetLinesByFloor(this.formData.floor)
		// this._GetLinePlacementByLine()
		let that = this
		uni.getSystemInfo({
			success(res) {
				const windowHeight = res.windowHeight
				that.scrollHeight = windowHeight - uni.upx2px(30) - 44 - uni.upx2px(160) - uni.upx2px(195) - uni.upx2px(10)
			}
		})
	},
	//定义过滤器
	filters: {
		IsNull(value) {
			if (value == null || value == undefined) {
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
		flooroClick(e) {
			this.flooroIndex = e.detail.value;
			this.floorolist.map((i, v) => {
				if (this.flooroIndex == v) {
					this.formData.floor = i
				}
			})
			this.GetLinesByFloor(this.formData.floor)
		},
		LineoClick(e) {
			if (this.formData.floor == '') {
				uni.showModal({
					title: '提示',
					content: '请先选择楼层',
					showCancel: false
				})
				this.$voice.vibrate()
			} else {
				this.listIndex = e.detail.value;
				this.Lineolist.map((i, v) => {
					if (this.listIndex == v) {
						this.formData.line_name = i
					}
				})
			}
		},
		// 获取楼层信息
		async GetFloor() {
			const result = await GetFloor()
			const arr = []
			const lineList = result.Data || []
			lineList.map(item => {
				arr.push(item.LOCATION)
			})
			this.floorolist = arr
		},
		// 获取楼层线别信息
		async GetLinesByFloor(itme) {
			const result = await GetLinesByFloor(itme)
			const arr = []
			const lineList = result.Data || []
			lineList.map(item => {
				arr.push(item.LINE_NAME)
			})
			this.Lineolist = arr
		},
		// 获取低水位信息
		async _GetLinePlacementByLine() {
			const result = await GetLinePlacementByLine(this.formData);
			this.tableData = result.Data;
		},
		// 搜索
		async searchoClick() {
			const result = await GetLinePlacementByLine(this.formData);
			this.tableData = result.Data;
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
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	}
}
