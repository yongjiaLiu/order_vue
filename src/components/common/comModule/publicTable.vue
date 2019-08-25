<template>
	<div>
		<el-form :model="firstForm" :inline="true" ref="firstForm" label-width="200px" class="searchFrame query-form">
			<el-col :span="24" v-for="(item,index) in firstFormObject" :key="index">
				<el-form-item :label="item.label" :rules="item.rules" :class="item.type==4?'areablock':''" v-if="item.type!=0&&!item.isShow">
					<el-input :disabled="item.isEdit" class="on_col" :class="item.error==true?'errorbox':''" v-if="item.type==1"
					 v-model="item.model" @blur="item.changes(item)" :placeholder="item.placeholder" size="medium" clearable></el-input>
					<el-select :disabled="item.isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" v-else-if="item.type==2"
					 v-model="item.model" @blur="item.changes(item,publicArrays,dicObj)" @change="item.changes(item,publicArrays,dicObj)"
					 filterable clearable :placeholder="item.placeholder">
						<el-option v-for="it in item.array" :key="it.code" :label="it.name" :value="it.code"></el-option>
					</el-select>
					<el-cascader :disabled="item.isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''"
					 v-else-if="item.type==3" :placeholder="item.placeholder" :options="item.array" :props="item.publicProps" v-model="item.model"
					 filterable clearable @blur="item.changes(item)" @change="item.changes(item)"></el-cascader>
					<el-input :disabled="item.isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" @blur="item.changes(item)"
					 v-else-if="item.type==4" type="textarea" :placeholder="item.placeholder" :rows="3" clearable v-model="item.model"></el-input>
					<el-date-picker :disabled="item.isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" @blur="item.changes(item)"
					 v-else-if="item.type==5" v-model="item.model" value-format="yyyy-MM-dd" type="date" clearable :placeholder="item.placeholder"></el-date-picker>
					<el-radio-group :disabled="item.isEdit" v-else-if="item.type==6" v-model="item.model" @blur="item.changes(item)"
					 @change="item.changes(item)">
						<el-radio :label="it.label" v-for="(it,index) in item.list" :key="index">{{it.name}}</el-radio>
					</el-radio-group>
					<el-radio-group :disabled="item.isEdit" class="eight" v-else-if="item.type==8" v-model="item.model">
						<el-radio :label="it.name" v-for="(it,index) in item.list" :key="index"></el-radio>
					</el-radio-group>
					<el-input :disabled="item.isEdit" class="on_col" :class="item.error==true?'errorbox':''" oninput="this.value=this.value.replace(/[^\-?\d.]/g,'')"
					 v-if="item.type==7" v-model="item.model" @blur="item.changes(item)" :placeholder="item.placeholder" size="medium"
					 clearable></el-input>
					<el-select :disabled="item.isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" v-else-if="item.type==9"
					 v-model="item.model" @blur="item.changes(item,publicArrays,dicObj)" @change="item.changes(item,publicArrays,dicObj)"
					 multiple collapse-tags filterable clearable :placeholder="item.placeholder">
						<el-option v-for="it in item.array" :key="it.code" :label="it.name" :value="it.code"></el-option>
					</el-select>
					<Ueditor :ueModel="item.model" @contents="getUeditor" v-if="item.type==10"></Ueditor>
					<el-input disabled="disabled" class="on_col" :class="item.error==true?'errorbox':''" v-if="item.type==11" v-model="item.model"  :placeholder="item.placeholder" @click.native="openTag" size="medium"></el-input>
					<p class="error_p" v-if="item.error==true">{{item.message}}</p>
				</el-form-item>
			</el-col>
			<el-col v-if="isUpload">
				<el-form-item label="图片:">
					<UploadImg :imageUrls="imageUrl" @on-close="getImg"></UploadImg>
				</el-form-item>
			</el-col>
			<DiaTag :dialogVisible="dialogVisible" :dataList="attrList" @tagList="getTagKey"></DiaTag>
			<el-col :span="24">
				<div class="return" style="display: flex;justify-content: center">
					<el-button class="portBtn" @click="returns">取消</el-button>
					<el-button type="primary" class="addBtn" v-if="!isEdit" v-preventReClick="3000" @click="submits()">{{btnName}}</el-button>
				</div>
			</el-col>
		</el-form>
	</div>
</template>

<script>
	import {
		Message,
		MessageBox
	} from 'element-ui';
	import Ueditor from 'components/common/comModule/ueditor'
	import DiaTag from 'components/common/comModule/diaTag'
	import UploadImg from 'components/common/comModule/uploadImg'
	export default {
		props: {
			provinceCityOptions: {
				type: Array
			},
			firstForm: {
				type: Object
			},
			firstFormObject: {
				type: Object, //type: 1:input 2:select 3:cascader 4:textarea 5:picker 6:radio
			},
			publicArrays: {
				type: Object
			},
			dictArrayObj: {
				type: Object
			},
			isEdit: {
				type: Boolean,
				default: false
			},
			detailObj: {
				type: Object
			},
			attrList: {
				type: Array
			},
			btnName: {
				type: String,
				default: "确 定"
			},
			isModal: { //是否为模态框
				type: Boolean,
				default: false
			},
			isUpload: {
				type: Boolean,
				default: false
			},
		},
		components: {
			UploadImg,
			Ueditor,
			DiaTag
		},
		data() {
			return {
				dicObj: {},
				//性别容器
				sexArr: [],
				aaa: false,
				dialogVisible: false,
				//行政级联配置
				publicProps: {
					value: "id",
					label: "label"
				},
				picList: [],
				fileList: [],
				fileLists: [],
				imageUrl: '',
				img:''
			}
		},
		watch: {
			fileList: {
				handler(val, oldName) {
					this.fileLists = []
					if (val.length > 0) {
						for (let i in val) {
							this.fileLists.push(val[i].url)
						}
					}
				},
				deep: true
			},
			detailObj: { //监听表单变化
				handler(val, oldName) {
					for (var i in val) {
						if (this.firstFormObject[i]) {
							if (this.firstFormObject[i].type == 3 && val[i]) {
								console.log(val[i])
								this.firstFormObject[i].model = val[i]
							} else if (this.firstFormObject[i].type == 9 && val[i]) {
								this.firstFormObject[i].model = val[i].split(",")
							} else if (this.firstFormObject[i].type == 11) {
								var sttr = [];
								for (var j in val[i]) {
									sttr.push(val[i][j].name)
								}
								this.firstFormObject[i].model = sttr.toString()
							} else {
								this.firstFormObject[i].model = val[i]
							}
						}
						if (i == 'pic') {
							if (val[i]) {
								this.imageUrl = val[i]
							}

						} else {

						}
					}
				},
				immediate: true,
				deep: true
			},
			firstFormObject: {
				handler(val, oldName) {
					for (var i in this.firstFormObject) {
						if (this.firstFormObject[i].type == 3 && this.firstFormObject[i].model) {
							var arr = this.firstFormObject[i].model
							this.$emit("caValue", arr)
						}
					}
				},
				immediate: true,
				deep: true
			},
			dictArrayObj: {
				handler(newName, oldName) {
					this.dicObj = newName;
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			firstForms() {
				var obj = {};
				for (var key in this.firstFormObject) {
					if (this.firstFormObject[key].type == 3 && this.firstFormObject[key].model && typeof(this.firstFormObject[key].model) ==
						"object") {
						obj[key] = this.firstFormObject[key].model.slice(-1)
					} else if (this.firstFormObject[key].type == 9 && this.firstFormObject[key].model.length > 0 && typeof(this.firstFormObject[
							key].model) ==
						"object") {
						obj[key] = this.firstFormObject[key].model.join(' ')
					} else if (this.firstFormObject[key].type == 11) {
						obj[key] = this.attrList
					} else {
						obj[key] = this.firstFormObject[key].model
					}
				}
				return obj
			},
			validates() { //及時驗證
				var boos = false;
				for (var key in this.firstFormObject) {
					if (this.firstFormObject[key].error == true || (this.firstFormObject[key].rules && !this.firstFormObject[key].model &&
							this.firstFormObject[key].model !== 0)) {
						this.firstFormObject[key].error = true;
						boos = true
					} else {
						this.firstFormObject[key].error = false;
					}
				}
				return boos
			},
			objLength() {
				var keys = []
				for (var key in this.firstFormObject) {
					keys.push(key)
				}
				return keys.length
			},
		},
		created() {

		},
		methods: {
			getImg(val) {
				this.img = val
			},
			handleRemove(file, fileList) { //移除图
				this.fileLists = []
				for (let i in fileList) {
					this.fileLists.push(fileList[i].url)
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
			uploadHeaders: function() {
				var headders = {};
				headders.channel = "web";
				headders.token = this.token;
				return headders;
			},
			handleAvatarSuccess(res, file) {
				//刷新数据
				this.fileLists.push(res.data.picture)
			},
			number(item) {

			},
			geturl(url) { //获取图片路径
				this.picList = url
			},
			getTagKey(val, vals) {
				console.log(val, vals)
				this.dialogVisible = false;
				for (var key in this.firstFormObject) {
					if (this.firstFormObject[key].type == 11) {
						this.firstFormObject[key].model = vals
					}
				}
			},
			openTag() {
				var that = this;
				console.log(this.attrList)
				this.dialogVisible = true
			},
			getUeditor(val) {
				var obj = {}
				for (var key in this.firstFormObject) {
					if (this.firstFormObject[key].type == 10) {
						this.firstFormObject[key].model = val
					}
				}
				console.log(this.firstFormObject)
			},
			submits() { //提交事件
				let that = this;
				if (!this.validates) {
					var data = that.firstForms;
					if (this.isUpload == true) {
						data.pic = this.img
					}
					this.$emit("trueAdd", data);
				}
			},
			returns() {
				let that = this;
				let isEdit_content = false; //判断是否对内容有做修改
				for (var i in that.firstFormObject) {
					if (that.firstFormObject[i].model == "" || that.firstFormObject[i].model == that.detailObj[i]) {
						that.firstFormObject[i].error = false;
						that.firstFormObject[i].model = ""
					} else {
						isEdit_content = true;
					}
				}
				if (isEdit_content == false) { //if没有做修改，直接跳出方法关闭页面或者弹出层
					if (this.isModal) {
						var bools = false
						this.$emit("diaSta", bools);
						this.picList = [];
						this.fileList = [];
						this.fileLists = [];
						for (var i in that.firstFormObject) {
							if (that.firstFormObject[i].model == "" || that.firstFormObject[i].model == that.detailObj[i]) {
								that.firstFormObject[i].model = "";
								that.firstFormObject[i].error = false;
							}
						}
					} else {
						this.$router.go(-1)
					}
					return
				}
				MessageBox.confirm('确定后，数据将不做任何修改！', '确认不保存所做修改吗？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					for (var i in that.firstFormObject) {
						that.firstFormObject[i].model = "";
						that.firstFormObject[i].error = false
					}
					if (this.isModal) {
						var bools = false
						this.$emit("diaSta", bools)
						this.picList = [];
						this.fileList = [];
						this.fileLists = []
					} else {
						this.$router.go(-1)
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		},
	}
</script>

<style lang="less">
	.query-form {
		overflow: hidden
	}

	.error_p {
		margin: 0;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		color: #F56C6C;
		top: 100%;
		left: 0;
	}
	.on_col {
		width: 100% !important;
	}
	.container-table .searchFrame .el-form-item {
		width: 100% !important;
	}

	.container-table .searchFrame .el-form-item {
		margin-bottom: 22px !important;
	}

	.el-form-item .is-required .areablock {
		width: 100% !important;
	}

	.el-form-item__content {
		width: 70% !important;
	}
</style>
