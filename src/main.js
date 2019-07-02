// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/css/style.css" //引入默认初始化样式
import "../static/css/common.less" //引入公共CSS样式
// axios
import api from '@/api/index'
import http from 'axios'
// include
import '@/config/include.js';
import 'babel-polyfill'
//echarts
 import echarts from 'echarts'
// 通用store
import store from '@/store/store.js';
import global from './Global'
import BaiduMap from 'vue-baidu-map'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'



if (Number.parseInt == undefined) {
	Number.parseInt = window.parseInt
}
if (Number.parseFloat == undefined) {
	Number.parseFloat = window.parseFloat
}

Vue.use(preview)

// 获取本地用户信息

Vue.prototype.$global = global;
Vue.prototype.$http = http //Axios请求
Vue.prototype.$api = api //api请求文件
Vue.prototype.$store = store


// 关闭生产模式下给出的提示
Vue.config.productionTip = false
Vue.use(BaiduMap, {
	ak: 'AplVi9NY8SNV0vQ7UwMsCzSN5ccQL59w'
})

let uInfo = JSON.parse(sessionStorage.getItem('uInfo')); //登录信息



//判断是否登陆
router.beforeEach((to, from, next) => {
	if (to.matched.length === 0) { //如果未匹配到路由
		from.name ? next({
			name: from.name
		}) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
	} else {
		next(); //如果匹配到正确跳转
	}
	if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
		if (!store.state.isLogin) {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {		
			next()
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
