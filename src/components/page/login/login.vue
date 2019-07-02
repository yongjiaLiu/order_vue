<template>
	<div class="login-wrap" style="position: absolute">
		<div class="ms-login">
			<div class="left">

			</div>
			<div class="right">
				<div class="login-form">
					<a class="welcomeLogin">欢迎登录</a>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
						<el-form-item prop="account">
							<el-input v-model="ruleForm.account" placeholder="请输入用户名" ref="navbar" prefix-icon="icon_peo" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="text" placeholder="请输入密码" v-model="ruleForm.password" prefix-icon="icon_psd" ref="navbar1"
							 onfocus="this.type='password'" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="isRem">记住账号</el-checkbox>
						</el-form-item>
						<el-form-item class="login-btn">
							<el-button type="" @click="submitForm('ruleForm')">登 录</el-button>
						</el-form-item>
					</el-form>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				ruleForm: {
					account: JSON.parse(localStorage.getItem('account')) || "",
					password: ""
				},
				isRem: false,
				rules: {
					account: [{
							required: true,
							message: "请输入用户名",
							trigger: "blur"
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
				},
			};
		},
		created() {
			if (JSON.parse(localStorage.getItem('account'))) {
				this.isRem = true
			}
			if (JSON.parse(sessionStorage.getItem('routerNum'))) {
				sessionStorage.setItem('routerNum', null)
				this.$store.dispatch('setRouter', null);
				this.$router.go(0)
			}
		},
		watch: {
			'isRem': {
				deep: true,
				handler: function(val, old) {
					if (val) {
						localStorage.setItem('account', JSON.stringify(this.ruleForm.account))
					} else {
						localStorage.removeItem('account')
					}
				}
			},
			'ruleForm.account': {
				deep: true,
				handler: function(val, old) {
					if (this.isRem) {
						localStorage.setItem('account', JSON.stringify(val))
					} else {
						localStorage.removeItem('account')
					}
				}
			}
		},
		methods: {
			submitForm(formName) {
				console.log(formName)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.add()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			add() {
				var that = this;
				var data = this.ruleForm
				var url = "/login";				
				sessionStorage.setItem('uInfo', JSON.stringify(data));
				this.$store.dispatch('setToken', data);
				that.$router.push("/mainIndex");
				this.$message({
					type: 'success',
					message: '登录成功'
				})
				/* that.$api.post(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.roleArr(res.data.mapList, res)
					} else {
						this.$message.error(res.message);
					}
				}); */
			},
		}
	};
</script>

<style lang="less">
	.i-logo {
		width: 34px;
		height: 38px;
		display: inline-block;
		margin-right: 2%;
		position: relative;
		left: -2%;
		top: 9px;
		background: url(../../../../static/img/logo.png) no-repeat center;
		background-size: 100% 100%;
	}

	// 	.hidden{
	// 		display: none;
	// 	}
	.login-wrap {
		display: flex;
		width: 100%;
		height: 100%;
/* 		background: url(../../../../static/img/login/sm_login_bg.png) no-repeat center; */
		background-size: 100% 100%;
		align-items: center;
		/*垂直居中*/
		justify-content: center;
		/*水平居中*/
	}

	@media only screen and (max-width: 1466px) {
		.login-wrap {
			display: flex;
			width: 100%;
			height: 100%;
		/* 	background: url(../../../../static/img/login/login-bg.png) no-repeat center; */
			background-size: 100% 100%;
			align-items: center;
			/*垂直居中*/
			justify-content: center;
			/*水平居中*/
		}

		.ms-login {
			margin-top: 54px;
		}
	}

	.el-form {
		width: 100%;
	}

	.ms-login {
		display: flex;
		width: 958px;
		height: 420px;
		background: #fff;
		// 		animation: first 4s;
		// 		-webkit-animation: first 4s;
	}

	.left {
		width: 55%;
		background: url(../../../../static/img/login/login-left.png) no-repeat center;
		background-size: 80% 70%;
		height: 100%;
		margin-right: 5%;
	}

	.right {
		width: 40%;
		height: 100%;
	}

	.login-form {
		height: 70%;
		margin-top: 16%;
		border-left: 1px solid #dcdcdc;
		padding: 10px 20%;

		.el-checkbox__label {
			color: #cdcdcd !important;
			border-bottom: 1px solid #e6e6e6 !important;
		}

		.el-input__inner {
			border: none;
			border-bottom: 1px solid #E6E6E6;
		}

	}

	.welcomeLogin {
		display: block;
		width: 100%;
		color: #6a7ffe;
		font-size: 14px;
		line-height: 30px;
		margin-top: 5%;
		margin-bottom: 1%;
	}


	@keyframes first() {
		0% {
			background: red;
			left: 0px;
			top: 0px;
			width: 0;
			height: 0;
			opacity: 0;
		}

		100% {
			background: #FFFFFF;
			left: 14%;
			top: 25%;
			width: 958px;
			height: 432px;
			opacity: 0.6;
			transform: rotateX(360deg);
			-webkit-transform: rotateX(360deg);
		}
	}

	@-webkit-keyframes first

	/* Safari and Chrome */
		{
		0% {
			background: red;
			left: 0px;
			top: 0px;
			width: 0;
			height: 0;
		}

		100% {
			background: #FFFFFF;
			left: 14%;
			top: 25%;
			width: 958px;
			height: 432px;
			transform: rotateX(360deg);
			-webkit-transform: rotateX(360deg);
		}
	}

	.login-btn {
		text-align: left;
	}

	.login-btn button {
		width: 100%;
		height: 36px;
		background-image: linear-gradient(90deg,
			#8399ff 0%,
			#ad96ff 100%),
			linear-gradient(#6a7ffe,
			#6a7ffe);
		background-blend-mode: normal,
			normal;
		border-radius: 18px;
		color: #FFF;
		letter-spacing: 12px;
		font-size: 14px;
	}

	.login-btn button:hover {
		color: #FFF;
	}

	.icon_peo {
		display: inline-block;
		position: relative;
		top: 12px;
		left: 0;
		width: 16px !important;
		height: 16px !important;
		background: url(../../../../static/img/login/icon_peo.png) no-repeat center;
		background-size: 100% 100%;
	}

	.icon_psd {
		display: inline-block;
		position: relative;
		top: 12px;
		left: 0;
		width: 16px !important;
		height: 16px !important;
		background: url(../../../../static/img/login/icon_psd.png) no-repeat center;
		background-size: 100% 100%;
	}
</style>
