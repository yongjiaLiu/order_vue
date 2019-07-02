<template>
	<div class="container-table bg-white">
		<PublicTable :firstFormObject="addform" @trueAdd="submits" @caValue="getAttr" :detailObj="detailData" :attrList="attrList"></PublicTable>
	</div>
</template>

<script>
	import PublicTable from 'components/common/comModule/publicTable'
	import {order} from '@/common/sitting'
	export default {
		data() {
			return {
				addform: order.addForms,
				isDisable:false,
				detailData:{},
				attrList:[]
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
			this.queryDetail(this.$route.query.code);
			this.getType()
		},
		components: {
			PublicTable
		},
		methods: {
			submits(data) {
				let that = this;
				data.code = this.$route.query.code;
				data.categoryCode = data.categoryCode[0]
				//data.properties=this.detailData.properties
				let url = "/good";
				that.$api.puts(url, data).then((res) => {
					console.log(res)
					if (res.ret == true) {
						that.$message({
							message: '操作成功',
							type: 'success'
						});
						that.$router.push({
							name: "order/index"
						})
					}else{
						that.$message.error(res.message);
					}
				});
			},
			queryDetail(id){
				let that = this;
				var url = "/good/goodCode/"+id;
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.detailData = res.data
					}
				});
			},
			getType(){		//查询分类信息
				let that = this;
				var url = "/category";
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.assType(this.getTreeData(res.data))
					}
				});
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
			assType(val){
				for(var i in this.addform){
					if(this.addform[i].type==3){	
						this.addform[i].array = val;
					}else{
						this.addform[i].array = val
					}	
				}
			},
			getAttr(val){
				let that = this;
				console.log(val)
				if(!val){
					return
				}					
				console.log(val[val.length-1])
				var url = "/property/catogeryCode/"+val[val.length-1]
				that.$api.get(url, {}).then((res) => {
					console.log(res)
					if (res.ret == true) {
						this.attrList = res.data
					}
				});
			}
		}

	}
</script>

<style scoped lang="less">


</style>
