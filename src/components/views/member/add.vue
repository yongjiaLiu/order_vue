<template>
	<div class="container-table bg-white">
		<PublicTable :firstFormObject="addform" @trueAdd="submits" :detailObj="detailData"></PublicTable>
	</div>
</template>

<script>
	import PublicTable from 'components/common/comModule/publicTable'
	import {member} from '@/common/sitting'
	export default {
		data() {
			return {
				addform: member.addForms,
				detailData:{}
			}
		},
		computed: {
			// 收起展开

		},
		created() {
		
		},
		components: {
			PublicTable
		},
		methods: {
			submits(data) {
				let that = this;
				console.log(data);
				let url = "/member";
				that.$api.posts(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.$message({
							message: '操作成功',
							type: 'success'
						});
						that.$router.push({
							name: "member/index"
						})
					}else{
						that.$message.error(res.message);
					}
				});
			}
		}

	}
</script>

<style scoped lang="less">


</style>
