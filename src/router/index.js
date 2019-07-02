import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js';


import Login from 'components/page/login/login' //登录
import MainIndex from 'components/mainIndex' //首页




import Member from 'components/views/member/index'	//会员
import MemberAdd from 'components/views/member/add'	
import MemberDetail from 'components/views/member/detail'
//商品
import Order from 'components/views/order/index'
import OrderAdd from 'components/views/order/add'
import OrderDetail from 'components/views/order/detail'
import GoodAttr from 'components/views/order/goodAttr'
import GoodType from 'components/views/order/goodType'
import Sale from 'components/views/sale/index'	//销售 
//软文
import Article from 'components/views/article/index'	
//户外活动
import Active from 'components/views/active/index'	
	
//售后
import AfterSale from 'components/views/afterSale/index'

//系统
import System from 'components/views/system/index'
import User from 'components/views/user/index'
import Role from 'components/views/role/index'
Vue.use(Router)


let route = [{
		path: '/',
		redirect: 'login'
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '/mainIndex',
		name: 'mainIndex',
		component: MainIndex,
		redirect: '/active/index', //默认跳转页面
		meta: {
			requireAuth: false,
		},
		children: [{
			path: '/member/index',
			name: 'member/index',
			component: Member
		},{
			path: '/member/add',
			name: 'member/add',
			component: MemberAdd
		},{
			path: '/member/detail',
			name: 'member/detail',
			component: MemberDetail
		},{
			path: '/order/index',
			name: 'order/index',
			component: Order
		},{
			path: '/order/add',
			name: 'order/add',
			component: OrderAdd
		},{
			path: '/order/detail',
			name: 'order/detail',
			component: OrderDetail
		},{
			path: '/order/goodAttr',
			name: 'order/goodAttr',
			component: GoodAttr
		},{
			path: '/order/goodType',
			name: 'order/goodType',
			component: GoodType
		},{
			path: '/sale/index',
			name: 'sale/index',
			component: Sale
		},{
			path: '/article/index',
			name: 'article/index',
			component: Article
		},{
			path: '/active/index',
			name: 'active/index',
			component: Active
		},{
			path: '/afterSale/index',
			name: 'afterSale/index',
			component: AfterSale
		},{
			path: '/system/index',
			name: 'system/index',
			component: System
		},{
			path: '/user/index',
			name: 'user/index',
			component: User
		},{
			path: '/role/index',
			name: 'role/index',
			component: Role
		}, ]
	}

]

const routes = new Router({
	routes: route, //加载路由
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

export default routes;
