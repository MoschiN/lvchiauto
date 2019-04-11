<template>
	<list class="r-list container-discovery">
		<refresh
			@refresh="onRefresh"
			@pullingdown="onPullingdown"
			:display="isRefreshShow?'show':'hide'"
			style="align-items:center;"
		>
			<div style="flex-direction:row;justify-content:center;align-items:center;padding:43px;">
				<image style="width:51px;height:58px;margin-right:16px;" src="bmlocal://assets/icon_static.png">
				<div>
					<text style="size:26px;color:#868C97;">{{refreshStateStr}}</text>
					<text style="size:26px;color:#868C97;margin-top:4px;">{{lastRefreshTime}}</text>
				</div>
			</div>
		</refresh>
		<cell
			v-for="(item,index) in discoverData"
			:key="index"
			:ref="'cell_'+index"
			@click="onclickitem(item,index,false)"
			style="width:678px;"
		>
			<div style="flex-direction:colum;align-items:center;margin-top:44px;">
				<image
					style="background-color:#323845;margin-right:24px;width:64px;height:64px;border-radius:32px;"
					v-if="'news'!=item.isNews"
					:src="typeof item.pushUserHeadPortraitUrl==='undefined' ||item.pushUserHeadPortraitUrl==='null'?'bmlocal://assets/upload_head_icon.png':item.pushUserHeadPortraitUrl"
				>
				<text class="d-title">{{'news'==item.isNews?item.title:item.pushUserNick}}</text>
				<image
					style="width:44px;height:44px;margin-left:24px;"
					v-if="'news'!=item.isNews"
					src="bmlocal://assets/follow.png"
				>
			</div>
			<text
				style="size:28px;color:white;margin-top:24px;lines:5;text-overflow:ellipsis;"
				v-if="'news'!=item.isNews"
			>{{item.title}}</text>
			<!-- 图片显示区 -->
			<div
				v-if="typeof item.imagesUrl!=='undefined'&&item.imagesUrl!=null&&item.imagesUrl!=='null'"
				style="flex-direction:colum;margin-top:28px;margin-bottom:28px;height:308px;"
			>
				<!-- 只有一张 -->
				<image
					style="background-color:#323845;"
					v-if="getImageUrlNums(item.imagesUrl)!==2"
					:class="[getImageUrlNums(item.imagesUrl)===1?'d-image':'d-image-left']"
					resize="cover"
					:src="item.imagesUrl.split(',')[0]"
				>
				<!-- 只有两张 -->
				<div v-if="getImageUrlNums(item.imagesUrl)===2" class="d-image" style="flex-direction:colum;">
					<image
						style="background-color:#323845;flex:1;"
						resize="cover"
						:src="item.imagesUrl.split(',')[0]"
					>
					<image
						style="background-color:#323845;flex:1;margin-left:12px;"
						resize="cover"
						:src="item.imagesUrl.split(',')[1]"
					>
				</div>
				<!-- 三张或三张以上 -->
				<div v-if="getImageUrlNums(item.imagesUrl)>=3" class="d-image-right" style="margin-left:12px;">
					<image
						style="background-color:#323845;flex:1;"
						resize="cover"
						:src="item.imagesUrl.split(',')[1]"
					>
					<image
						style="background-color:#323845;margin-top:12px;flex:1;"
						resize="cover"
						:src="item.imagesUrl.split(',')[2]"
					>
					<text
						v-if="getImageUrlNums(item.imagesUrl)>3"
						style="size:28px;color:#FFFFFF;position:absolute;bottom:0px;right:12px;"
					>{{getImageUrlNums(item.imagesUrl)}}</text>
				</div>
			</div>
			<div class="layout-h">
				<text class="d-state-text" style="flex:1;">{{item.createTime}}</text>
				<image
					style="width:44px;height:44px;"
					src="bmlocal://assets/review_icon.png"
					@click="onclickitem(item,index,true)"
				>
				<text class="d-state-text" style="margin-right:4px;">{{item.commentNum}}</text>
				<image
					v-if="'news'==item.isNews"
					style="width:34px;height:21px;margin-left:39px;"
					src="bmlocal://assets/browse_num.png"
				>
				<image
					v-if="'news'!=item.isNews"
					style="width:44px;height:44px;margni-left:40px;"
					:src="item.hasLike?'bmlocal://assets/like_icon.png':'bmlocal://assets/un_like_icon.png'"
					@click="onlike(item,index)"
				>
				<text
					class="d-state-text"
					style="margin-left:8px;"
				>{{'news'==item.isNews?item.browseNum:item.likeNum}}</text>
			</div>
			<div style="width:auto;height:1px;background-color:#1A2131;margin-top:45px;"></div>
		</cell>
		<loading @loading="onLoading" :display="isLoadingShow?'show':'hide'" style="align-items:center;">
			<div style="flex-direction:row;justify-content:center;align-items:center;padding:43px;">
				<image style="width:51px;height:58px;margin-right:16px;" src="bmlocal://assets/icon_static.png">
				<div>
					<text style="size:26px;color:#868C97;">{{loadingStateStr}}</text>
					<text style="size:26px;color:#868C97;margin-top:4px;">{{lastLoadingTime}}</text>
				</div>
			</div>
		</loading>
	</list>
</template>

<script>
	var modal = weex.requireModule("modal");
	var dom = weex.requireModule("dom");
	import paramDao from "../paramDao";
	export default {
		props: ["discoverData", "isRefreshShow", "isLoadingShow", "index"],
		created() {
			this.loginInfo = this.$storage.getSync("loginInfo");
			// 添加喜欢
			this.$event.on("onlike_" + this.index, itemData => {
				this.onlike(itemData, -1);
			});
			// 添加浏览数
			this.$event.on("addBrowser_" + this.index, itemData => {
				this.discoverData[itemData.position].browseNum++;
			});
			// 添加评论数
			this.$event.on("addComment_" + this.index, itemData => {
				this.discoverData[itemData.position].commentNum++;
			});
			// 判断是否滚动到第一项
			this.$event.on("scrollToFirst_" + this.index, itemData => {
				if (typeof this.$refs.cell_0 !== "undefined")
					dom.scrollToElement(this.$refs.cell_0[0], {});
			});
			this.$event.on("refreshOrLoading", params => {
				this.lastRefreshTime = "最后更新：" + paramDao.dateFormat();
				this.lastLoadingTime = "最后加载：" + paramDao.dateFormat();
			});
		},
		components: {},
		data() {
			return {
				test: false,
				loginInfo: null,
				refreshStateStr: "下拉刷新",
				lastRefreshTime: "最后更新：" + paramDao.dateFormat(),
				loadingStateStr: "上拉加载",
				lastLoadingTime: "最后加载：" + paramDao.dateFormat(),
				detailRountName: "discoverdetail"
			};
		},

		methods: {
			getImageUrlNums(imagesUrl) {
				if (typeof imagesUrl !== "undefined" && imagesUrl != null) {
					var imagesUrlArray = imagesUrl.split(",");
					if (imagesUrlArray != null) {
						while (
							imagesUrlArray.length > 0 &&
							imagesUrlArray[imagesUrlArray.length - 1] === ""
						) {
							imagesUrlArray.pop();
						}
						return imagesUrlArray.length;
					}
				}
				return 0;
			},
			//  动态的点赞和取消点赞
			onlike(itemData, index) {
				var paramMap = new Map();
				paramMap.set("newsShareId", itemData.id);
				paramMap.set("userId", this.loginInfo.data.userInfo.userId);
				this.$fetch({
					method: "POST", // 大写
					name: !itemData.hasLike
						? "DISCOVERY.addlikes"
						: "DISCOVERY.removeLikes", //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
					data: paramDao.getParamsJSON(paramMap),
					header: {
						Authorization: "Bearer  " + this.loginInfo.data.token.access_token
					}
				}).then(
					resData => {
						if (resData.code === 1000) {
							if (index < 0 && typeof itemData.position === "undefined") {
								this.$event.emit("onLikeInfoChange");
								return;
							}
							const position = index < 0 ? itemData.position : index;
							this.discoverData[position].hasLike = !itemData.hasLike;

							if (this.discoverData[position].hasLike) {
								this.discoverData[position].likeNum++;
							} else {
								this.discoverData[position].likeNum--;
							}
							if (index < 0) {
								this.$event.emit("onLikeInfoChange", {
									hasLike: this.discoverData[position].hasLike,
									likeNum: this.discoverData[position].likeNum
								});
							}
						}
					},
					error => {
						// 错误回调
						this.$notice.toast({
							message: error
						});
						console.log(error);
					}
				);
			},
			onLoading() {
				this.$event.emit("discoveryQ", { index: this.index, isRefresh: 2 });
			},
			onRefresh() {
				this.$event.emit("discoveryQ", { index: this.index, isRefresh: 1 });
			},
			onPullingDown(event) {
				// if(event.type==='pullingdown')
				// if(event.pullingDistance>=event.viewHeight){
				//    this.$notice.toast({
				//   message:'test'
				// })
				// }else{
				// }
			},
			onclickitem(item, index, toReviewArea) {
				console.log(item.id);
				item.position = index;
				this.$router.open({
					name: this.detailRountName,
					type: "PUSH",
					params: {
						data: item,
						toReviewArea: toReviewArea,
						index: this.index
					}
				});
			}
		}
	};
</script>

<style lang="scss" src='./news.scss'/>
