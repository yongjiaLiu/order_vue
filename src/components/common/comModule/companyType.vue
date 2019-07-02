<template>
	<div>
		<el-dialog title="企业类型" :visible.sync="dialogVisible" width="30%" :before-close="close" append-to-body>
			<el-tree :data="companyTypeList" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			dialogVisible: Boolean,
			required: true
		},
		data() {
			return {
				companyTypeList: [],
				defaultProps: {
					children: 'categories',
					label: 'name',
					value: 'code'
				}
			};
		},
		created() {
			this.search();
		},
		methods: {
			//搜索企业类型
			search() {
				//企业类型
				var url = '/company/getCompanyTypeTree';
				var data = {}
				this.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.companyTypeList = res.data;
					}
				});

			},
			clears(i) {
				if (this.$refs.tree != undefined) {
					if (i == false) {
						this.$refs.tree.setCheckedKeys([]);
					}
				}
			},
			//关闭或者确定
			add() {
				let that = this;
				let arr = [];
				arr = arr.concat(that.$refs.tree.getCheckedKeys()); //拼接id数组
				var list = that.$refs.tree.getCheckedNodes(true, false);
				var names = [];
				list.forEach(function(value, index, val) {
					names.push(value.content);
				}); //已选择类型数组
				this.$emit('on-close', arr, names); //向父组传递id及name
			},
			close() { //关闭或者取消
				let that = this;
				let arr = [];
				var names = [];
				this.$refs.tree.setCheckedKeys([]);
				this.$emit('on-close', arr, names);
			}

		}
	};
</script>

<style scoped>

</style>
