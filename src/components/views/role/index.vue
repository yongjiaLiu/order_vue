<template>
	<div class="container-table">
		<el-form class="searchFrame" label-width="100px" ref="searchForm" :model="searchForm">
			<el-row>
				<el-col :span='8'>
					<el-form-item label="角色名称:" prop="roleName">
						<el-input size="medium" v-model="searchForm.roleName" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
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
						<el-button icon="el-icon-circle-plus" type="primary" size="small" @click="openModel" v-if="$store.state.perList.indexOf(2)!=-1" >新增角色</el-button>
						<el-button icon="el-icon-delete" size="small" @click="delets" v-if="$store.state.perList.indexOf(4)!=-1" >删除</el-button>
					</div>
				</el-col>
			</el-row>
			<el-table ref="multipleTable" :data="tableData" stripe style="width: 100%" v-loading="sLoading" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="name" label="角色名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="userCount" label="数量" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="" label="操作" align="center" width="200px" class-name="operate" v-if="$store.state.perList.indexOf(3)!=-1" >
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit-outline" @click="editModel(scope.row.roleId)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>


		<div class="block page-div">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
			 :page-sizes="[1,10, 20, 30, 40]" :page-size="pageNum" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
			</el-pagination>
		</div>
		<el-dialog :title="modelTitle" :visible.sync="dialogVisible" width="30%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="addform" :model="addform" status-icon label-width="100px" :rules="addRules">
					<el-form-item label="设置角色:" prop="roleName">
						<el-input v-model.trim="addform.roleName" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item>
						<el-tree :data="permissionList" :props="defaultProps" show-checkbox node-key="permissId" ref="tree"
						 :default-checked-keys="selectTree" highlight-current></el-tree>
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
			return {
				sLoading: false, //搜索按钮loading
				dialogVisible: false, //模态框是否显示
				searchForm: {
					roleName: ''
				},
				addform: { //添加角色入参
					roleName: '',
					perIds: ''
				},
				selectTree: [], // 权限树绑定值
				addRules: {
					roleName: [{
							required: true,
							message: '请输入角色',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 40,
							message: '长度在 1 到 40 个字符',
							trigger: 'blur'
						}
					],
				},
				tableData: [],
				currentPage: 1,
				pageNum: 10,
				pageIndex: 1,
				totalPage: 0,
				selectedValue: '',
				modelTitle:"新增角色",
				permissionList: [], //权限
				defaultProps: {
					children: 'sysPermissionModels',
					label: 'permissName'
				}
			}
		},
		created() {
			this.search()
		},
		watch: {
			dialogVisible: {
				deep: true,
				handler: function(val, old) {
					console.log(val)
					if (!val) {
						let that = this;
						that.addform = {
							roleName: '',
							perIds: ''
						}
						that.$refs['addform'].resetFields(); //重置表单
						that.$refs['addform'].clearValidate(); //重置验证
					}
				}
			}
		},
		methods: {
			//点击配置角色
			openModel() {
				this.selectTree = [];
				this.modelTitle = "新增角色"
				this.dialogVisible = true;
				this.getPermission()
			},
			//搜索
			search() {
				let that = this;
				this.sLoading = true;
				var data = that.searchForm;
				var url = "/role/pageIndex/" + that.pageIndex + "/pageNum/" + that.pageNum;
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
			handleSelectionChange(val) { //当前选中数据
				let that = this;
				var delArr = [];
				val.forEach(function(value, index, val) {
					delArr.push(value.roleId);
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
						var url = "/role";
						var data = {
							roleIds: that.selectedValue
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
			getPermission() { //获取权限
				let that = this;
				var url = "/permission"
				that.$api.get(url, {}).then((res) => {
					if (res.ret) {
						that.permissionList = res.data
					}
				});
			},
			submits(forms) {
				this.$refs[forms].validate((valid) => {
					if (valid) {
						this.add()
					} else {
						return false;
					}
				});
			},
			add() {
				let that = this;
				var url = "/role"
				var data = that.addform;
				var arr = [];
				arr = arr.concat(that.$refs.tree.getCheckedKeys())
				if (that.$refs.tree.getHalfCheckedKeys().length > 0) {
					arr = arr.concat(that.$refs.tree.getHalfCheckedKeys())
				}
				if (arr.length == 0) {
					this.$message.error('请选择权限！');
					return
				}
				data.perIds = arr.join(',');
				if (that.addform.roleId) {
					that.$api.put(url, data).then((res) => {
						if (res.ret) {
							that.$message({
								message: '修改成功',
								type: 'success'
							});
							that.search()
							this.dialogVisible = false;
						}else {
							that.$message.error(res.message);
						}
					});
				} else {
					that.$api.post(url, data).then((res) => {
						if (res.ret) {
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.search()
							this.dialogVisible = false;
						}else {
							that.$message.error(res.message);
						}
					});
				}
			},
			editModel(id) {
				let that = this;
				this.modelTitle = "编辑角色"
				that.selectTree = [];
				var url = "/role/roleId/" + id;
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret) {
						that.getPermission()
						that.addform.roleName = res.data.name;
						that.addform.roleId = id
						var arr = res.data.sysPermissions;
						console.log(res)
						for (let i in arr) {
							that.selectTree.push(arr[i].permissId)
						}
						console.log(that.selectTree)
						that.addform.perIds = that.selectTree
						this.dialogVisible = true;
					} else {
						that.$message.error(res.message)
					}
				});
			},
		}

	}
</script>

<style scoped lang="less">


</style>
