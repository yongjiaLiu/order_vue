export const userStatus = (state,user) =>{
	if(user){
		state.uInfo = user
		state.isLogin = true
		state.token = user.token
	}else{
		sessionStorage.setItem('uInfo',null);
		sessionStorage.setItem('token',"");
		state.uInfo = {}
		state.isLogin = false
		state.token = ''
	}
}

//菜单信息
export const setCurrentMenu = (state,data) =>{
    state.currentMenu = data;
}
//路由加载
export const setRouterNum = (state,data) =>{
    state.routerNum = data;
}
//加载左侧菜单权限
export const setCurrentRouter = (state,data) =>{
    state.currentRouter = data;
}
//增删改查权限控制
export const setPerList = (state,data) =>{
    state.perList = data;
}