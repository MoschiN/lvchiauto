<template>
	<div class="wrapper">
		<scroller class="main-scroller" offset-accuracy="300px">
			<refresher @loadingDown="loadingDown"></refresher>
			<div class="cell-button">
				<carDetail-1></carDetail-1>
			</div>
		</scroller>
	</div>
</template>
<script>
	import refresher from "../common/refresh";
	import carDetail from "./carDetail";

	const SCROLL_FULL_WIDTH = 750;
	const dom = weex.requireModule("dom");

	export default {
		components: {
			refresher: refresher,
			"carDetail-1": carDetail
		},
		created() {
			this.init();
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>
<style lang="sass" src="./index.scss"></style>
