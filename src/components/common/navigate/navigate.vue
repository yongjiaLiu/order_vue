<template>
	<div class="top-nav">
		<div class="top-nav-left">
			<img src="static/img/nav-logo.png">
			<p>{{currentMenu.title}}</p>
		</div>
		<div class="top-nav-right">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="首页" name="Home">首页</el-tab-pane>
				<el-tab-pane v-if="currentMenu!=null" :label="currentMenu.title" :name="currentMenu.index">{{currentMenu.title}}</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		name: "navigate",
		data() {
			return {
				activeName: 'SuperviseIndex',
				menuName: ""
			};
		},
		computed: {
			//第三级菜单
			currentMenu() {
				if (this.$store.getters.currentMenu != null) {
					this.activeName = this.$store.getters.currentMenu.index;
					return this.$store.getters.currentMenu;
				} else {
					return null;
				}
			}
		},
		methods: {
			handleClick(tab, event) {
				this.$router.push(tab.name);
			}
		}
	}
</script>

<style lang="less">
	.top-nav {
        .el-tabs__item{
            height:auto !important;
        }
		border-top: 1px solid #e8e8ea;
		display: flex;
		height: 35px;
		background-color: #FFF;

		.top-nav-left {
			width: 221px;
			height: 35px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #f8f8fa;

			img {
				margin-right: 19px;
			}

			p {
				font-size: 14px;
				color: #6a7ffe;
			}
		}

		.top-nav-right {
			background-color: #FFF;
			overflow: hidden;

			.el-tabs {
				margin-left: 40px;
			}

			.el-tabs__item.is-active {
				color: #6a7ffe;
			}

			.el-tabs__item {
				line-height: 35px;
				color: #969696;
			}
		}
	}
</style>
