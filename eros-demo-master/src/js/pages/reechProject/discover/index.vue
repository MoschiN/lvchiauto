<template>
	<div>
		<div class="topTab">
			<image
				style="width:32px;height:32px;margin-left:30px;margin-right:100px;"
				src="bmlocal://assets/discovery_search_icon.png"
				@click="onClikSearch"
			>
			<div
				class="topTabItem"
				v-for="(text,index) in topTabs"
				:key="index"
				@click="onTopTabClick(index)"
			>
				<text
					class="tabItemText"
					:style="{color:index===curIndex?textActiveColor:textColor,size:textSize,}"
				>{{ topTabs[index]}}</text>
			</div>
			<image
				style="width:68px;height:68px;margin-right:18px;margin-left:100px;"
				src="bmlocal://assets/add_icon.png"
				@click="onClickPushDynamic"
			>
		</div>
		<div style="height:2px;background-color:#212531;flex-direction:column;">
			<!-- <div class="slideBlock" v-f v-for="(text,index) in topTabs" :key="index"></div> -->
		</div>
		<slider class="container" infinite="false" :index="curIndex" @change="changePage">
			<d-news
				:discoverData="discoverData0"
				:isLoadingShow="isLoadingShow"
				:isRefreshShow="isRefreshShow"
				:index="0"
				style="width:auto;"
			></d-news>
			<d-news
				:discoverData="discoverData1"
				:isLoadingShow="isLoadingShow"
				:isRefreshShow="isRefreshShow"
				:index="1"
				style="width:auto;"
			></d-news>
			<d-news
				:discoverData="discoverData2"
				:isLoadingShow="isLoadingShow"
				:isRefreshShow="isRefreshShow"
				:index="2"
				style="width:auto;"
			></d-news>
		</slider>
	</div>
</template>
<style scoped>
	.slideBlock {
		height: 2px;
		width: 80px;
		background-color: blue;
	}
	.topTab {
		height: 88px;
		background-color: #272c39;
		flex-direction: row;
		align-items: center;
	}
	.topTabItem {
		flex: 1;
		justify-content: center;
	}
	.tabItemText {
		text-align: center;
	}
	.container {
		background-color: #272c39;
		flex-direction: column;
		width: auto;
		flex: 1;
	}
</style>
<script>
	import dNews from "./news.vue";
	import paramDao from "../paramDao";
	const modal = weex.requireModule("modal");
	const dom = weex.requireModule("dom");
	export default {
		created() {
			// 注册请求方法
			this.$event.on("discoveryQ", params => {
				if (params.isRefresh < 0) {
					this.discoverDateParams[params.index].start = 0;
					return;
				}
				// 如果不在当前标签则切换
				if (params.index !== this.curIndex && params.index < 3) {
					this.curIndex = params.index;
				}

				if (params.isRefresh === 1) {
					this.discoverDateParams[params.index].start = 0;
					if (params.index === 0) {
						paramDao.clearArray(this.discoverData0);
						this.discoverData0 = null;
					} else if (params.index === 1) {
						paramDao.clearArray(this.discoverData1);
						this.discoverData1 = null;
					} else if (params.index === 2) {
						paramDao.clearArray(this.discoverData2);
						this.discoverData2 = null;
					}
				}
				this.discoveryQuery(
					this.getDiscoveryParams(
						params.index,
						params.isRefresh,
						typeof params.searchCondition === "undefined"
							? null
							: params.searchCondition,
						typeof params.dataLength === "undefined" ? 0 : params.dataLength
					)
				);
			});

			// 初始化推荐页
			this.$event.emit("discoveryQ", { index: 0, isRefresh: 0 });
		},
		components: {
			"d-news": dNews
		},

		methods: {
			// 资讯和动态搜索
			onClikSearch() {
				this.$router.open({
					name: "discoverSearch",
					type: "PUSH",
					params: {
						curIndex: this.curIndex
					}
				});
			},
			// 发布动态页
			onClickPushDynamic() {
				this.$router.open({
					name: "pushDynamic",
					type: "PUSH"
				});
			},
			onTopTabClick(index) {
				this.curIndex = index;
			},
			toast(msg) {
				modal.toast({
					message: msg,
					duration: 0.3
				});
			},
			// 获取连接api的name
			getDiscoveryParams(index, isRefresh, searchCondition, dataLength) {
				var fetchName;
				var pageNum = this.discoverDateParams[index].pageNum;
				var start = this.discoverDateParams[index].start;
				if (index === 0) {
					fetchName = "DISCOVERY.queryShare";
				} else if (index === 1) {
					fetchName = "DISCOVERY.queryNews";
				} else if (index === 2) {
					fetchName = "DISCOVERY.queryDynamic";
				} else if (index === 3) {
					fetchName = "DISCOVERY.searchDynamic";
				}
				var paramJson = {};
				paramJson.fetchName = fetchName;
				paramJson.pageNum = pageNum;
				paramJson.start = start;
				paramJson.index = index;
				paramJson.isRefresh = isRefresh;
				paramJson.dataLength = dataLength;
				if (searchCondition != null) paramJson.searchCondition = searchCondition;
				return paramJson;
			},
			changePage(event) {
				this.curIndex = event.index;
				this.$event.emit("discoveryQ", { index: event.index, isRefresh: 0 });
			},
			// 获取资讯
			discoveryQuery(params) {
				var loginInfo = this.$storage.getSync("loginInfo");
				if (!loginInfo) return;
				var paramMap = new Map();
				paramMap.set("userId", loginInfo.data.userInfo.userId);
				paramMap.set("pageNum", params.pageNum);
				if (params.index === 3) {
					paramMap.set("context", params.searchCondition);
				}
				paramMap.set("start", params.start);
				paramMap.set("status", "Y");
				console.log(paramMap);
				this.$fetch({
					method: "POST", // 大写
					name: params.fetchName, //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
					data: paramDao.getParamsJSON(paramMap),
					header: {
						Authorization: "Bearer  " + loginInfo.data.token.access_token
					}
				}).then(
					resData => {
						console.log(resData);

						this.$event.emit("refreshOrLoading", {
							isRefreshShow: false,
							isLoadingShow: false
						});
						// 为别的界面添加数据
						if (params.index === 3) {
							this.$event.emit("discoveryS", {
								data: resData.data.context,
								isRefresh: params.isRefresh
							});

							var dataLength = 0;
							if (typeof params.dataLength !== "undefined") {
								dataLength = params.dataLength;
							}
							this.discoverDateParams[params.index].start =
								resData.data.context.length + dataLength;
							return;
						}

						if (params.isRefresh === 1) {
							this.isRefreshShow = false;
							setTimeout(handler => {
								this.isRefreshShow = true;
							}, 500);
						} else if (params.isRefresh === 2) {
							this.isLoadingShow = false;
							setTimeout(handler => {
								this.isLoadingShow = true;
							}, 500);
						}
						//

						if (params.isRefresh === 2) {
							if (params.index === 0) {
								this.discoverData0.push.apply(
									this.discoverData0,
									resData.data.context
								);
							} else if (params.index === 1) {
								this.discoverData1.push.apply(
									this.discoverData1,
									resData.data.context
								);
							} else if (params.index === 2) {
								this.discoverData2.push.apply(
									this.discoverData2,
									resData.data.context
								);
							}
						} else {
							if (params.index === 0) {
								if (
									params.isRefresh === 1 ||
									this.discoverData0 == null ||
									this.discoverData0.length == 0
								) {
									//   if(this.discoverData0!=null){
									//       paramDao.clearArray(this.discoverData0)
									//   }
									this.discoverData0 = resData.data.context;
								}
							} else if (params.index === 1) {
								if (
									params.isRefresh === 1 ||
									this.discoverData1 == null ||
									this.discoverData1.length == 0
								) {
									//   if(this.discoverData1!=null){
									//       paramDao.clearArray(this.discoverData1)
									//   }
									this.discoverData1 = resData.data.context;
								}
							} else if (params.index === 2) {
								if (
									params.isRefresh === 1 ||
									this.discoverData2 == null ||
									this.discoverData2.length == 0
								) {
									//   if(this.discoverData2!=null){
									//       paramDao.clearArray(this.discoverData2)
									//   }
									this.discoverData2 = resData.data.context;
								}
							}
							if (params.isRefresh === 1) {
								this.$event.emit("scrollToFirst_" + params.index);
							}
						}

						// 处理分页参数
						if (params.index === 0) {
							this.discoverDateParams[
								params.index
							].start = this.discoverData0.length;
							//      this.$notice.toast({
							//         message:this.discoverData0
							//    })
						} else if (params.index === 1) {
							this.discoverDateParams[
								params.index
							].start = this.discoverData1.length;
							//      this.$notice.toast({
							//         message:this.discoverData1
							//    })
						} else if (params.index === 2) {
							this.discoverDateParams[
								params.index
							].start = this.discoverData2.length;
							//      this.$notice.toast({
							//         message:this.discoverData2
							//    })
						}
					},
					error => {
						// 错误回调
						this.$notice.toast({
							message: error
						});
						if (params.index === 3) {
							this.$event.emit("refreshOrLoading", {
								isRefreshShow: false,
								isLoadingShow: false
							});
							return;
						}
						if (params.isRefresh === 1) {
							this.isRefreshShow = false;
							setTimeout(handler => {
								this.isRefreshShow = true;
							}, 500);
						} else if (params.isRefresh === 2) {
							this.isLoadingShow = false;
							setTimeout(handler => {
								this.isLoadingShow = true;
							}, 500);
						}
						console.log(error);
					}
				);
			}
		},

		data() {
			return {
				isLoadingShow: true,
				isRefreshShow: true,
				discoverData0: [],
				discoverData1: [],
				discoverData2: [],
				discoverDateParams: [
					{
						pageNum: 10,
						start: 0
					},
					{
						pageNum: 10,
						start: 0
					},
					{
						pageNum: 10,
						start: 0
					},
					{
						pageNum: 10,
						start: 0
					}
				],
				curIndex: 0,
				textAlign: "center",
				textColor: "#9BA3B2",
				textActiveColor: "#43CBA8",
				textSize: 32,
				topTabs: ["推荐", "资讯", "动态"],
				statusHeight: Number.parseInt(
					this.statusBarHeight || weex.config.env.statusBarHeight || 40
				),
				tHeight: Number.parseInt(WXEnvironment.deviceHeight)
			};
		}
	};
</script>
