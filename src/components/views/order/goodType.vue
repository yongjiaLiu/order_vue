<template>
	<div class="container-table">
		<el-form class="searchFrame" label-width="100px" ref="searchForm">
			<el-row>
				<el-col :span='8'>
					<el-form-item label="分类名称:" prop="onRole">
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
			<el-tree :data="orgList" :props="defaultProps" node-key="id"  accordion :expand-on-click-node="false" ref="trees" :highlight-current="true" :default-expand-all="true"
			 :render-content="renderContent"  :filter-node-method="filterNode">
			</el-tree>
		</div>
		<el-dialog :title="modelTitle" :visible.sync="dialogVisible" width="40%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="addform" :model="addform" status-icon label-width="100px" :rules="addRules">
					<el-form-item label="分类名称:" prop="name">
						<el-input v-model.trim="addform.name" :disabled="isdisabled" oninput="this.value=this.value.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<div class="return">
						<el-button type="primary" v-preventReClick="3000" @click="submits('addform')">确 定</el-button>
						<el-button @click="dialogVisible = false">取 消</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>
		<el-dialog :title="modelTitle" :visible.sync="dialogVisibles" width="40%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="attrForm" :model="attrForm" status-icon label-width="100px">
					<el-form-item v-if="attrForm.propertyCode">
						<el-tag :key="tag" v-for="tag in dynamicTags" :disable-transitions="false">
							{{tag}}
						</el-tag>
					</el-form-item>
					<el-form-item label="属性名称:" prop="propertyCode">
						<el-select v-model="attrForm.propertyCode" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" class="on_col" :multiple-limit='2'
						 :loading="loading">
							<el-option v-for="item in attrList" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
					<div class="return">
						<el-button type="primary" v-preventReClick="3000" @click="binds('attrForm')">确 定</el-button>
						<el-button @click="dialogVisibles = false">取 消</el-button>
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
				roleType: '',
				dialogVisible: false, //模态框是否显示
				dialogVisibles:false,
				orgName: "",
				orgList: [],
				attrList:[],
				loading: false,
				isdisabled:false,
				dynamicTags:[],
				defaultProps: {
					children: 'categories',
					label: 'name',
					value:'code'
				},
				modelTitle:'新增分类',
				addform:{
					name:'',
					parentCode:"",
					level:1
				},
				attrForm:{
					categoryCode:'',	//商品分类编码
					propertyCode:''		//商品属性编码
				},
				addRules:{
					name: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 40,
							message: '长度在 1 到 40 个字符',
							trigger: 'blur'
						}
					],
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
		  },
		   dialogVisibles: {
		  	deep: true,
		  	handler: function(val, old) {
		  		if (!val) {
		  			let that = this;
		  			that.$refs['attrForm'].resetFields(); //重置表单
		  			that.$refs['attrForm'].clearValidate(); //重置验证
		  		}
		  	}
		  },
		  "attrForm.propertyCode":{
		  	deep: true,
		  	handler: function(val, old) {
				this.dynamicTags=[]
		  		if (val.length>0) {
		  			this.attrList.forEach(v => {
						if(v.code==val[val.length-1]){
							this.dynamicTags=v.valueInfo.split(",")
						}
					});; //已选择类型数组
					console.log(this.dynamicTags)
		  		}
		  	}
		  }
		},
		created() {
			this.getOrg()
			this.getAttr("")
		},
		methods: {
			 remoteMethod(query) {
				 console.log(query)
				if (query !== '') {
				  this.loading = true;
				 this.getAttr(query)
				} else {
				  this.options = [];
				}
			  },
			getAttr(val){
				let that = this;
				var url = "/property/propertyName/"
				var data = {
					propertyName:val
				}
				that.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.loading = false;
						that.attrList = res.data
					}
				});
			},
			getOrg() { //获取组织机构
				let that = this;
				var url = "/category";
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.orgList = this.getTreeData(res.data);
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
					if (data[i].categories) {
						if (data[i].categories.length < 1) {
							// categories若为空数组，则将categories设为undefined
							data[i].categories = undefined;
						} else {
							// categories若不为空数组，则继续 递归调用 本方法
							this.getTreeData(data[i].categories);
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
							  <el-button style="font-size: 12px;" type="text"  on-click={ () => this.append(data) }>添加子项</el-button>
							<el-button style="font-size: 12px;" type="text" on-click={ () => this.edits(data) }>编辑</el-button>
							<el-button style="font-size: 12px;" type="text"  on-click={ () => this.bindModel(data) }>绑定</el-button>
							  <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(data) }>删除</el-button>
							</span>
						 </span>
						)
			},
			append(data){	//新增
                this.modelTitle="新增分类";
				let that = this;
				if(data.level==3){
					that.$message.error("分类最多只能添加三级!");
					return
				}
				that.addform.parentCode = data.code;
				that.addform.level = Number(data.level)+1
				this.dialogVisible = true;
			},
			edits(data){		//查询
                this.modelTitle="编辑分类";
				let that = this;
				that.addform=data;
				this.dialogVisible = true;
			},
			remove(data){	//删除
				let that = this;
				if(data.categories){
					that.$message.error("当前分类存在下级分类，删除失败!");
					return 
				}
				that.$confirm('此操作将永久删除选中机构, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(data)
					var url = "/category/"+data.code;
					that.$api.delete(url, {}).then((res) => {
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
				var url = "/category";
				console.log(this.addform)
				var data = that.addform;
				console.log(data)
				if (data.code) {
					console.log(data)
					that.$api.puts(url, data).then((res) => {
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
                this.modelTitle="新增分类";
				this.dialogVisible = true;
				this.addform.parentCode = ""
			},
			bindModel(val){
				this.modelTitle="绑定属性";
				this.dialogVisibles = true;
				this.attrForm.categoryCode = val.code
			},
			binds(){
				let that = this;
				var data = that.attrForm;
				var url = "/categoryProperty/categoryCode/"+data.categoryCode+"/propertyCode/"+data.propertyCode
				that.$api.post(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.$message({
							message: '操作成功',
							type: 'success'
						});
						that.dialogVisibles = false
					} else {
						that.$message.error(res.message);
					}
				});
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
	.el-tag+.el-tag {
		margin-left: 10px;
	}
	
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
