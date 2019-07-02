<template>
	<div class="container-table">
		<el-form class="searchFrame" label-width="100px" ref="searchForm">
			<el-row>
				<el-col :span='8'>
					<el-form-item label="分类名称:" prop="onRole">
						<el-input size="medium"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='8'>
					<el-form-item class="item-right">
						<el-button :loading="sLoading" icon="el-icon-search" type="primary" @click="search('searchForm')" size="small">查询</el-button>
						<el-button icon="el-icon-refresh" size="small">重置</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

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
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="title" label="角色名称">
				</el-table-column>
				<el-table-column prop="date" label="数量">
				</el-table-column>
				<el-table-column prop="" label="操作" align="center" width="200px" class-name="operate">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="配置角色" placement="bottom">
							<i class="iconfont el-icon-setting" @click="onEditRoles()"></i>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</div>


		<div class="block page-div">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div>

		<el-dialog title="配置角色" :visible.sync="dialogVisible" width="30%" center>
			<div style="">
				<el-radio style="margin-left:10px;" v-model="roleType" label="1" border size="medium">超级管理员</el-radio>
				<el-radio v-model="roleType" label="2" border size="medium">局长</el-radio>
				<el-radio v-model="roleType" label="3" border size="medium">所长</el-radio>
				<el-radio v-model="roleType" label="4" border size="medium">科长</el-radio>
				<el-radio v-model="roleType" label="5" border size="medium">科员</el-radio>
				<el-radio v-model="roleType" label="6" border size="medium">业务员</el-radio>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sLoading: false, //搜索按钮loading
				slideShow: false, // 下拉显隐变量
				roleType: '',
				dialogVisible: false, //模态框是否显示
				addLoading: false, //是否显示loading
				tableData: [{
					title: '关于食品安全告知书',
					type: '公示公告',
					date: '2016-05-02',
					author: '王小虎',
				}],
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4
			}
		},
		computed: {
			// 收起展开
			text() {
				return this.slideShow ? '收起' : '展开';
			}
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
