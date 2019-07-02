<template>
	<div>
		<el-dialog title="属性配置" :visible.sync="dialogVisible" width="30%" :before-close="close" append-to-body>
			<div v-for="(x,index) in dataList" :key="index">
				<span>{{x.name}}</span>
				<NewTag @trueAdd="getValue" :dataStr="x.valueInfo" :index="index"></NewTag>
			</div>			
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import NewTag from 'components/common/comModule/newTag'
	export default {
		props: {
			dialogVisible: Boolean,
			dataList:{
				type:Array
			}
		},
		data() {
			return {
				defaultList:[],
				laberList:[]
			};
		},
		components: {
			NewTag
		},
		created(){
			console.log(this.dataList)
		},
		methods: {
			add(){
				let that = this;
				var data = this.dataList;
				var attrs=[] ;
				for(let i in data){
					attrs.push(data[i].name)
				}
				var are = attrs.toString()
				this.$emit("tagList", data,are)
			},
			getValue(val,index){
				let that = this;
				this.dataList[index].valueInfo = val
			},
			close() { //关闭或者取消
				let that = this;
			}

		}
	};
</script>

<style scoped>

</style>
