/* g = {
    HOST:'http://192.168.1.53:8400'//服务器地址
} */
g = {
	HOST: "http://192.168.1.110:8089", //'http://mumuyx.iok.la', //服务器地址
	sysName: "坦途户外运动-企业运营推广系统平台", //系统名称,
	routerList: [{
		icon: 'el-icon-share',
		index: '/member/index',
		title: '会员管理'
	}, {
		icon: 'el-icon-share',
		index: '/order/index',
		title: '商品管理',
		subs: [{
				index: '/order/index',
				title: ' 商品信息'
			},
			{
				index: '/sale/index',
				title: ' 分销记录'
			},
			{
				index: '/order/goodType',
				title: ' 商品分类'
			},
			{
				index: '/order/goodAttr',
				title: ' 商品属性'
			}
		]
	}, {
		icon: 'el-icon-share',
		index: '/article/index',
		title: '品牌软文'
	}, {
		icon: 'el-icon-share',
		index: '/active/index',
		title: '户外活动'
	}, {
		icon: 'el-icon-share',
		index: '/afterSale/index',
		title: '售后服务'
	}, {
		icon: 'el-icon-share',
		index: '/system/index',
		title: '系统设置',
		subs: [{
				index: '/system/index',
				title: ' 权限管理'
			},
			{
				index: '/role/index',
				title: ' 角色管理'
			},
			{
				index: '/user/index',
				title: ' 用户管理'
			}
		]
	}]
};
