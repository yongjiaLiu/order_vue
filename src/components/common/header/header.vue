<template>
	<div class="header">
		<div class="header-left">
			<img src="static/img/logo.jpg" />
			<div class="header-title">
				<p>{{$global.sysName}}</p>
				<p></p>
			</div>
		</div>

		<div class="header-right">
			<img src="static/img/user_icon.png">
			<p>{{$store.state.uInfo.fullName}}</p>
			<el-dropdown trigger="click">
				<div class="out-login-icon">
					<img src="static/img/out-login.png">
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="centerDialogVisible = true">修改密码</el-dropdown-item>
					<el-dropdown-item divided @click.native="loginout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<div>
				<el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="40%" center>
					<el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
						<el-form-item label="旧密码" prop="oldPassWord">
							<el-input type="password" v-model="form.oldPassWord" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="新密码" prop="newPassWord">
							<el-input type="password" v-model="form.newPassWord" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认新密码" prop="affirmNewPassWord">
							<el-input type="password" v-model="form.affirmNewPassWord" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="centerDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="submitForm('form')">确 定</el-button>
					</span>
				</el-dialog>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value !== this.form.newPassWord) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				centerDialogVisible: false,
				userName: JSON.parse(sessionStorage.getItem('uInfo')).userName,
				form: {
					userId: JSON.parse(sessionStorage.getItem('uInfo')).userId,
					oldPassWord: '',
					newPassWord: '',
					affirmNewPassWord: ''
				},
				rules: {
					oldPassWord: [{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					}, {
						min: 6,
						max: 40,
						message: '长度在 6 到 40 个字符',
						trigger: 'blur'
					}],
					newPassWord: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}, {
						min: 6,
						max: 40,
						message: '长度在 6 到 40 个字符',
						trigger: 'blur'
					}],
					affirmNewPassWord: [{
						validator: validatePass,
						trigger: 'blur'
					}, {
						required: true,
						message: '请输入确认新密码',
						trigger: 'blur'
					}, {
						min: 6,
						max: 40,
						message: '长度在 6 到 40 个字符',
						trigger: 'blur'
					}],
				}
			};
		},
		watch: {
			centerDialogVisible: {
				deep: true,
				handler: function(val, old) {
					if (!val) {
						this.$refs['form'].resetFields(); //重置表单
						this.$refs['form'].clearValidate(); //重置验证
					}
				}
			}
		},
		methods: {
			//修改密码
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var data = this.form;
						var url = "/user/editPwd";
						this.$api.put(url, data).then((res) => {
							if (res.ret == true) {
								this.centerDialogVisible = false;
								this.$message({
									message: '修改密码成功，请重新登录',
									type: 'success'
								});
								sessionStorage.removeItem("uInfo");
								this.$store.dispatch('setRouter', null);
								this.$store.dispatch('setToken', null)
								this.$store.dispatch('currentMenu', null)
								this.$router.push("/welcome")
							} else {
								this.$message.error(res.message || res.msg);
							}
						});

					} else {
						return false;
					}
				});
			},
			//退出登录
			loginout() {
				let that = this;
				var url = "/loginOut"
				var data = {

				}
				that.$api.post(url, data).then((res) => {
					if (res.ret == true) {
						that.$message({
							message: '您已退出登录',
							type: 'success'
						});
						sessionStorage.removeItem("uInfo");
						this.$store.dispatch('setRouter', null);
						this.$store.dispatch('setToken', null)
						this.$store.dispatch('currentMenu', null)
						this.$router.push("/welcome")
					}
				});

			},
		}
	};
</script>
<style scoped lang="less">
	.header {
		background: #FFF;
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 55px;
		font-size: 22px;
		color: #6a7ffe;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-left {
			display: flex;
			margin-left: 38px;

			.header-title {
				text-align: left;
				margin-left: 29px;

				p:nth-child(1) {
					font-size: 18px;
				}

				p:nth-child(2) {
					font-size: 7px;
					margin-top: -2px;
				}
			}

			img {
				width: 35px;
				height: 39px;
			}
		}
	}

	.header-right {
		display: flex;
		align-items: center;

		img {
			width: 22px;
			height: 22px;
			margin-right: 12px;
		}

		p {
			font-size: 14px;
			margin-right: 22px;
		}

		.out-login-icon {
			width: 70px;
			height: 30px;
			border-left: 1px solid #6a7ffe;
			text-align: center;
			cursor: pointer;

			img {
				width: 19px;
				height: 19px;
				margin-top: 5px;
			}
		}
	}
</style>
