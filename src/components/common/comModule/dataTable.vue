<template>
	<div class="tabel-wrap">
		<el-table ref="multipleTable" :data="tableData.records" stripe style="width:100%!important" v-loading="isloading"
		 @selection-change="handleSelectionChange" @row-dblclick="handleGo">
			<el-table-column type="selection" width="55" v-if="ischoose">
			</el-table-column>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column v-for="(x,index) in rowList" :key="index" :label="x.label" :prop="x.prop">
				<template slot-scope="scope">
					<a v-if="x.types==1">{{scope.row[x.prop]}}</a>
					<a v-if="x.types==2">{{x.judge[scope.row[x.prop]]}}</a>
					<a v-if="x.types==3">{{scope.row[x.prop]|moment}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作" align="center" width="300px" class-name="operate" v-if="isOpera">
				<template slot-scope="scope">
					<el-button type="text" icon="el-icon-edit-outline" @click="handleGo(scope.row,1)">编辑</el-button>
					<el-button type="text" v-for="(item,indexs) in buttonLists" :key="indexs" :icon="item.icon" @click="item.click(scope.row)">{{item.label}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block page-div">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageIndex"
			 :page-sizes="[5,10, 20, 30, 40]" :page-size="page.pageNum" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			tableData: { //列表内容
				type: Object
			},
			rowList: { //表头数据
				type: Object
			},
			buttonLists: {
				type: Object
			},
			ischoose: { //是否多选
				type: Boolean,
				default: true
			},
			isOpera: { //是否展示操作栏
				type: Boolean,
				default: true
			},
			isloading: { //是否正在加载中
				type: Boolean,
				default: false
			},
			queryData: {
				type: Object
			}
		},
		data() {
			return {
				page: {
					currentPage: 1,
					pageNum: 10,
					pageIndex: 1,
					totalPage: 1,
				},
			}
		},
		watch: {
			tableData(val) {
				console.log(val)
				this.page.currentPage = val.current;
				this.page.pageNum = val.size;
				this.page.totalPage = val.pages;
				this.page.totalCount = val.total
			},

		},
		computed: {

		},
		created() {
			/* console.log(this.tableData) */
		},
		methods: {
			handleSizeChange(val) {
				let that = this;
				that.queryData.pageNum = val;
				that.$parent.querys()
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				let that = this;
				that.queryData.pageIndex = val;
				that.$parent.querys()
				console.log(`当前页: ${val}`);
			},
			handleSelectionChange(val) { //当前选中数据
				let that = this;
				var delArr = [];
				val.forEach(function(value, index, val) {
					delArr.push(value.id);
				});
				this.$emit("deletes", delArr)
			},
			handleGo(row, i) { //i=1:可编辑，i=0;不可编辑
				let that = this; //获取当前路由
				var paths = that.$route.name.split('/');
				if (paths[1] == "goodAttr") {
					that.$parent.openModal(row)
				} else {
					var nextPath = "/" + paths[0] + "/detail";
					that.$router.push({
						path: nextPath,
						query: {
							code: row.code,
							isDisable: i
						}
					})
				}

			}
		},
	}
</script>

<style scoped lang="less">
	.tabel-wrap {
		overflow: hidden
	}

	.el-table__header {
		width: 100% !important;
	}
</style>
