<template>
	<div class="container-table">
		<UploadMore></UploadMore>
		<UploadImg :params="{}"></UploadImg>
	</div>
</template>

<script>
	import UploadMore from 'components/common/comModule/uploadMore'
	import UploadImg from 'components/common/comModule/uploadImg'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			// 收起展开
			
		},
		components: {
			UploadMore,
			UploadImg
		},
		methods: {
			
		}

	}
</script>

<style scoped lang="less">


</style>
