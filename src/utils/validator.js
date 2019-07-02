// 邮箱验证
export const checkEmail = (rule, value, callback) => {
  if (value) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(value)) {
      callback(new Error('邮箱格式填写错误'));
    } else {
      callback();
    }
  }
  callback()
}
// 电话手机号码验证 可以为空
export const checkTelOrNull = (rule, value, callback) => {
    if(!value){
        callback()
    } else if(value &&value.length == 7 && value.indexOf(" ") == -1){
        callback()
    }else{
        if (value && value.indexOf(" ") == -1) {
            if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/).test(value))) {
                callback(new Error('请输入正确的联系电话'))
            } else {
                callback()
            }
        } else {
            callback(new Error('请输入正确的联系电话'))
        }

    }

}

// 电话手机号码验证
export const checkTel = (rule, value, callback) => {
    if(value &&value.length == 7 && value.indexOf(" ") == -1){
        callback()
    }else{
        if (value && value.indexOf(" ") == -1) {
            if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/).test(value))) {
                callback(new Error('请输入正确的联系电话'))
            } else {
                callback()
            }
        } else {
            callback(new Error('请输入正确的联系电话'))
        }

    }

}
/**
 * 判断正整数 不能为0
 */
export const checkPositiveInteger = (rule, value, callback) => {
  var re = /^[1-9]\d*$/;
  if (value && !re.test(value)) {
    return callback(new Error('请输入正整数'));
  }
  callback();
}
/**
 * 手机号码验证
 */
export const checkPhone = (rule, value, callback) => {
  let reg = /^1\d{10}$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入11位手机号'));
  } else {
    callback();
  }
}
/**
 * 身份证号码验证
 */
export const checkIdCard = (rule, value, callback) => {
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
    if (value && !reg.test(value)) {
        callback(new Error('请输入正确身份证号'));
    } else {
        callback();
    }
}
/**
 * 姓名验证
 */
export const checkName = (rule, value, callback) => {
	console.log(value)
  let reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
  if (value && !reg.test(value)) {
    callback(new Error('格式验证有误...'));
  } else {
    callback();
  }
}
/**
 * 非零验证
 */
export const checkVal = (rule, value, callback) => {
    if ((!value) || (value==0)) {
        callback(new Error());
    } else {
        callback();
    }
}
