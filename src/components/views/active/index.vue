<template>
	<div class="container-table">
		<QueryForm :firstFormObject="queryObj"></QueryForm>
		<div class="parting-line"></div>
		<div class="bg-white">
			<el-row type="flex" justify="end">
				<el-col :span='12'>
					<div class="item-right">
						<el-button :loading="sLoading" type="primary" icon="el-icon-circle-plus" @click="search('searchForm')" size="small">新增分类</el-button>
						<el-button icon="el-icon-delete" size="small">删除</el-button>
					</div>
				</el-col>
			</el-row>
			<DataTable :tableData="tableData" :rowList="rowsList"></DataTable>
		</div>
	</div>
</template>

<script>
	import QueryForm from 'components/common/comModule/queryForm'
	import DataTable from 'components/common/comModule/dataTable'
	import {queryForm,rowsList} from './active'
	export default {
		data() {
			return {
				sLoading: false, //搜索按钮loading
				slideShow: false, // 下拉显隐变量
				roleType: '',
				dialogVisible: false, //模态框是否显示
				addLoading: false, //是否显示loading
				tableData: [{
					id:"1",
					title: '关于食品安全告知书',
					type: '公示公告',
					date: '2016-05-02',
					author: '王小虎',
				},{
					id:"2",
					title: '关于食品安全告知书',
					type: '公示公告',
					date: '2016-05-02',
					author: '王小虎',
				}],
				rowsList:rowsList,				
				queryObj: queryForm
			}
		},
		computed: {
			// 收起展开
			
		},
		components: {
			QueryForm,
			DataTable
		},
		methods: {
			//点击配置角色
			onEditRoles() {
				this.dialogVisible = true;
			},
			//搜索
			search() {
				this.sLoading = true;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}

	}
</script>

<style scoped lang="less">


</style>
