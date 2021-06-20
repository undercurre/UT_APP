import graceHeader from '../../graceUI/components/graceHeader.vue';
import gracePage from '../../graceUI/components/gracePage.vue';
import { mapState } from 'vuex'
import {
	LoadData
} from '@/api/MesTongsInfo.js'
import {
	ConfirmPDAFeederCheckData,
	SavePDAFeederCheckData,
	AuditFeederCheckData,
	LoadPDAFeederCheckInfo
} from '@/api/MesTongsInfo.js'
export default {
	computed: {
		...mapState({
				userInfo: state => state.user.userInfo
			})
	},
	
	data() {
		return {
			autoFocus: true,
			autoFocusNext: false,
			formlist: {
				Page: 1,
				Limit: 15,
				CODE: '',
				IS_LIKE: 0
			},
			List: []
		 }
	},
	onLoad(e) {
		
	},
	methods: {
		getCateGory(TONGS_TYPE) {
			switch (TONGS_TYPE) {
				case 1:
					return '测试工装';
					break;
				case 2:
					return '烧录工装';
					break;
				case 3:
					return '客户工装';
					break;
				case 4:
					return 'ICT单面针床';
					break;
				case 5:
					return 'ICT单面针床(托盘)';
					break;
				case 6:
					return 'ICT双面针床';
					break;
				case 7:
					return 'ICT双面针床(托盘)';
					break;
				case 8:
					return 'FCT针床';
					break;
				case 9:
					return 'FCT针床(托盘)';
					break;
				default:
					return '';
					break;
			}
		},
		getStatus(STATUS) {
			STATUS = parseInt(STATUS)
			switch (STATUS) {
				case -1:
					return '未注册';
					break;
				case 0:
					return '待入库';
					break;
				case 1:
					return '存储中';
					break;
				case 2:
					return '借出';
					break;
				case 3:
					return '使用中';
					break;
				case 4:
					return '保养中';
					break;
				case 5:
					return '维修中';
					break;
				case 6:
					return '已报废';
					break;
				case 7:
					return '永久借出';
					break;
				default:
					return '';
					break;
			}
		},
		async getLoadData () {
			const res = await LoadData(this.formlist)
			// console.log(res.Result, '===res')
			const data = JSON.parse(res.Result) || []
			console.log(data)
			data&&data.map((item)=>{
				if(item.PRINCIPAL==null)item.PRINCIPAL='' //处理责任人
				if(item.INSPECTION_USER==null)item.INSPECTION_USER='' //处理检验人
				if(item.TONGS_MODEL==null)item.TONGS_MODEL='' //处理型号
				if(item.STORE_NAME==null)item.STORE_NAME='' //储位
			})
			if (this.formlist.Page === 1) {
				console.log(data,'data')
				this.List = data
			} else {
				this.List = this.List.concat(data)
			}
			this.formlist.Page++
			this.List.map(res=>{
				res.TONGS_TYPE = this.getCateGory(res.TONGS_TYPE)
				res.STATUS = this.getStatus(res.STATUS)
			})
		},
		
		getFeida() {
			// if (!this.formlist.CODE) {
			//  	this.$voice.error()
			//  	uni.showModal({
			//  		title: '提示',
			//  		content: '请输入工装编号编号',
			//  		showCancel: false,
			//  		success: _ => {
			//  			if (_.confirm) {
			//  				this.autoFocus = true
			//  			}
			//  		}
			//  	})
			//  	return false
			//  }
			this.formlist.Page = 1
			this.autoFocus = false
			this.getLoadData()
			
		},
	 
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		resetFormData(){
			this.autoFocus=true;
			this.autoFocusNext=false;
			this.formlist={
				Page: 1,
				Limit: 15,
				CODE: '',
				IS_LIKE: 0
			}
			this.List=[];
			this.getLoadData()
			
		}
		 
	},

	components: {
		graceHeader,
		gracePage
	},
	onShow() {
		 this.formlist.Page = 1
		 this.getLoadData()
	},
	onPullDownRefresh() {
		 this.formlist.Page = 1
		 this.List = []
		 this.getLoadData()
	},
	onReachBottom() {
		this.getLoadData()
	}
}