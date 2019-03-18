<template>
	<div class="container-discovery">
		<div class="wrapper" style="background-color: #272C39">
			<!-- <scroller class="main-scroller" offset-accuracy="300px"> -->
			<refresher @loadingDown="loadingDown"></refresher>
			<div class="cell-button">
				<block-1></block-1>
			</div>
			<!-- </scroller> -->
			<!-- <bmmask animation="center" position="center" class="mask" :duration="300" ref="channel" disableMaskEvent="true"> -->
			<!-- </bmmask> -->
		</div>
	</div>
</template>
<script>
	import refresher from "../common/refresh";
	import header from "./header";
	import page from "./page";

	const SCROLL_FULL_WIDTH = 750;
	const dom = weex.requireModule("dom");

	export default {
		components: {
			refresher: refresher,
			"block-1": header,
			"page-1": page
		},
		created() {
			this.init();
		},
		data() {
			return {
				block1: {
					title: "",
					url: "",
					items: []
				},
				showLoading: "hide",
				activeIndex: 0,
				statusHeight: Number.parseInt(
					this.statusBarHeight || weex.config.env.statusBarHeight || 40
				)
			};
		},
		methods: {
			jumpWeb(_url) {
				this.$router.toWebView({
					url: _url,
					title: ""
				});
			},
			onloading() {
				this.$notice.loading.show();
				this.showLoading = "show";
				setTimeout(() => {
					this.$notice.loading.hide();
					this.goods3.push(...this.goods1);
					this.showLoading = "hide";
				}, 600);
			},
			loadingDown() {
				this.goods3 = [];
				this.goods3.push(...this.goods2);
				this.goods3.push(...this.goods1);
			},
			init() {},
			getBlock1() {
				// this.$fetch({
				//     method: 'GET',
				//     name: 'yanxuan_home_getBlock1',
				//     data: {}
				// }).then(resData => {
				//     this.block1.title = resData.data.title
				//     this.block1.url = resData.data.url
				//     this.block1.items = resData.data.items
				// }, error => {

				// })

				this.block1.title = BLOCK1.title;
				this.block1.url = BLOCK1.url;
				this.block1.items = BLOCK1.items;
			},
			getGoods1() {
				// this.$fetch({
				//     method: 'GET',
				//     name: 'yanxuan_home_getGoods1',
				//     data: {}
				// }).then(resData => {
				//     this.goods1 = resData.data
				// }, error => {

				// })

				this.goods1 = GOODS1;
			},
			onchange(index) {
				console.log(index);
				// dom.scrollToElement(this.$refs[`page_${index}`][0], { animated: false })
			}
		}
	};
</script>
<style lang="scss" src='../discover/news.scss'/>
