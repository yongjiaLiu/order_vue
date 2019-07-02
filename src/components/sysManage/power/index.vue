<template>
	<div class="container-table">
		<div class="bg-white">
			<el-tree :data="permissionList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				permissionList: [{
					permissId:0,
					permissName: '一级 1',
					sysPermissionModels: [{
						label: '二级 1-1',
						sysPermissionModels: [{
							label: '三级 1-1-1'
						}]
					}]
				}],
				defaultProps: {
					children: 'sysPermissionModels',
					label: 'permissName'
				}
			}
		},
		created(){
			this.getPermission()
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			getPermission(){
				let that = this;
				var url = "/permission"
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret) {
						that.permissionList = res.data
					} 
				});
			}
		}

	}
</script>

<style scoped lang="less">


</style>
