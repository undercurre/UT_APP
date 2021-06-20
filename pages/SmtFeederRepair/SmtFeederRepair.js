import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
import uniPagination from "../../common/uni-pagination/uni-pagination.vue"
import {
	mapState,
	mapGetters
} from 'vuex'
import {
	GetResultList,
	LoadData,
	GetFeeder2RepairList,
	GetReasonList,
	GetDamagePartList,
	SaveData
} from '@/api/SmtFeederRepair.js'
export default {
	components: {
		graceHeader,
		gracePage,
		graceBottomDialog,
		uniPagination
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		}),
		...mapGetters([
			'lineList',
			'currentLine'
		])
	},
	data() {
		return {
			form: {
				FEEDER: '', //；料架
				UserName: '', //用户 

				DEFECT_CODE: '', //不良信息(失效代码)
				REPAIR_ITEM: '', //检查项目(维修项目)

				REASON_CODE: '', //根本原因(失效原因)
				DAMAGE_PART: '', //损坏部件
				METHOD: '', //维修方法
				RESULT: '' //维修结果(2 :已修好, 4: 报废)
			},
			autoFocus: true,
			defectCodeList: [],
			defectCodeIndex: -1,

			FeederShow: false,
			Feederform: {
				Page: 1,
				Limit: 10,
				Key: ''
			},
			FeederTable: [],
			totalFeeder: 0,
			ReasonShow: false,
			Reasonform: {
				Page: 1,
				Limit: 10,
				Key: ''
			},
			ReasonTable: [],
			totalReason: 0,
			DamageShow: false,
			Damageform: {
				Page: 1,
				Limit: 10,
				Key: ''
			},
			DamageTable: [],
			totalDamage: 0,
			FeeRepairList: [],
			RepairCountByMonth: 0,
			RepairTotalCount: 0,
			RepairList: []
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 料架
		async feeClick() {
			this.FeederShow = true
			this.getFeederList()
		},
		async getFeederList() {
			const res = await GetFeeder2RepairList(this.Feederform)
			this.FeederTable = res.Result
			this.totalFeeder = res.TotalCount
		},
		// 取消
		closeDialog1: function() {
			this.FeederShow = false;
			this.form.FEEDER = ''
			this.FeeRepairList= []
		},
		// 确定
		confirm1: function() {
			this.FeederShow = false;
		},
		// 搜索
		handleToSearch1() {
			this.Feederform.Page = 1
			this.getFeederList()
		},
		//选中
		ListClick1(e) {
			this.form.FEEDER = e.NAME
			this.feederClick()
		},
		// 分页
		changeReason1(e) {
			this.Feederform.Page = e.current
			this.getFeederList()
		},
        // 根本原因
		ReasonClick() {
			this.ReasonShow = true
			this.getReason()
		},
		async getReason() {
			const res = await GetReasonList(this.Reasonform)
			this.ReasonTable = res.Result
			this.totalReason = res.TotalCount
		},
		// 取消
		closeDialog2: function() {
			this.ReasonShow = false;
			this.form.REASON_CODE = ''
		},
		// 确定
		confirm2: function() {
			this.ReasonShow = false;
		},
		// 搜索
		handleToSearch2() {
			this.Reasonform.Page = 1
			this.getReason()
		},
		//选中
		ListClick2(e) {
			this.form.REASON_CODE = e.NAME
		},
		// 分页
		changeReason2(e) {
			this.Reasonform.Page = e.current
			this.getReason()
		},
		// 损坏部件
		DamageClick() {
			this.DamageShow = true
			this.getDamageList()
		},
		async getDamageList() {
			const res = await GetDamagePartList(this.Damageform)
			this.DamageTable = res.Result
			this.totalDamage = res.TotalCount
		},
		// 取消
		closeDialog3: function() {
			this.DamageShow = false;
			this.form.DAMAGE_PART = ''
		},
		// 确定
		confirm3: function() {
			this.DamageShow = false;
		},
		// 搜索
		handleToSearch3() {
			this.Damageform.Page = 1
			this.getDamageList()
		},
		//选中
		ListClick3(e) {
			this.form.DAMAGE_PART = e.NAME
		},
		// 分页
		changeReason3(e) {
			this.Damageform.Page = e.current
			this.getDamageList()
		},
		
		// 获取修改结果列表
		async GetList() {
			const res = await GetResultList()
			if (res.Result) {
				this.defectCodeList = res.Result
			}
		},
		// 结果选择
		handleChangeDefectCode(e) {
			this.defectCodeIndex = parseInt(e.detail.value)
			this.form.RESULT = this.defectCodeList[this.defectCodeIndex].ID
		},
		async feederClick() {
			const res = await LoadData(this.form.FEEDER)
			if (res.Result) {
				this.FeeRepairList = res.Result.DefectList
				this.RepairCountByMonth = res.Result.RepairCountByMonth
				this.RepairTotalCount = res.Result.RepairTotalCount
				this.RepairList = res.Result.RepairList || []
			}
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message,
					showCancel: false,
					success: _ => {

					}
				})
				this.form.FEEDER = ''
				this.FeeRepairList = ''
				this.RepairCountByMonth = 0
				this.RepairTotalCount = 0
				return false
			}
		},
		//选中维修项目
		FeeRadioClick (e) {
			this.form.DEFECT_CODE=e.CODE
		    this.form.REPAIR_ITEM=e.NAME
		},
		async submitForm() {
			if (!this.form.FEEDER) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入料架',
					showCancel: false
				})
				return false
			}

			if (!this.form.REASON_CODE) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入根本原因',
					showCancel: false
				})
				return false
			}
			if (!this.form.DAMAGE_PART) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入损坏部件',
					showCancel: false
				})
				return false
			}
			if (!this.form.METHOD) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请输入维修方法',
					showCancel: false
				})
				return false
			}
			if (!this.form.RESULT) {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '请选择维修结果',
					showCancel: false
				})
				return false
			}
			this.form.UserName = this.userInfo.USER_NAME
			console.log(this.form, 'this.form')
			const res = await SaveData(this.form)
			if (res.ErrorInfo.Status) {
				uni.showModal({
					title: '提示',
					content: res.ErrorInfo.Message || '保存失败',
					showCancel: false,
					success: _ => {

					}
				})
				this.$voice.error()
				return false
			}
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
			} else {
				this.$voice.error()
				uni.showModal({
					title: '提示',
					content: '保存失败',
					showCancel: false,
					success: _ => {
						if (_.confirm) {

						}
					}
				})
			}
		},
		// 清空
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
			this.RepairCountByMonth = 0
			this.RepairTotalCount = 0
			this.GetList()
		},
	},
	onLoad() {
		this.GetList()
	}
}
