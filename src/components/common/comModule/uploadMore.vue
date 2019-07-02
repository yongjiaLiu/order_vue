<template>
	<div class="upload-img">
		<el-upload  :action="uploadPath" :on-preview="handlePreview" :data="data" :headers="headers"
		 v-loading="isloading" name="imgfile" :on-remove="handleRemove" :file-list="fileList" :auto-upload="true" list-type="picture-card"
		 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			<i class="el-icon-plus"></i>
		</el-upload>
	</div>
</template>

<script>
	export default {
		props: {
			fileLists: {
				type: String
			}
		},
		data() {
			return {
				imageUrl: 'static/img/mrt.png',
				fileList: [],
				uploadPath: this.$global.baseUrl + '/api/fileUpload', //上传地址
				headers: {
					//'token': JSON.parse(sessionStorage.getItem('uInfo')).token
				},
				data: {
					type: '1',
					relationId: '',
					creater: 1
				}, //
				isloading: false,
				subList:[]
			}
		},
		created() {

		},
		watch: {
			fileLists:{
				handler(val, oldName){
					console.log(val)
					if(val){
						//this.imageUrl = val.split(",")
						var arr = val.split(",")
						for(var i in arr){
							var obj = {};
							obj.name = arr[i];
							obj.url = arr[i];
							this.fileList.push(obj) 
						}
					}
				},
				immediate: true,
				deep: true
			},
			subList:{
				handler(val, oldName){
					if(val.length>0){
						this.$emit("sendUrl", val)	
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
				let that = this;
				that.subList = [];
				fileList.forEach(function(item) {
					that.subList.push(item.response.data)
				})
			},
			handlePreview(file) {
				console.log(file);
			},
			//上传成功
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file)
				if (res.ret == true) {
					this.isloading = false;
					var obj = res.data.toString();
					this.subList.push(obj)
					//this.$emit("sendUrl", obj)
				} else {
					this.$message.error(res.message || res.msg);
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 20;
				this.isloading = true
				if (!isJPG) {
					this.isloading = false
					this.$message.error('上传图片只能是 jpg,jpeg,png 格式!');
				}
				if (!isLt2M) {
					this.isloading = false
					this.$message.error('上传图片大小不能超过 20MB!');
				}
				return isJPG && isLt2M;
			},
		}

	}
</script>
<style lang="less">
	.uploadSub {
		margin-left: 10px;
		position: relative;
		bottom: 10px
	}
</style>
