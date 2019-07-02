/* 工具类 */
/**
 * @summary 根据时间及格式获取时间的字符串
 * @param {int} iDate 时间
 * @param {string} sFormat 格式，默认：yyyy-MM-dd HH:mm:ss
 * @return {string} 格式化后的日期字符串
 * @example
 *    formatDate(new Date(),'yyyy-MM-dd HH:mm:ss SSS');// 2017-6-6 11:11:11
 */
export const formatDate = (iDate, sFormat = 'yyyy-MM-dd HH:mm:ss') => {
	if (!iDate) {
		return '';
	}
	let dDate = new Date(iDate);
	let year = dDate.getFullYear(); // 年
	let month = dDate.getMonth() + 1; // 月
	if (month < 10) {
		month = '0' + month;
	}
	let date = dDate.getDate(); // 日
	if (date < 10) {
		date = '0' + date;
	}
	let hour = dDate.getHours(); // 时
	if (hour < 10) {
		hour = '0' + hour;
	}
	let minute = dDate.getMinutes(); // 分
	if (minute < 10) {
		minute = '0' + minute;
	}
	let second = dDate.getSeconds(); // 秒
	if (second < 10) {
		second = '0' + second;
	}
	let millisecond = dDate.getMilliseconds(); // 毫秒
	if (sFormat.indexOf('yyyy') >= 0) {
		sFormat = sFormat.replace('yyyy', year + '');
	}
	if (sFormat.indexOf('MM') >= 0) {
		sFormat = sFormat.replace('MM', month + '');
	}
	if (sFormat.indexOf('dd') >= 0) {
		sFormat = sFormat.replace('dd', date + '');
	}
	if (sFormat.indexOf('HH') >= 0) {
		sFormat = sFormat.replace('HH', hour + '');
	}
	if (sFormat.indexOf('mm') >= 0) {
		sFormat = sFormat.replace('mm', minute + '');
	}
	if (sFormat.indexOf('ss') >= 0) {
		sFormat = sFormat.replace('ss', second + '');
	}
	if (sFormat.indexOf('SSS') >= 0) {
		sFormat = sFormat.replace('SSS', millisecond + '');
	}
	return sFormat;
};
/**
 * @summary 设置cookie
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {int} expires 保存时间(单位:小时)
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 */
export const setCookie = (name, value, expires, path, domain, secure) => {
	let str = name + '=' + encodeURIComponent(value);
	if (expires > 0) {
		let date = new Date();
		date.setTime(date.getTime() + expires * 3600 * 1000);
		str += ';expires=' + date.toGMTString();
	} else {
		let date = new Date();
		date.setTime(date.getTime() + expires * 3600 * 1000);
		str += ';expires=' + date.toGMTString();
	}
	if (path) {
		str += ';path=' + path;
	}
	if (domain) {
		str += ';domain=' + domain;
	}
	if (secure) {
		str += ';secure=' + secure;
	}
	document.cookie = str;
};
/**
 * @summary 读取cookie
 * @param {string} name cookie名称
 * @retrun {string} value cookie值
 * @example
 */
export const getCookie = (name) => {
	let start = document.cookie.indexOf(name + '=');
	if ((!start) && (name !== document.cookie.substring(0, name.length))) {
		return '';
	}
	if (start === -1) {
		return '';
	}
	let len = start + name.length + 1;
	let end = document.cookie.indexOf(';', len);
	if (end === -1) {
		end = document.cookie.length;
	}
	return decodeURIComponent(document.cookie.substring(len, end));
};
/**
 * 字符长度自动加入换行符
 * str 字符
 * n		多少个字换行
 */
export function insertEnter(str, n) {
	var len = str.length;
	var strTemp = '';
	if (len > n) {
		strTemp = str.substring(0, n);
		str = str.substring(n, len);
		return strTemp + '\n' + insertEnter(str, n);
	} else {
		return str;
	}
}
