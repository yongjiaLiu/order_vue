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
		<el-dialog title="积分配置" :visible.sync="dialogVisible" width="40%" center :close-on-click-modal="false"
		 :close-on-press-escape="false">
			<div class="dialog_content">
				<el-form class="demo-ruleForm" ref="editForm" :model="editForm" status-icon label-width="100px">
					<el-form-item label="操作类型:" prop="account">
						<el-select v-model="editForm.oppType" size="medium" filterable class="on_col">
							<el-option v-for="item in integ" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分数:" prop="account" v-if="editForm.oppType!=3">
						<el-input v-model="editForm.points" oninput="this.value=this.value.replace(/\D/g,'')"></el-input>
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
	import {order} from '@/common/sitting'
	export default {
		data() {
			return {
				sLoading: false, //搜索按钮loading
				slideShow: false, // 下拉显隐变量
				roleType: '',
				dialogVisible: false, //模态框是否显示
				addLoading: false, //是否显示loading
				tableData: {},
				rowsList: order.rowsList,
				queryObj: order.queryForm,
				integ:[{id:1,name:"增加"},{id:2,name:"减少"},{id:3,name:"清零"}],
				buttonList: {
					enable: {
						label: " 停用/启用",
						prop: "enable",
						icon: "el-icon-s-tools",
						click: this.enable
					},
					deletes: {
						label: "删除",
						prop: "enable",
						icon: "el-icon-delete",
						click: this.deletes
					}
				},
				query: { //查询条件
					goodName: "",
					goodCode: "",
					categoryCode: "",
					pageIndex: 1,
					pageNum: 10
				},
				isLoading: false,
				update: true, //組建是否顯示
				deleteData: [],
				editForm:{
					oppType:1,
					memberCode:"",
					points:""
				}
			}
		},
		computed: {
			// 收起展开

		},
		created() {
			this.querys()
		},
		components: {
			QueryForm,
			DataTable
		},
		methods: {
			querysList(val) {
				console.log(val)
				this.query.goodName = val.goodName;
				this.query.goodCode = val.goodCode;
				this.querys()
			},
			enable(row) {	//停用/启用
				let that = this;
				console.log(row)
				that.$confirm('此操作将停用/启用商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var state = row.status==1?"-1":"1";
					var url = "/good/"+row.code+"/"+state;
					that.$api.put(url, {}).then((res) => {
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
			querys() {
				let that = this;
				that.isLoading = true;
				var data = this.query
				var url = "/good/pageIndex/" + data.pageIndex + "/pageNum/" + data.pageNum
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
				that.$confirm('此操作将永久删除选中商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = "/good/"+row.code;
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
			add(){		//新增按钮
				let that = this;
				that.$router.push({
					name: "ord/adder"
				})
			}
		}

	}
</script>

<style scoped lang="less">


</style>
