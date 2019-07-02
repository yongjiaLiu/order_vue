<template>
	<div class="container-table">
		<el-form class="searchFrame" label-width="100px" ref="searchForm" :model="searchForm">
			<el-row>
				<el-col :span='8'>
					<el-form-item label="所属人员:" prop="suborPerson">
						<el-input size="medium" v-model="searchForm.suborPerson" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='8'>
					<el-form-item label="账号:" prop="account">
						<el-input size="medium" v-model="searchForm.account" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='8'>
					<el-form-item label="所属角色:" prop="suborRole">
						<el-select v-model="searchForm.suborRole" placeholder="请选择" size="medium" class="on_col">
							<el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='8'>
					<el-form-item label="所属机构:">
						<el-cascader :options="relList" v-model="orgValues" expand-trigger="hover" :props="defaultProps" @change="handleItemChanges"
						 class="on_col" filterable change-on-select>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :span='8'>
					<el-form-item >
						
					</el-form-item>
				</el-col>
				<el-col :span='8'>
					<el-form-item class="item-right">
						<el-button :loading="sLoading" icon="el-icon-search" type="primary" @click="search('searchForm')" size="small">查询</el-button>
						<el-button icon="el-icon-refresh" size="small" @click="resetForm('searchForm')">重置</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="parting-line"></div>
		<div class="bg-white">
			<el-row type="flex" justify="end">
				<el-col :span='12'>
					<div class="item-right">
						<el-button icon="el-icon-circle-plus" type="primary" @click="openModel" size="small" v-show="$store.state.perList.indexOf(2)!=-1">新增用户</el-button>
						<el-button icon="el-icon-delete" size="small" @click="delets" v-show="$store.state.perList.indexOf(4)!=-1">删除</el-button>
					</div>
				</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" stripe style="width: 100%" v-loading="sLoading" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="account" label="账号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="suborPerson" label="所属人员" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="suborRole" label="所属角色" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="type" label="账号类型">
					<template slot-scope="scope">
						<span>{{scope.row.type==1?'单位用户':'个人用户'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="suborOrganization" label="所属机构" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="suborDuty" label="所属职务" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="" label="操作" align="center" width="200px" class-name="operate" v-if="$store.state.perList.indexOf(3)!=-1">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit-outline" @click="editModel(scope.row.userId)">编辑</el-button>
						<el-button type="text" icon="el-icon-setting" @click="reset(scope.row.userId)">重置密码</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="block page-div">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
			 :page-sizes="[1,10, 20, 30, 40]" :page-size="pageNum" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
			</el-pagination>
		</div>
		<el-dialog :title="modelTitle" :visible.sync="dialogVisible" width="40%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="addform" :model="addform" status-icon label-width="100px" :rules="addRules">
					<div class="return">
						<el-radio-group v-model="addform.type" :disabled="isdisabled">
							<el-radio-button label="1">单位用户</el-radio-button>
							<el-radio-button label="2">个人用户</el-radio-button>
						</el-radio-group>
					</div>
					<el-form-item label="设置账号:" prop="account">
						<el-input v-model.trim="addform.account" :disabled="isdisabled" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item :label="role" prop="roleId">
						<el-select v-model="addform.roleId" placeholder="请选择角色" size="medium" filterable class="on_col">
							<el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="relate" prop="relateId">
						<el-cascader :options="relList" v-model="orgValue" class="on_col" :props="defaultProps" filterable @change="handleItemChange"
						 change-on-select>
						</el-cascader>
					</el-form-item>
					<el-form-item label="所属人员:" v-show="addform.type==2" prop="personsId">
						<el-select v-model="personsId" placeholder="请选择人员" size="medium" filterable class="on_col" @change="sitRelate">
							<el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属职务:" v-show="addform.type==2">
						<el-input v-model="job" :disabled="true"></el-input>
					</el-form-item>
					<div class="return">
						<el-button type="primary" v-preventReClick="3000" @click="submits('addform')">确 定</el-button>
						<el-button @click="dialogVisible = false">取 消</el-button>
					</div>
				</el-form>
			</div>

		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			var isNull = (rule, value, callback) => { //自定义机构验证
				if (this.orgValue.length == 0) {
					callback(new Error('请设置机构'));
				} else {
					callback();
				}
			};
			var vilPeo = (rule, value, callback) => { //自定义所属人员验证
				if (!this.personsId&&this.addform.type==2) {
					callback(new Error('请设置所属人员'));
				} else {
					callback();
				}
			};
			return {
				sLoading: false, //搜索按钮loading
				addLoading: false, //是否显示loading
				dialogVisible: false,
				searchForm: {
					suborPerson: '',
					account: '',
					suborRole: '',
					suborOrganization: ''
				},
				roleList: [],
				orgList: [],
				tableData: [],
				currentPage: 1,
				pageNum: 10,
				pageIndex: 1,
				selectedValue: '',
				isdisabled: false,
				totalPage: 0,
				addform: { //新增用户表单
					type: '1',
					account: '',
					roleId: '',
					relateId: ''
				},
				personsId: '',
				userId: '',
				orgValue: [],
				orgValues: [],
				personList: [], //人员集合
				job: '',
				relList: [], //组织机构list
				defaultProps: { //级联选择器配置
					value: 'id',
					label: 'name',
					children: 'organModels'
				},
				options: [],
				modelTitle: '新增用户',
				relate: '设置机构:',
				role: '设置角色:',
				addRules: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					],
					roleId: [{
						required: true,
						message: '请选择角色',
						trigger: 'blur'
					}],
					relateId: [{
						required: true,
						validator: isNull,
						trigger: 'blur'
					}],
					personsId: [{
						required: true,
						validator: vilPeo,
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getRoleList() //加载所属觉色
			this.search() //搜索
		},
		mounted() {
			this.getOrg() // 加载组织机构
		},
		watch: {
			"addform.type": {
				deep: true,
				handler: function(newVal, oldVal) {
					let that = this;
					that.sitLabel()
				}
			},
			dialogVisible: {
				deep: true,
				handler: function(val, old) {
					if (!val) {
						let that = this;
						that.personsId = "";
						that.job = "";
						that.orgValue = []
						that.$refs['addform'].resetFields(); //重置表单
						that.$refs['addform'].clearValidate(); //重置验证
					}
				}
			}
		},
		methods: {
			setJob() {
				let that = this;
				let url = "/persons/getOrganAndDuty";
				var data = {
					type: that.addform.type,
					id: that.addform.relateId
				}
				that.$api.get(url, data).then((res) => {
					if (res.ret == true) {
						if (that.addform.type == 2) {
							that.job = res.data.dutyName; //设置职业
							var arr = [];
							if (res.data.parentId != 0) {
								arr.push(res.data.parentId);
							}
							arr.push(res.data.organId);
							that.getPerList(res.data.organId)
							that.orgValue = arr; //设置所属个人
							that.personsId = that.addform.relateId;
						} else {
							var arr = [];
							arr.push(res.data.parentId);
							arr.push(that.addform.relateId);
							that.orgValue = arr //设置所属个人
						}
						console.log(that.orgValue)
					}
				});
			},
			getPerList(i) { //根据组织id获取人员列表
				let that = this;
				let url = "/persons";
				var data = {
					organId: i
				}
				that.$api.get(url, data).then((res) => {
					if (res.ret == true) {
						that.personList = res.data
					}
				});
			},
			sitRelate(i) { //设置机构id及所属职务
				let that = this;
				that.addform.relateId = i;
				let url = "/persons/getOrganAndDuty";
				var data = {
					type: 2,
					id: that.addform.relateId
				}
				that.$api.get(url, data).then((res) => {
					if (res.ret == true) {
							that.job = res.data.dutyName; //设置职业
						
					}
				});
			},
			//搜索
			search() {
				let that = this;
				var data = that.searchForm;
				this.sLoading = true;
				var url = "/user/pageIndex/" + that.pageIndex + "/pageNum/" + that.pageNum;
				that.$api.get(url, data).then((res) => {
					if (res.ret == true) {
						if (res.data.totalPage < res.data.currentPage && res.data.totalPage != 0) {
							that.pageIndex = 1;
							that.search()
						}
						this.sLoading = false;
						that.tableData = res.data.list;
						that.totalPage = res.data.totalCount;
						that.currentPage = res.data.currentPage
					}
				});
			},
			resetForm(formName) { //重置
				this.$refs[formName].resetFields();
				this.orgValues = [];
				this.searchForm.suborOrganization = ""
				this.search()
			},
			handleSizeChange(val) {
				let that = this;
				that.pageNum = val;
				that.search()
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				let that = this;
				that.pageIndex = val;
				that.search()
				console.log(`当前页: ${val}`);
			},
			//打开新增模态框
			openModel() {
				let that = this;
				that.dialogVisible = true;
				that.modelTitle = "新增用户";
				that.isdisabled = false;
				that.addform = {
					type: '1',
					account: '',
					roleId: ''
				}
			},
			sitLabel() { //修改模态框中角色机构label值
				let that = this;
				that.relate = that.addform.type == 1 ? '设置机构:' : '所属机构:';
				that.role = that.addform.type == 1 ? '设置角色:' : '所属角色:'
			},
			editModel(id) { //根据id查询用户信息
				let that = this;
				var url = "/user/userId/" + id;
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.dialogVisible = true;
						this.isdisabled = true;
						that.addform.userId = res.data.userId;
						that.addform.roleId = res.data.roleId;
						that.addform.relateId = res.data.relateId;
						that.addform.type = res.data.type;
						that.addform.account = res.data.account;
						that.setJob()
						that.modelTitle = "编辑用户"
					}
				});
			},
			reset(id) { //重置密码
				let that = this;
				that.$confirm('新密码重置为666666, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = "/user/resetPwd";
					var data = {
						userId: id
					}
					that.$api.put(url, data).then((res) => {
						if (res.ret) {
							that.$message({
								message: '密码重置成功',
								type: 'success'
							});
							that.search()
						} else {
							that.$message.error(res.message);
						}
					});
				}).catch(() => {
					that.$refs.multipleTable.clearSelection();
					that.$message('操作已取消');
				});
			},
			handleSelectionChange(val) { //当前选中数据
				let that = this;
				var delArr = [];
				val.forEach(function(value, index, val) {
					delArr.push(value.userId);
				});
				that.selectedValue = delArr.join(',');
			},
			delets() { //删除已选中用户
				let that = this;
				if (!that.selectedValue) {
					that.$message({
						message: '请选择需要删除的角色',
						type: 'warning'
					});
				} else {
					that.$confirm('此操作将永久删除选中角色, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var url = "/user";
						var data = {
							ids: that.selectedValue
						}
						console.log(data)
						that.$api.delete(url, data).then((res) => {
							if (res.ret) {
								that.$message({
									message: '操作成功',
									type: 'success'
								});
								that.search()
								that.$refs.multipleTable.clearSelection();
							} else {
								that.$message.error(res.message);
							}
						});
					}).catch(() => {
						that.$refs.multipleTable.clearSelection();
						that.$message('删除操作已取消');
					});
				}
			},
			getOrg() { //获取组织机构
				let that = this;
				var url = "/persons/name";
				var data = {
					type: 1
				};
				that.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.relList = this.getTreeData(res.data)
					}
				});
			},
			getRoleList() { //获取角色
				let that = this;
				var url = "/role";
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.roleList = res.data
					}
				});
			},
			submits(forms) { //新增验证
				this.$refs[forms].validate((valid) => {
					if (valid) {
						this.add()
					} else {
						console.log(1)
						return false;
					}
				});
			},
			add() {
				let that = this;
				var url = "/user";
				var data = that.addform;
				if (data.userId) {
					that.$api.put(url, data).then((res) => {
						console.log(res)
						if (res.ret == true) {
							that.search();
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.dialogVisible = false
						} else {
							that.$message.error(res.message);
						}
					});
				} else {
					that.$api.post(url, data).then((res) => {
						console.log(res)
						if (res.ret == true) {
							that.search();
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.dialogVisible = false
						} else {
							that.$message.error(res.message);
						}
					});
				}

			},
			handleItemChange(val) { //显示所属机构及所属职务
				let that = this;
				console.log(val)
				that.personList = []
				that.personsId = "";
				that.job = "";
				if (that.addform.type == 1) {
					that.addform.relateId = val[val.length - 1];
				} else {

					that.getPerList(val[val.length - 1])
				}
			},
			getTreeData(data) {
				// 循环遍历json数据
				for (var i = 0; i < data.length; i++) {
					if (data[i].organModels) {
						if (data[i].organModels.length < 1) {
							// organModels若为空数组，则将organModels设为undefined
							data[i].organModels = undefined;
						} else {
							// organModels若不为空数组，则继续 递归调用 本方法
							this.getTreeData(data[i].organModels);
						}
					}
				}
				return data;
			},
			handleItemChanges(val) { //查询所属机构id
				let that = this;
				that.searchForm.suborOrganization = val[val.length - 1];
			},
		}

	}
</script>

<style scoped lang="less">


</style>
