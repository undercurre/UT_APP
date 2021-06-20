import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import * as config from '../../utils/config.js'
import {
	LoadData,
	AddOrModifySave
} from '@/api/SfcsEquipment.js'
import {
	mapState
} from 'vuex'
export default {
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	data() {
		return {
			NameList: [
				{
					CODE: 0,
					STATUS: '正常'
				},
				{
					CODE: 1,
					STATUS: '闲置'
				},
				{
					CODE: 2,
					STATUS: '待维修'
				},{
					CODE: 3,
					STATUS: '维修中'
				},
				{
					CODE: 4,
					STATUS: '报废'
				}
			],
			NameIndex: -1,
			form: {
				NAME: '',
				CATEGORY_NAME: '',
				MODEL: '',
				USER_PART: -1,
				USER_PART_NAME: "",
				STATION_ID: -1,
				STATION_NAME: '',
				CATEGORY: -1,
				CATEGORY_NAME: ""
			},
			selectionEnd: 0,
			autoFocus: true, // 物料条码
			autoFocusNewLocation: false // 退料数量
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		handlePickeLine(e) {
			console.log(e,'=====')
			this.NameIndex = e.detail.value
			this.form.STATUS = this.NameList[this.NameIndex].CODE
		},
		resetFormData(isVibrate = false) {
			Object.assign(this.$data, this.$options.data(), {
				autoFocus: false
			})
			this.$nextTick(() => {
				this.autoFocus = true
			})
			if (this.isVibrate) {
				this.$voice.vibrate()
			}
		},

		async submitForm() {
			var that = this
			this.autoFocus = this.autoFocusNewLocation = false
			const map = {
				"NAME": {
					"msg": "请输入设备编号",
					"field": "autoFocus"
				},
			}
			try {
				Object.keys(map).forEach(item => {
					if (!this.form[item]) {
						uni.showModal({
							title: '提示',
							content: map[item].msg || '',
							showCancel: false,
							success: _ => {
								if (_.confirm) {
									this[map[item].field] = true
								}
							}
						})
						that.$voice.errro()
						throw Error(map[item].msg)
					}
				})
				this.submitData()
			} catch (e) {

			}
		},
		async submitData() {
			const res = await AddOrModifySave(this.form)
			if (res.Result) {
				this.$voice.success()
				uni.showModal({
					title: '提示',
					content: '保存成功',
					showCancel: false,
					success: _ => {
						if (_.confirm) {
							this.resetFormData()
						}
					}
				})
			} 
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '保存失败',
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		},
		// 获取设备信息
		async getLoadScraperData() {
			if (!this.form.NAME) {
				return
			}
			const res = await LoadData({
				'NAME': this.form.NAME,
				'IS_LIKE': 0
			})
			const data = JSON.parse(res.Result) || []
			if (data.length) {
				this.form = data[0]
				if(this.form.STATUS === 0 || this.form.STATUS ===1){
					this.form.STATUS = 2
					this.NameList.map((item, index) => {
						if (item.CODE === this.form.STATUS) {
							this.NameIndex = index
						}
					})
				} else{
					this.resetFormData()
					uni.showModal({
						title: '提示',
						content: '【'+data[0].NAME+'】' +'设备编号不是正常或闲置状态，不能报修！',
						showCancel: false
					})
					this.$voice.error()
				}
			} else {
				this.resetFormData()
				uni.showModal({
					title: '提示',
					content: '设备编号不存在，请重新输入！',
					showCancel: false
				})
				this.$voice.error()
			}
			if (res.ErrorInfo.Status) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {
						this.autoFocus = true
					}
				})
				return false
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
	}
}
