import graceHeader from '@/graceUI/components/graceHeader.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import request from '@/utils/request.js'
import { MES_CS_HOST } from '@/utils/config.js'
export default {
	data() {
		return {
			formData: {
				Host: '',
				PDA_ID: ''
			}
		}
	},
	computed: {
		current_version() {
			return this.$store.state.system.versionId
		}
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			})
		},
		submitForm() {
			const { Host, PDA_ID } = this.formData
			this.$store.commit('system/SET_HOST', Host)
			this.$store.commit('system/SET_PDA_ID', PDA_ID)
			
			request.setConfig(config => {
				config.baseUrl = 'http://' + Host + MES_CS_HOST;
				return config;
			})
			this.$voice.success()
			uni.showModal({
				title: '提示',
				content: '系统设置成功',
				showModal: false,
				success: _ => {
					if (_.confirm) {
						uni.navigateBack({
							delta: 1
						})
					}
				}
			})
		},
		initPage() {
			const Host = this.$store.getters.host
			const PDA_ID = this.$store.getters.PDA_ID
			this.formData = {
				Host,
				PDA_ID
			}
		}
	},
	components: {
		graceHeader,
		gracePage
	},
	onLoad() {
		this.initPage()
	},
	onShow() {
		
	}
}