import Vue from 'vue'
import Vuex from 'vuex'
import *as getters from './getters'
import *as mutations from './mutations'
import *as actions from './actions'


Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 登录token
		uInfo: {},
		token: '',
		isLogin: false,
		routerNum:'',
		isRem:false, //是否记住账号
		currentRouter:[],//当前路由
		perList:[],//增伤改查权限
        currentMenu:sessionStorage.getItem('currentMenu') ? JSON.parse(sessionStorage.getItem('currentMenu')) : {}//菜单信息
	},
	getters,
	mutations,
	actions
});
export default store;
