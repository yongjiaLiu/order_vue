// 全局过滤器
import Vue from 'vue';
import Moment from 'moment';
/*
 * 取数字后两位小数
*/
Vue.filter('towPointFilter', function (value) {
  if (!isNaN(value)) {
    value = parseFloat(value).toFixed(2);
  }
  return value;
});
//过长截取
Vue.filter('toLongFilter', function (value) {
    if (value&&(value.length>15)) {
        value = value.substr(0,15)+'...';
    }
    return value;
});
Vue.filter('fmTenThousand', function (numer, decimal, currency) {
  if (isNaN(numer)) { return numer; }
  if (numer < 10000) { return numer; }
  if (!currency) {
    if (numer >= 10000 && numer < 1000000) {
      currency = '万';
      numer = Math.round((numer / 10000) * 100) / 100;
    } else if (numer >= 1000000 && numer < 10000000) {
      currency = '百万';
      numer = Math.round((numer / 1000000) * 100) / 100;
    } else if (numer >= 10000000 && numer < 100000000) {
      currency = '千万';
      numer = Math.round((numer / 10000000) * 100) / 100;
    } else if (numer >= 100000000) {
      currency = '亿';
      numer = Math.round((numer / 100000000) * 100) / 100;
    }
  }
  numer = numer + currency;
  return numer;
});
/*
 * 时间过滤
*/
Vue.filter('moment', function (date, format) {
  if (!date) {
    return '';
  }
  format = format || 'YYYY-MM-DD';
  return Moment(date).format(format);
});
/*
 * 菜单标题过滤
*/
Vue.filter('sidebarTitle', function (title) {
  if (title.includes('-')) {
    return title.slice(0, title.indexOf('-'));
  } else {
    return title;
  }
});
/*
 * 性别转码
*/
Vue.filter('sex', function (type) {
  const arrData = {
    '0': '未知的性别',
    '1': '男性',
    '2': '女性',
    '9': '未说明的性别'
  }
  return arrData[type];
});

/*
 * 民族转码
*/
Vue.filter('national', function (type) {
  const arrData = {
    '01': '汉族',
    '02': '蒙古族',
    '03': '回族',
    '04': '藏族',
    '05': '维吾尔族',
    '06': '苗族',
    '07': '彝族',
    '08': '壮族',
    '09': '布依族',
    '10': '朝鲜族',
    '11': '满族',
    '12': '侗族',
    '13': '瑶族',
    '14': '白族',
    '15': '土家族',
    '16': '哈尼族',
    '17': '哈萨克族',
    '18': '傣族',
    '19': '黎族',
    '20': '傈僳族',
    '21': '佤族',
    '22': '畲族',
    '23': '高山族',
    '24': '拉祜族',
    '25': '水族',
    '26': '东乡族',
    '27': '纳西族',
    '28': '景颇族',
    '29': '柯尔克孜族',
    '30': '土族',
    '31': '达斡尔族',
    '32': '仫佬族',
    '33': '羌族',
    '34': '布朗族',
    '35': '撒拉族',
    '36': '毛南族',
    '37': '仡佬族',
    '38': '锡伯族',
    '39': '阿昌族',
    '40': '普米族',
    '41': '塔吉克族',
    '42': '怒族',
    '43': '乌孜别克族',
    '44': '俄罗斯族',
    '45': '鄂温克族',
    '46': '德昴族',
    '47': '保安族',
    '48': '裕固族',
    '49': '京族',
    '50': '塔塔尔族',
    '51': '独龙族',
    '52': '鄂伦春族',
    '53': '赫哲族',
    '54': '门巴族',
    '55': '珞巴族',
    '56': '基诺族'
  }
  return arrData[type];
});
/*
 * 职业转码
*/
Vue.filter('professional', function (type) {
  const arrData = {
    '11': '国家公务员',
    '13': '专业技术人员',
    '17': '职员',
    '21': '企业管理人员',
    '24': '工人',
    '27': '农民',
    '31': '学生',
    '37': '现役军人',
    '51': '自由职业者',
    '54': '个体经营者',
    '70': '无业人员',
    '80': '退(离)休人员',
    '90': '其他'
  }
  return arrData[type];
});
/*
 * 婚姻转码
*/
Vue.filter('marriage', function (type) {
  const arrData = {
    '10': '未婚',
    '20': '已婚',
    '21': '初婚',
    '22': '再婚',
    '23': '复婚',
    '30': '丧偶',
    '40': '离婚',
    '90': '未说明的婚姻状况'
  }
  return arrData[type];
});

