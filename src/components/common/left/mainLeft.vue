<template>
	<div class="sidebar">
		<el-menu mode="vertical" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" select="" text-color="#e7eafb"
		 active-text-color="#000" unique-opened router @select="handleSelect" :popper-append-to-body="true">
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template slot="title">{{ subItem.title }}</template>
								<el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
									{{ threeItem.title }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">
								{{ subItem.title }}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				collapse: false,
				items: []
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path;
			}
		},
		created() {
			this.getMenu();
			this.handleSelect(this.$route.path)
		},
		methods: {
			handleSelect(index, indexPath) {
				//搜索路由数组保存，显示在当前路由导航
				let currentMenu = this.items.find((item) => {
					return item.index === index;
				});
				console.log(currentMenu)
				if (currentMenu != undefined) {
					sessionStorage.setItem('currentMenu', JSON.stringify(currentMenu));
					this.$store.dispatch('currentMenu', currentMenu);
					if (currentMenu.sysPermissionModels) {
						var fathers = currentMenu.sysPermissionModels;
						var sonPermission = [];
						fathers.forEach(function(item) {
							item.permissId = item.permissId.toString()
							sonPermission.push(Number(item.permissId.charAt(item.permissId.length - 1)))
						})
						console.log(sonPermission)
						sessionStorage.setItem('perList', JSON.stringify(sonPermission));
						this.$store.dispatch('setPerLists', sonPermission);
					}

				}

			},
			getMenu() {
				let that = this;
				var list = [];
				list = this.$global.routerList;
				/* list.forEach(function(item, index, val) {
					item.title = item.permissName;
					item.index = item.url;
				}) */
				this.items = list;
			}
		}
	}
</script>

<style>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 90px;
		bottom: 0;
		overflow-y: scroll;
		z-index: 999;
		background: linear-gradient(#6a7ffe, #178fff);
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu {
		background: linear-gradient(#6a7ffe, #178fff);
	}

	.sidebar-el-menu :hover {
		background-color: #596eeb;
	}

	.el-menu-item:focus,
	.el-menu-item:hover {
		background-color: #596eeb;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 221px;
	}

	.sidebar>ul {
		height: 100%;
	}
	.el-submenu .el-menu{
		background: #6a7ffe;
		text-indent: 24px;
	}
</style>
