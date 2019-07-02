/**
 * @全局系统表单配置、验证方法配置、table表格表头配置
 * @by lyj
 * @2019年6月24日18:59:13
 * */

//1:input 2:select 3:cascader 4:textarea 5:picker
/**
 * 会员页面
 */
export const member = {
	queryForm: {
		memberCode: {
			label: "编号",
			error: false,
			model: "",
			modelType: "memberCode",
			prop: "memberCode",
			type: 1,
		},
		name: {
			label: "姓名",
			error: false,
			model: "",
			modelType: "name",
			prop: "name",
			type: 1,
		},
		phone: {
			label: "手机号",
			error: false,
			model: "",
			modelType: "phone",
			prop: "phone",
			type: 1,
		}
	},
	/**
	 * 新增、编辑表单
	 */
	addForms: {
		name: {
			label: "会员姓名",
			error: false,
			model: "",
			modelType: "name",
			prop: "name",
			type: 1,
			rules: [{
				required: true,
				message: '请输入正确的姓名',
				trigger: 'blur'
			}],
			changes: checkName,
			message: "请输入正确的姓名",
		},
		phoneNum: {
			label: "手机号码",
			error: false,
			model: "",
			modelType: "phoneNum",
			prop: "phoneNum",
			type: 1,
			rules: [{
				required: true,
				message: '请输入活动名称',
				trigger: 'blur'
			}],
			changes: telVal,
			message: "请输入正确的11位手机号码",
		},
		idNumber: {
			label: "身份证号码",
			error: false,
			model: "",
			modelType: "idNumber",
			prop: "idNumber",
			type: 1,
			rules: [{
				required: true,
				message: '请输入正确的身份证号',
				trigger: 'blur'
			}],
			changes: checkIdCard,
			message: "请输入正确的身份证号",
		},
		emergPerson: {
			label: "紧急联系人",
			error: false,
			model: "",
			modelType: "emergPerson",
			prop: "emergPerson",
			type: 1,
			rules: [{
				required: true,
				message: '请输入紧急联系人',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入2-20个字以内紧急联系人姓名",
		},
		emergPhone: {
			label: "紧急联系人号码",
			error: false,
			model: "",
			modelType: "emergPhone",
			prop: "emergPhone",
			type: 1,
			rules: [{
				required: true,
				message: '请输入正确的11位紧急联系人电话',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入正确的11位紧急联系人电话",
		},
		address: {
			label: "家庭住址",
			error: false,
			model: "",
			modelType: "address",
			prop: "address",
			type: 1,
			rules: [{
				required: true,
				message: '请输入200字以内的家庭住址',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入200字以内的家庭住址",
		},
		remark: {
			label: "备注",
			error: false,
			model: "",
			modelType: "remark",
			prop: "remark",
			type: 4,
			rules: [{
				required: true,
				message: '请输入200字以内的备注',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入200字以内的备注",
		}
	},
	/**
	 * @列表对象
	 * types：显示数据类型 1.正常数据；2：三元转换数据；3时间过滤
	 * */
	rowsList: {
		name: {
			label: "会员姓名",
			prop: "name",
			types: 1
		},
		phoneNum: {
			label: "联系方式",
			prop: "phoneNum",
			types: 1
		},
		birthdate: {
			label: "生日",
			prop: "birthdate",
			types: 3,
			splits: 10
		},
		idNumber: {
			label: "身份证号码",
			prop: "idNumber",
			types: 1
		},
		gender: {
			label: "会员性别",
			prop: "gender",
			types: 2,
			judge: {
				1: "男",
				2: "女"
			}
		},
		address: {
			label: "家庭住址",
			prop: "address",
			types: 1
		},
		points: {
			label: "积分",
			prop: "points",
			types: 1
		}
	}
}



//商品页面
export const order = {
	queryForm: {
		goodCode: {
			label: "编号",
			error: false,
			model: "",
			modelType: "goodCode",
			prop: "goodCode",
			type: 1,
		},
		goodName: {
			label: "商品名称",
			error: false,
			model: "",
			modelType: "goodName",
			prop: "goodName",
			type: 1,
		},
		categoryCode: {
			label: "商品分类",
			error: false,
			model: "",
			modelType: "categoryCode",
			prop: "categoryCode",
			type: 3,
			publicProps: {
				value: "code",
				label: "name",
				children: "categories"
			},
			array: []
		}
	},
	/**
	 * 新增、编辑表单
	 */
	addForms: {
		name: {
			label: "商品名称",
			error: false,
			model: "",
			modelType: "name",
			prop: "name",
			type: 1,
			rules: [{
				required: true,
				message: '请输入正确的商品名称',
				trigger: 'blur'
			}],
			changes: checkName,
			message: "请输入正确商品名称",
		},
		sort: {
			label: "商品序号",
			error: false,
			model: "",
			modelType: "sort",
			prop: "sort",
			type: 7,
			rules: [{
				required: true,
				message: '请输入序号',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入商品序号"
		},
		price: {
			label: "商品价格",
			error: false,
			model: "",
			modelType: "price",
			prop: "price",
			type: 7,
			rules: [{
				required: true,
				message: '请输入商品价格',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入商品价格",
		},
		memberPrice: {
			label: "会员价格",
			error: false,
			model: "",
			modelType: "memberPrice",
			prop: "memberPrice",
			type: 7,
			rules: [{
				required: true,
				message: '请输入会员价格',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入会员价格",
		},
		points: {
			label: "商品积分",
			error: false,
			model: "",
			modelType: "points",
			prop: "points",
			type: 7,
			rules: [{
				required: true,
				message: '请输入商品积分',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入商品积分",
		},
		categoryCode: {
			label: "商品分类",
			error: false,
			model: "",
			modelType: "categoryCode",
			prop: "categoryCode",
			type: 3,
			rules: [{
				required: true,
				message: '请选择商品分类',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请选择商品分类",
			publicProps: {
				value: "code",
				label: "name",
				children: "categories"
			},
			array: []
		},
		properties:{
			label: "商品属性",
			error: false,
			model: "",
			modelType: "properties",
			prop: "properties",
			type: 11,
			rules: [{
				required: true,
				message: '请输入商品属性',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入商品属性",
		},
		brand: {
			label: "品牌",
			error: false,
			model: "",
			modelType: "brand",
			prop: "brand",
			type: 1,
			rules: [{
				required: true,
				message: '请输入40字以内的品牌名称',
				trigger: 'blur'
			}],
			changes: isNull,
			message: "请输入40字以内的品牌名称",
		},
		descs: {
			label: "详情",
			error: false,
			model: "",
			modelType: "descs",
			prop: "descs",
			type: 10,
			changes: isNull,
			message: "请输入500字以内的详情",
		},
		descPic:{
			label: "详情",
			error: false,
			model: "www.baidu.com",
			modelType: "descPic",
			prop: "descPic",
			type: 9,
		}
	},
	/**
	 * @列表对象
	 * types：显示数据类型 1.正常数据；2：三元转换数据；3时间过滤
	 * */
	rowsList: {
		code: {
			label: "商品编号",
			prop: "code",
			types: 1
		},
		name: {
			label: "商品名称",
			prop: "name",
			types: 1
		},
		price: {
			label: "商品价格",
			prop: "price",
			types: 1
		},
		mPrice: {
			label: "会员价格",
			prop: "mPrice",
			types: 1
		},
		categoryName: {
			label: "商品分类",
			prop: "categoryName",
			types: 1,
		},
		brand: {
			label: "品牌",
			prop: "brand",
			types: 1
		},
		points: {
			label: "兑换积分",
			prop: "points",
			types: 1
		},
		status: {
			label: "状态",
			prop: "status",
			types: 2,
			judge: {
				1: "启用",
				2: "停用"
			}
		}
	}
}



//商品属性
export const goodAttr = {
	queryForm: {
		name: {
			label: "属性名",
			error: false,
			model: "",
			modelType: "name",
			prop: "name",
			type: 1,
		},
		
	},
	/**
	 * 新增、编辑表单
	 */
	addForms: {
		name: {
			label: "会员姓名",
			error: false,
			model: "",
			modelType: "name",
			prop: "name",
			type: 1,
			rules: [{
				required: true,
				message: '请输入正确的姓名',
				trigger: 'blur'
			}],
			changes: checkName,
			message: "请输入正确的姓名",
		}
	},
	/**
	 * @列表对象
	 * types：显示数据类型 1.正常数据；2：三元转换数据；3时间过滤
	 * */
	rowsList: {
		name: {
			label: "属性名",
			prop: "name",
			types: 1
		},
		valueInfo: {
			label: "属性值",
			prop: "valueInfo",
			types: 1
		}
	}
}
//验证方法

/**
 * 非空验证
 */
function isNull(val) {
	if (!val.model) {
		val.error = true
	} else {
		val.error = false
	}
}
/**
 * 身份證
 * */
function checkIdCard(val) {
	let reg =
		/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
	if (!reg.test(val.model) && val.model) {
		val.error = true
	} else {
		val.error = false
	}
}

/**
 * 姓名验证
 */
function checkName(val) {
	console.log(val.model)
	if (val.model == undefined || val.model.length >= 20) {
		val.message = "姓名长度为2-20个字符"
		val.error = true
	} else {
		let reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
		console.log(!reg.test(val.model))
		if (val.model && !reg.test(val.model)) {
			val.error = true
		} else {
			val.error = false
		}
	}
}
/**
 * 电话验证
 * */
function telVal(val) {
	if (val.model && val.model.length == 7 && val.model.indexOf(" ") == -1) {
		callback()
	} else {
		if (val.model && val.model.indexOf(" ") == -1) {
			if (val.model && (!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/).test(val.model))) {
				val.error = true
			} else {
				val.error = false
			}
		} else {
			val.error = true
		}

	}

}
