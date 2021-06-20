import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import toast from './utils/toast.js'
import voice from './utils/voiceTips.js'
import uView from 'uview-ui'
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';


Vue.component('t-table',tTable)
Vue.component('t-th',tTh)
Vue.component('t-tr',tTr)
Vue.component('t-td',tTd)
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$toast = toast
Vue.prototype.$voice = voice
Vue.use(uView)


Vue.filter('formatSolution', function (val) {
  let solution = ""
  switch (val+'') {
    case '0':
      solution = '外部原因'
      break
    case '1':
      solution = '已解决'
      break
    case '2':
      solution = '延期处理'
      break
	case 'null':
		solution = '暂无数据'
		break
    default:
      solution=val
  }
  return solution
})

String.prototype.endWith = function(endStr) {
	var d = this.length - endStr.length;
	return (d >= 0 && this.lastIndexOf(endStr) == d)
}

String.prototype.gblen = function() {
	var len = 0;
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
