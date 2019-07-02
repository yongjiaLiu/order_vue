<template>
	<div>
		<el-form :model="firstForm" :inline="true" ref="firstForm" label-width="140px" class="searchFrame query-form">
			<el-col :span='24' v-for="(item,index) in firstFormObject" :key="index">
				<el-form-item :label="item.label" :rules="item.rules" :class="item.type==4?'areablock':''" v-if="item.type!=0&&!item.isShow">
					<el-input :disabled="isEdit" class="on_col" :class="item.error==true?'errorbox':''" @keyup.native="number(item)"
					 v-if="item.type==1" v-model="item.model" @blur="item.changes(item)" :placeholder="item.placeholder" size="medium"
					 clearable></el-input>
					<el-select :disabled="isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" v-else-if="item.type==2"
					 v-model="item.model" @blur="item.changes(item,publicArrays,dicObj)" @change="item.changes(item,publicArrays,dicObj)"
					 filterable clearable :placeholder="item.placeholder">
						<el-option v-for="it in item.array" :key="it.code" :label="it.name" :value="it.code"></el-option>
					</el-select>
					<el-cascader :disabled="isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" v-else-if="item.type==3"
					 :placeholder="item.placeholder" :options="item.array" :props="item.publicProps" v-model="item.model" change-on-select
					 filterable clearable @blur="item.changes(item)" @change="item.changes(item)"></el-cascader>
					<el-input :disabled="isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" @blur="item.changes(item)"
					 v-else-if="item.type==4" type="textarea" :placeholder="item.placeholder" :rows="3" clearable v-model="item.model"></el-input>
					<el-date-picker :disabled="isEdit" class="on_col" size="medium" :class="item.error==true?'errorbox':''" @blur="item.changes(item)"
					 v-else-if="item.type==5" v-model="item.model" value-format="yyyy-MM-dd" type="date" clearable :placeholder="item.placeholder"></el-date-picker>
					<el-radio-group :disabled="isEdit" v-else-if="item.type==6" v-model="item.model">
						<el-radio :label="it.label" v-for="(it,index) in item.list" :key="index"></el-radio>
					</el-radio-group>
					<el-radio-group :disabled="isEdit" class="eight" v-else-if="item.type==8" v-model="item.model">
						<el-radio :label="it.name" v-for="(it,index) in item.list" :key="index"></el-radio>
					</el-radio-group>
					<el-input :disabled="isEdit" class="on_col" :class="item.error==true?'errorbox':''" oninput="this.value=this.value.replace(/[^\-?\d.]/g,'')"
					 v-if="item.type==7" v-model="item.model" @blur="item.changes(item)" :placeholder="item.placeholder" size="medium"
					 clearable></el-input>
					<UploadMore v-if="item.type==9" @sendUrl="geturl" :fileLists="detailObj.descPic"></UploadMore>
					<Ueditor :ueModel="item.model" @contents="getUeditor" v-if="item.type==10"></Ueditor>
					<el-input disabled="disabled" class="on_col" :class="item.error==true?'errorbox':''" v-if="item.type==11" v-model="item.model"  :placeholder="item.placeholder" @click.native="openTag" size="medium"></el-input>
					<p class="error_p" v-if="item.error==true">{{item.message}}</p>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<div class="return">
					<el-button type="primary" v-if="!isEdit" v-preventReClick="3000" @click="submits()">确 定</el-button>
					<el-button @click="returns">返 回</el-button>
				</div>
			</el-col>
		</el-form>
		<DiaTag :dialogVisible="dialogVisible" :dataList="attrList" @tagList="getTagKey"></DiaTag>
	</div>
</template>

<script>
	import UploadMore from 'components/common/comModule/uploadMore'
	import Ueditor from 'components/common/comModule/ueditor'
	import DiaTag from 'components/common/comModule/diaTag'
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
			attrList:{
				type: Array
			}
		},
		components: {
			Ueditor,
			DiaTag,
			UploadMore
		},
		data() {
			return {
				dicObj: {},
				//性别容器
				sexArr: [],
				aaa:false,
				dialogVisible:false,
				//行政级联配置
				publicProps: {
					value: "id",
					label: "label"
				},
				picList:[]
			}
		},
		watch: {
			detailObj: { //监听表单变化
				handler(val, oldName) {
					console.log(val)
					for (var i in this.firstFormObject) {
						if(this.firstFormObject[i].type==3&&this.firstFormObject[i].model){	
							this.firstFormObject[i].model = val[i].split(",")
						}else if(this.firstFormObject[i].type==11){
							var sttr=[] ;
							for(var j in val[i]){
								sttr.push(val[i][j].name)
							}
							this.firstFormObject[i].model = sttr.toString()
						}else{
							this.firstFormObject[i].model = val[i]
						}		
					}
				},
				immediate: true,
				deep: true
			},
			firstFormObject:{
				handler(val, oldName) {
					for (var i in this.firstFormObject) {
						if(this.firstFormObject[i].type==3&&this.firstFormObject[i].model){	
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
			},
			picList:{
				handler(val, oldName) {
					console.log(val)
					if(val.length>0){
						for (var i in this.firstFormObject) {
							if(this.firstFormObject[i].type==9){	
								this.firstFormObject[i].model = val.toString()
							}		
						}	
					}
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			firstForms() {
				var obj = {};
				console.log(this.firstFormObject)
				for (var key in this.firstFormObject) {
					if(this.firstFormObject[key].type==3&&this.firstFormObject[key].model&&typeof(this.firstFormObject[key].model)=="object"){	
						obj[key] = this.firstFormObject[key].model[ this.firstFormObject[key].model.length-1]
					}if(this.firstFormObject[key].type==11){
						obj[key] = this.attrList
					}else{
						obj[key] = this.firstFormObject[key].model
					}		
				}
				return obj
			},
			validates() { //及時驗證
				var boos = false;
				for (var key in this.firstFormObject) {
					if (this.firstFormObject[key].rules && !this.firstFormObject[key].model) {
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
			number(item) {

			},
			geturl(url){	//获取图片路径
				this.picList = url
			},
			getTagKey(val,vals){
				console.log(val,vals)
				this.dialogVisible = false;
				for(var key in this.firstFormObject){
					if(this.firstFormObject[key].type==11){
						this.firstFormObject[key].model = vals
					}
				}
			},
			openTag(){
				var that = this;
				console.log(this.attrList)
				this.dialogVisible = true
			},
			getUeditor(val) {				
				var obj = {}
				for (var key in this.firstFormObject) {
					if (this.firstFormObject[key].type == 10 ) {
						this.firstFormObject[key].model = val
					}
				}
				console.log(this.firstFormObject)
			},
			submits() { //提交事件
				let that = this;
				console.log(this.firstForms)
				if (!this.validates) {
					var data = that.firstForms;
					this.$emit("trueAdd", data)
				}
			},
			returns() {
				let that = this;
				for (var i in that.firstFormObject) {
					that.firstFormObject[i].model = ""
				}
				this.$router.go(-1)
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
