<template>
	<div class="container-table bg-white">
		<PublicTable :firstFormObject="addform" :isEdit="isDisable" :detailObj="detailData" @trueAdd="submits"></PublicTable>
	</div>
</template>

<script>
	import PublicTable from 'components/common/comModule/publicTable'
	import {member} from '@/common/sitting'
	export default {
		data() {
			return {
				addform: member.addForms,
				isDisable:false,
				detailData:{}
			}
		},
		computed: {
			// 收起展开
		},
		created() {
			if(this.$route.query.isDisable==1){
				this.isDisable = false
			}else{
				this.isDisable =  true
			};
			this.queryDetail(this.$route.query.code)
		},
		components: {
			PublicTable
		},
		methods: {
			submits(data) {
				let that = this;
				console.log(data);
				data.code = this.$route.query.code;
				let url = "/member";
				that.$api.puts(url, data).then((res) => {
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
			},
			queryDetail(id){
				let that = this;
				var url = "/member/memberCode/"+id;
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.detailData = res.data
					}
				});
			}
		}

	}
</script>

<style scoped lang="less">


</style>
