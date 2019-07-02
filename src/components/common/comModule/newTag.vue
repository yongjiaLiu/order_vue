<template>
	<div>
		<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
			{{tag}}
		</el-tag>
		<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
		 @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
		</el-input>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
	</div>
</template>

<script>
	export default {
		props: {
			dataStr: {
				type: String
			},
			index:{
				type:Number
			}
		},
		data() {
			return {
				dynamicTags: [],
				inputVisible: false,
				inputValue: ''
			};
		},
		watch: {
			dataStr: {
				handler(val, oldName) {
					console.log(val)
					if (val) {
						this.dynamicTags = val.split(",")
					} else {
						this.dynamicTags = []
					}
				},
				immediate: true,
				deep: true
			},

		},
		methods: {
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
				var data = this.dynamicTags.toString()
				var key = this.index
				this.$emit("trueAdd", data,key)
				this.inputVisible = false;
				this.inputValue = '';
			}
		}
	};
</script>

<style scoped>
	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>
