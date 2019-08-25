<template>
	<div class="upload-img">
		<el-upload v-loading="isloading" class="avatar-uploader" name="imgfile" :action="uploadPath" :disabled="isReadOnly"
		 :data="data" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		<img :id="randId" style="display: none;" :src="imageUrl" :preview="randId">
		<!-- <el-button v-if="imageUrl != 'static/img/mrt.png'" type="text" @click="blowUp" style="margin-left:10px;margin-bottom: 20px;">查看大图</el-button> -->
	</div>
</template>

<script>
	import {
		compress
	} from './compress.js'
	export default {
		props: {
			params: {
				type: Object,
			},
			imageUrls: {
				type: String,
			}
		},
		data() {
			return {
				//imageUrl: 'static/img/mrt.png',
				uploadPath: this.$global.baseUrl + '/api/Upload/PostUpload', //上传地址
				data: {

				}, //
				headers: {
					//'token': JSON.parse(sessionStorage.getItem('uInfo')).token
				},
				isReadOnly: false,
				imgName: '',
				randId: Math.random(),
				isloading: false,
				imageUrl: ''
			};
		},
		created() {
			// if (this.params.imgUrl != '') {
			// 	this.imageUrl = this.params.imgUrl;
			// }
		},
		watch: {
			imageUrls: {
				immediate: true,
				deep: true,
				handler(val, old) {
					console.log(val)
					this.imageUrl = val
					if(val){
						var path = val.split('/').pop()
						this.$emit('on-close', path);
					}
				}
			}
		},
		methods: {
			//点击放大
			blowUp() {
				this.$previewRefresh();
				document.getElementById(this.randId).click();
			},
			//上传成功
			handleAvatarSuccess(res, file) {
				if (res.status) {
					this.isloading = false
					this.imageUrl = res.url;
					var val = this.imageUrl.split('/').pop();
					this.$emit('on-close', val);
				} else {
					this.$message.error(res.Message);
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

				//图片压缩
				/*compress(file, function(val) {
				    console.log(val);
				    this.imageUrl = val
				    this.imgFile = val
				    this.imgFile = true
				})*/

			},
		},

	}
</script>
<style langt="less">
</style>
