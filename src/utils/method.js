/*
 * vue全局方法
 */
import Vue from 'vue';
import Moment from 'moment';

// 全局过滤方法
Vue.prototype.moment = Moment;
/**
 * 去掉字符前后中间所有空格
 */
Vue.prototype.Trim = function(str, isGlobal) {
	if (str === null) {
		return false;
	}
	let result;
	result = str.replace(/(^\s+)|(\s+$)/g, '');
	if (isGlobal.toLowerCase() === 'g') {
		result = result.replace(/\s/g, '');
	}
	return result;
};
/**
 * 防重复点击指令
 */
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})
