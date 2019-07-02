<template>
	<div class="edit_container">
		<!--  新增时输入 -->
		<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
		 @change="onEditorChange($event)">
		</quill-editor>
	</div>
</template>
<script>
	import {quillEditor} from "vue-quill-editor"; //调用编辑器
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	export default {
		components: {
			quillEditor
		},
		data() {
			return {
				content:'',
				str: '',
				editorOption: {}
			}
		},
		props: {
			ueModel: {
				type: String,
				default: null
			},
		},
		methods: {
			onEditorReady(editor) { // 准备编辑器

			},
			onEditorBlur() {
				console.log(this.content);
				var models = this.content
				this.$emit("contents", models)
			}, // 失去焦点事件
			onEditorFocus() {}, // 获得焦点事件
			onEditorChange() {
				
			}, // 内容改变事件
			// 转码
			escapeStringHTML(str) {
				str = str.replace(/&lt;/g, '<');
				str = str.replace(/&gt;/g, '>');
				return str;
			}
		},
		watch: {
			ueModel(newValue, oldValue) {	//监听父组件model值变化
				this.content = newValue
			}
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
		},
		mounted() {
			console.log(this.ueModel)
			this.content= this.ueModel; // 请求后台返回的内容字符串
			//this.content = this.escapeStringHTML(content);
		}
	}
</script>
<style scoped lang="less">
	.ql-editor,
	.ql-container,
	.ql-snow {
		height: 300px !important;
	}
	.editor_div{
		height: 300px!important;
	}
	.quill-editor {
        margin-bottom: 80px;
		height: 200px;
	}
    #toolbar>span>span.ql-picker-label::before{position: absolute!important;}
    #toolbar{height: auto!important;}
</style>