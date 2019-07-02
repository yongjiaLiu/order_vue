/*
 * Action 类似于 mutation，不同在于：
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 *
 * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
 * 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
 *  actions: {
 *    increment (context) {
 *      context.commit('increment')
 *    }
 *  }
 *  我们会经常会用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
 *  actions: {
 *    increment ({ commit }) { //{ dispatch, commit, state, getters }
 *        commit('increment')
 *    }
 * }
 *
 * Action 通过 store.dispatch 方法触发：
 * store.dispatch('increment')
 *
 * */
export const setToken = ({commit},user) => {
	commit("userStatus",user)
}
//菜单信息
export const currentMenu = ({commit},data) => {
    commit("setCurrentMenu",data)
}
//加载路由
export const setRouter = ({commit},data) => {
    commit("setRouterNum",data)
}

//加载左侧菜单权限
export const currentRouters = ({commit},data) => {
    commit("setCurrentRouter",data)
}
//加载增删改查权限
export const setPerLists = ({commit},data) => {
    commit("setPerList",data)
}