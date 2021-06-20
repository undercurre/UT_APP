<script>
// 引入检查更新模块
// #ifdef APP-PLUS
import { checkUpdater } from '@/common/checkUpdater';
// #endif
export default {
	onLaunch: function() { // App启动调用一次
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
		// 检查更新，参数：{ 当前版本号，跳转到更新页面的url }		
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			var cur_ver = inf.version;
			this.$store.commit('system/SET_VERSION_ID', cur_ver)
			checkUpdater(cur_ver, '/pages/update/index');
		})
		// h5+ 特有 也只有在uni-app编译模式下才生效
		// #endif
	},
	onShow: function() {
		
		
	},
	onHide: function() {
		
	}
};
</script>

<style lang="scss">
	// @import "uview-ui/index.scss";
@import './graceUI/graceUI.css';
@import './graceUI/graceIcons.css';
.color-black {
	color: #333333;
}
.color-red {
	color: #ff0036;
}
.grace-title {
	color: #333333;
}
.mycsub .u-item-bg {
	height: calc(100% - 6px)!important;
}
/* #ifdef APP-PLUS */
.pageInation .uni-pagination{
	position: relative;
	left: 8%;
}
/* #endif */

.tableNull{
	line-height: 300rpx;
}
</style>
