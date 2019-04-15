<template>
	<div class="wrapper">
		<image v-for="(bmUrl,index) in imageUrls" :key="index" class="i-imgB" :src="bmUrl">
	</div>
</template>

<script>
	export default {
		name: "carDetail",
		created() {
			setTimeout(params => {
				this.imageUrls = [
					"bmlocal://assets/cars/page1@2x.png",
					"bmlocal://assets/cars/page2@2x.png",
					"bmlocal://assets/cars/page3@2x.png",
					"bmlocal://assets/cars/page4@2x.png"
				];
			}, 100);
		},
		data() {
			return {
				imageUrls: null
			};
		}
	};
</script>

<style scoped>
	.i-imgB {
		position: relative;
		top: 0px;
		right: 0px;
		width: 750px;
		height: 1334px;
	}
</style>
