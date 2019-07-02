<template>
	<div class="index">
		<el-container>
			<el-header>
				<Header></Header>
				<Navigate></Navigate>
			</el-header>
			<el-container>
				<el-aside>
					<MainLeft></MainLeft>
				</el-aside>
				<el-main>
					<keep-alive>
						<router-view v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>
					<router-view v-if="!$route.meta.keepAlive"></router-view>
				</el-main>

				<div class="bottom gr_bg">
					技术支持：湖南奥昇信息技术有限公司&nbsp;粤ICP备15054721号-2
				</div>

			</el-container>
		</el-container>

	</div>
</template>

<script>
	import MainLeft from 'components/common/left/mainLeft'
	import Header from 'components/common/header/header'
	import Navigate from 'components/common/navigate/navigate'
	export default {
		data() {
			return {
				isShow: false
			}
		},
		created() {
			/*if(!this.userData) {
				this.$router.push({
					path: '/login'
				})
			} else {

			}*/
		},
		components: {
			MainLeft,
			Header,
			Navigate
		},
	}
</script>

<style>
	th {
		text-align: center;
	}

	.el-header {
		padding: 0 !important;
	}

	.el-main {
		position: absolute;
		left: 221px;
		top: 90px;
		right: 0;
		bottom: 44px;
		overflow-y: scroll;
		transition: left .3s ease-in-out;
		background: #f8f8fa;
	}
</style>
