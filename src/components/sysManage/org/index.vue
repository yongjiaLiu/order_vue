<template>
	<div class="container-table">
		<el-form class="searchFrame" label-width="100px" ref="searchForm">
			<el-row>
				<el-col :span='8'>
					<el-form-item label="机构名称:" prop="onRole">
						<el-input size="medium" v-model="orgName" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="parting-line"></div>
		<div class="bg-white">
			<el-row type="flex" justify="end">
				<el-col :span='12'>
					<div class="item-right">
						<el-button type="primary" icon="el-icon-circle-plus" @click="openModal" size="small">新增</el-button>
					</div>
				</el-col>
			</el-row>
			<ul class="sinceJuly">
				<li>机构名称</li>
				<li>成员数</li>
				<li>机构负责人</li>
				<li>手机号码</li>
				<li>操作</li>
			</ul>
			<el-tree :data="orgList" :props="defaultProps" node-key="id"  accordion :expand-on-click-node="false" ref="trees"
			 :render-content="renderContent"  :filter-node-method="filterNode">
			</el-tree>
		</div>
		<el-dialog :title="modelTitle" :visible.sync="dialogVisible" width="40%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="addform" :model="addform" status-icon label-width="100px" :rules="addRules">
					<el-form-item label="机构名称:" prop="name">
						<el-input v-model.trim="addform.name" :disabled="isdisabled" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item label="机构负责人:" prop="head">
						<el-input v-model.trim="addform.head" :disabled="isdisabled" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item label="手机号码:" prop="headPhone">
						<el-input v-model.trim="addform.headPhone" :disabled="isdisabled" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
					</el-form-item>
					<el-form-item label="机构地址:" prop="address">
						<el-input v-model.trim="addform.address" :disabled="isdisabled" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item label="机构描述:" prop="describes">
						<el-input  type="textarea" v-model="addform.describes" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
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
    import {
        checkPhone
    } from '../../../utils/validator.js'
	export default {
		data() {
			return {
				sLoading: false, //搜索按钮loading
				roleType: '',
				dialogVisible: false, //模态框是否显示
				orgName: "",
				orgList: [],
				isdisabled:false,
				defaultProps: {
					children: 'organModels',
					label: 'name'
				},
				modelTitle:'新增机构',
				addform:{
					address:'',
					createUser:this.$store.state.uInfo.userId,
					describes:'',
					head:'',
					headPhone:'',
					name:'',
					parentId:'',
				},
				addRules:{
					name: [{
							required: true,
							message: '请输入机构名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 40,
							message: '长度在 1 到 40 个字符',
							trigger: 'blur'
						}
					],
                    head:[{ required: false, message: '请输入机构负责人', trigger: 'blur'},
                        { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }],
                    headPhone:[{ required: false, validator:checkPhone, trigger: 'blur'}],
                    address:[{ required: false, message: '请输入机构地址', trigger: 'blur'},
                        { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }],
                    describes:[{ required: false, message: '机构描述不超过500字符', trigger: 'blur'},
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }]
				}
			}
		},
		watch: {
		  orgName(val) {
			this.$refs.trees.filter(val);
		  },
		  dialogVisible: {
		  	deep: true,
		  	handler: function(val, old) {
		  		if (!val) {
		  			let that = this;
		  			that.$refs['addform'].resetFields(); //重置表单
		  			that.$refs['addform'].clearValidate(); //重置验证
					that.addform = {}
		  		}
		  	}
		  }
		},
		created() {
			this.getOrg()
		},
		methods: {
			getOrg() { //获取组织机构
				let that = this;
				var url = "/organ";
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.orgList = this.getTreeData(res.data)
					}
				});
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
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
			renderContent(h, { node, data, store }){
				return ( <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
							<span style="width:20%;display:inline-block;">
							  <span>{node.label}</span>
							</span>
							<span style="width:20%;display:inline-block;text-align:center;">
								<span>{data.countPerson}</span>
							</span>
							<span style="width:20%;display:inline-block;text-align:center;">
								<span>{data.head}</span>
							</span>
							<span style="width:20%;display:inline-block;text-align:center;">
								<span>{data.headPhone}</span>
							</span>
							<span style="width:20%;display:inline-block;text-align:center;">
							  <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>添加子项</el-button>
								 <el-button style="font-size: 12px;" type="text" on-click={ () => this.edits(data) }>编辑</el-button>
							  <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(data) }>删除</el-button>
							</span>
						 </span>
						)
			},
			append(data){	//新增
                this.modelTitle="新增机构";
				let that = this;
				that.addform.parentId = data.id;
				this.dialogVisible = true;
			},
			edits(data){		//查询
                this.modelTitle="编辑机构";
				let that = this;
				var url = "/organ/"+data.id;
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.addform = res.data;
						this.dialogVisible = true;
					}
				});
			},
			remove(data){	//删除
				let that = this;
				that.$confirm('此操作将永久删除选中机构, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = "/organ";
					var datas = {
						id: data.id
					}
					console.log(datas)
					that.$api.delete(url, datas).then((res) => {
						if (res.ret) {
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.getOrg()
						} else {
							that.$message.error(res.message);
						}
					});
				}).catch(() => {
					that.$message('删除操作已取消');
				});
			},
			submits(forms) { //新增验证
				this.$refs[forms].validate((valid) => {
					if (valid) {
						this.add()
					} else {
						return false;
					}
				});
			},
			add(){
				let that = this;
				var url = "/organ"
				var data = that.addform;
				console.log(data)
				if (data.id) {
					that.$api.puts(url, data).then((res) => {
						console.log(res)
						if (res.ret == true) {
							that.getOrg();
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
					that.$api.posts(url, data).then((res) => {
						console.log(res)
						if (res.ret == true) {
							that.getOrg();
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
			//搜索
			openModal() {
                this.modelTitle="新增机构";
				this.dialogVisible = true;
				this.addform.parentId = "0"
			}
		}

	}
</script>

<style scoped lang="less">
	.sinceJuly{
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-top: 30px;
		background-color:#fff ;
		li{
			width: 20%;
			text-align: center;
			font-size: 14px;
			color: #6a7ffe;
			font-weight: 900;
			float: left;
		}
	}
	.tab_span{
		display: inline-block;
		width: 20%;
		text-align: center;
	}
</style>
