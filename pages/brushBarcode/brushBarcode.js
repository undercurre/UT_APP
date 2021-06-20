import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import graceNumberBox from '@/graceUI/components/graceNumberBox.vue';
const graceChecker = require('@/graceUI/jsTools/graceChecker.js');
import {
	IsRuncardExist,
	ScanLostSn
} from '@/api/brushup.js'
import * as config from '@/utils/config.js'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			formData: {
				wo_no: ''
			},
			pingBan_num: 1,
			autoFocus: true,
			sn: '',
			formArr: [],
			form: {
				snList: ''
			},
			scrollHeight: 50,
			msgList: [],
			msgContentHeight: 200
		};
	},
	methods: {
		handleChange(e) {
			this.pingBan_num = e[0];
		},
		async sendTextMsg(e) {
			var that = this
			if (this.pingBan_num <= 0) {
				this.handlePushMsgList(this.formData, '请添加连扳数', 'error')
				this.$voice.error()
				this.formData.wo_no = ''
				return false
			}
			this.sn = this.formData.wo_no
			// 判断是否重复
			var ret = this.formArr.find((v) => {
				return v == this.sn;
			});
			if (ret) {
				this.handlePushMsgList(this.formData, '该条码已经扫描成功，请勿重复扫描!', 'error')
				this.$voice.error()
				return false
			} else {
				const result = await IsRuncardExist(this.sn)
				if (!result.Data) {
					this.handlePushMsgList(this.formData, '条码【' + that.formData.wo_no + '】条码不存在系统中，请核对后再重新扫描!', 'error')
					this.$voice.error()
				} else {
					this.formArr.unshift(this.sn)
				}
				this.formData.wo_no = ''
			}
		},
		async submitForm(e) {
			var that = this
			this.sn = this.formData.wo_no
			this.form.snList = this.formData.wo_no
			if (this.pingBan_num <= 0) {
				this.handlePushMsgList(this.formData, '请添加连扳数', 'error')
				this.$voice.error()
				return false
			}
			// 表单验证
			const rule = [{
				name: 'wo_no',
				checkType: 'notnull',
				errorMsg: '请扫描流水号'
			} ]
			// const checkRes = graceChecker.check(this.formData, rule)
			if (true || checkRes) {
				if (this.formArr.length == 0) {
					this.handlePushMsgList(this.formData, '请先添加条码', 'error')
					this.$voice.error()
					return false
				}
				// 判断拼接是否已满
				if (this.formArr.length == this.pingBan_num) {
					var str = this.formArr.join(',')
					this.form.snList = str
					const res = await ScanLostSn(this.form)
					if (res.Code === config.SUCCESS_CODE) {
						if (res.Data) {
							this.handlePushMsgList(this.formData, '提交成功', 'success')
							this.$voice.success()
							this.formArr = []
						} else {
							this.handlePushMsgList(this.formData, res.Msg || '提交失败', 'error')
							this.$voice.error()
						}
					} else {
						this.handlePushMsgList(this.formData, res.Msg || '提交失败', 'error')
						this.$voice.error()
					}
				} else {
					this.handlePushMsgList(this.formData, '当前拼板数未刷满', 'error')
					this.$voice.error()
				}
			} else {
				this.handlePushMsgList(this.formData, graceChecker.error, 'error')
				this.$voice.error()
			}
		},
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(isVibrate = false) {
			this.formData = {
				wo_no: ''
			}
			this.pingBan_num = 1
			this.msgList = []
			this.formArr = []
			if (isVibrate) this.$voice.vibrate()
		},
		handlePushMsgList(formData, msg, type) {
			this.msgList = []
			this.msgList.push(Object.assign(this.formData || {}, {
				msg: dayjs().format('YYYY-MM-DD HH:mm:ss') + '   ----->   ' + msg,
				type: type
			}))
		}
	},
	components: {
		graceHeader,
		gracePage,
		graceNumberBox
	},
	mounted() {
		// const windowHeight = uni.getSystemInfoSync().windowHeight
		// const selectorQuery = uni.createSelectorQuery()
		// const nodesRef = selectorQuery.select('#myForm')
		// nodesRef.boundingClientRect(res => {
		// 	const formHeight = res.height
		// 	this.scrollHeight = windowHeight - 44 - formHeight - uni.upx2px(180) - uni.upx2px(80)
		// }).exec()
	},
	onShow() {
		uni.getSystemInfo({
			success: _ => {
				const windowHeight = _.windowHeight
				this.msgContentHeight = windowHeight - 44 - uni.upx2px(150) - uni.upx2px(60) - uni.upx2px(200) - uni.upx2px(400)
			}
		})
	}
}
