<template>
	<div class="container-table">
		<QueryForm :firstFormObject="queryObj" @sendQuery="querysList" :isloading="isLoading"></QueryForm>
		<div class="parting-line"></div>
		<div class="bg-white">
			<el-row type="flex" justify="end">
				<el-col :span='12'>
					<div class="item-right">
						<el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">新增</el-button>
					</div>
				</el-col>
			</el-row>
			<DataTable :tableData="tableData" :rowList="rowsList" :buttonLists="buttonList" :queryData="query" :isloading="isLoading"
			 @deletes="deleteDatas" :ischoose="false"></DataTable>
		</div>
		<el-dialog title="属性配置" :visible.sync="dialogVisible" width="40%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="editForm" :model="editForm" status-icon label-width="100px" :rules="rules">
					<el-form-item label="分类名称:" prop="name">
						<el-input v-model="editForm.name"></el-input>
					</el-form-item>
					<el-form-item label="分类属性:" prop="account">
						<NewTag @trueAdd="getValue" :dataStr="editForm.valueInfo"></NewTag>
					</el-form-item>
					<div class="return">
						<el-button type="primary" v-preventReClick="3000" @click="adds('editForm')">确 定</el-button>
						<el-button @click="dialogVisible = false">取 消</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import QueryForm from 'components/common/comModule/queryForm'
	import DataTable from 'components/common/comModule/dataTable'
	import {goodAttr} from '@/common/sitting'
	import NewTag from 'components/common/comModule/newTag'
	export default {
		data() {
			return {
				sLoading: false, //搜索按钮loading
				slideShow: false, // 下拉显隐变量
				roleType: '',
				dialogVisible: false, //模态框是否显示
				addLoading: false, //是否显示loading
				tableData: {},
				rowsList: goodAttr.rowsList,
				queryObj: goodAttr.queryForm,
				buttonList: {
					deletes: {
						label: "删除",
						prop: "enable",
						icon: "el-icon-delete",
						click: this.deletes
					}
				},
				query: { //查询条件
					propertyName: "",
					pageIndex: 1,
					pageNum: 10
				},
				isLoading: false,
				update: true, //組建是否顯示
				deleteData: [],
				editForm: {
					name: "",
					valueInfo: ""
				},
				rules:{
					name: [{
							required: true,
							message: '请输入属性名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字',
							trigger: 'blur'
						}
					],
				}
			}
		},
		computed: {
			// 收起展开

		},
		watch: {
			dialogVisible: {
				deep: true,
				handler: function(val, old) {
					if (!val) {
						let that = this;
						that.$refs['editForm'].resetFields(); //重置表单
						that.editForm.valueInfo=""
						that.$refs['editForm'].clearValidate(); //重置验证
					}
				}
			}
		},
		created() {
			this.querys()
		},
		components: {
			QueryForm,
			DataTable,
			NewTag
		},
		methods: {
			getValue(val){	//获取tag属性值
				let that = this;
				this.editForm.valueInfo = val
			},
			querysList(val) {
				console.log(val)
				this.query.memberName = val.name;
				this.query.memberCode = val.memberCode;
				this.querys()
			},
			querys() {
				let that = this;
				that.isLoading = true;
				var data = this.query
				var url = "/property/pageIndex/" + data.pageIndex + "/pageNum/" + data.pageNum
				that.$api.get(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.isLoading = false;
						this.tableData = res.data
					}
				});
			},
			deleteDatas(val) { //保存選中數據
				this.deleteData = val;
			},
			deletes(row) { //刪除事件
				let that = this;
				console.log(row)
				that.$confirm('此操作将永久删除选中属性, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = "/property/" + row.code;
					that.$api.delete(url, {}).then((res) => {
						if (res.ret) {
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.querys()
						} else {
							that.$message.error(res.message);
						}
					});
				}).catch(() => {
					that.$message('删除操作已取消');
				});
			},
			add() { //新增按钮
				let that = this;
				this.dialogVisible = true
			},
			openModal(val) { //打开积分模态框
				let that = this;
				that.dialogVisible = true;
				that.editForm={
					name:val.name,
					id:val.id,
					valueInfo:val.valueInfo,
					code:val.code
				}		
			},
			adds() {
				let that = this;
				var url = "/property";
				var data = that.editForm;
				if(data.code){
					that.$api.puts(url, data).then((res) => {
						console.log(res)
						if (res.ret) {
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.dialogVisible = false
							that.querys()
						} else {
							that.$message.error(res.message);
						}
					});
				}else{
					that.$api.posts(url, data).then((res) => {
						console.log(res)
						if (res.ret) {
							that.$message({
								message: '操作成功',
								type: 'success'
							});
							that.dialogVisible = false
							that.querys()
						} else {
							that.$message.error(res.message);
						}
					});
				}
				
			}
		}

	}
</script>

<style scoped lang="less">


</style>
