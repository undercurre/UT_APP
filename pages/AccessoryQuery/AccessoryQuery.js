import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import {
	GetSmtResourceWarm,
	GetSmtResourceUse
} from '@/api/AccessoryQuery'
export default {
	name: 'AccessoryQuery',
	components: {
		graceHeader,
		gracePage
	},
	data() {
		return {
			subsection: [{
				name: '回温中'
			}, {
				name: '使用中'
			}],
			currentSubsection: 0,
			mainTable: [],
			mainTable1: [],
			tableHeight: 200
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleChangeSubsection(index) {
			this.currentSubsection = index
			this.getLoadData()
		},
		getLoadData() {
			if (this.currentSubsection === 0) {
				this.GetSmtResourceWarm()
			} else {
				this.GetSmtResourceUse()
			}
		},
		async GetSmtResourceWarm() {
			const res = await GetSmtResourceWarm()
			this.mainTable = (res.Result || []).sort((a, b) => {
				return parseFloat(a.Warm_Time) - parseFloat(b.Warm_Time)
			}).reverse().map(i => {
				i.Warm_Time_H = Math.floor((parseFloat(i.Warm_Time) / 60) * 100) / 100
				return i
			})
			console.log(this.mainTable)
		},
		async GetSmtResourceUse() {
			const res = await GetSmtResourceUse()
			this.mainTable1 = (res.Result || []).sort((a, b) => {
				return parseFloat(a.USED_Time) - parseFloat(b.USED_Time)
			}).reverse().map(i => {
				i.USED_Time_H = Math.floor((parseFloat(i.USED_Time) / 60) * 100) / 100
				return i
			})
		}
	},
	onLoad() {
		this.getLoadData()
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.tableHeight = windowHeight - 44 - uni.upx2px(150)
			}
		})
	}
}