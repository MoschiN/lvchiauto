<template>
	<!--根布局-->
	<div>
		<div style="background-color:#272C39;flex:1;">
			<navbar :onBackTag="onBackTag"></navbar>
			<scroller class="content" show-scrollbar="false">
				<div
					v-if="!isNews"
					style="width:auto;height:auto;flex-direction:row;justify-content:space-between;align-items:center;margin-top:34px;"
				>
					<div style="flex-direction:row;">
						<image
							style="background-color:#323845;width:64px;height:64px;margin-right:26px;border-radius:32px;"
							:src="typeof discoverDataItem.pushUserHeadPortraitUrl==='undefined'||discoverDataItem.pushUserHeadPortraitUrl==='null'?'bmlocal://assets/upload_head_icon.png':discoverDataItem.pushUserHeadPortraitUrl"
						>
						<div>
							<text style="color:white;size:28px;">{{discoverDataItem.pushUserNick}}</text>
							<text style="color:#9BA3B2;size:22px;">{{discoverDataItem.createTime}}</text>
						</div>
					</div>
					<image style="width:33px;height:34px;" src="bmlocal://assets/follow.png">
				</div>
				<web
					v-if="isNews"
					ref="h5web"
					style="margin-top:40px;size:28px;color:#DDE2EC;width:750px;"
					:data="discoverDataItem.context"
					:style="{height:webHeight}"
					@pagefinish="onWebLoad"
				></web>
				<text v-if="!isNews" style="margin-top:40px;size:28px;color:#DDE2EC;">{{discoverDataItem.title}}</text>

				<image
					v-for="(img,i) in imageUrls"
					:key="i"
					:src="img.value"
					:style="{backgroundColor:'#323845',width:img.width,height:img.height,marginTop:40,marginBottom:0}"
					@load="onImageLoad(img,$event)"
				>
				<div style="flex-direction:row;margin-top:37px;justify-content:flex-end;align-items:center;">
					<image v-if="isNews" style="width:34px;height:21px;" src="bmlocal://assets/browse_num.png">
					<text
						v-if="isNews"
						style="size:26px;color:#9BA3B2;margin-left:8px;"
					>{{discoverDataItem.browseNum}}</text>
					<div style="flex:1;"></div>
					<image
						style="width:44px;height:44px;"
						:src="discoverDataItem.hasLike?'bmlocal://assets/like_icon.png':'bmlocal://assets/un_like_icon.png'"
						@click="onlike(discoverDataItem)"
					>
					<text style="size:26px;color:#9BA3B2;margin-left:6px;">{{discoverDataItem.likeNum}}</text>
				</div>
				<text style="color:white;size:38px;margin-top:69px;margin-bottom:8px;" ref="reviewPosition">评论</text>

				<div v-for="(commentItem,index) in commentDatas" :key="index">
					<div
						style="flex-direction:row;align-items:center;justify-content:space-between;margin-top:32px;"
					>
						<div style="flex-direction:row;align-items:center;">
							<image
								style="background-color:#323845;width:64px;height:64px;border-radius:32px;"
								:src="typeof commentItem.commentUserHeadPortraitUrl==='undefined'||commentItem.commentUserHeadPortraitUrl==='null'?'bmlocal://assets/upload_head_icon.png':commentItem.commentUserHeadPortraitUrl"
							>
							<text style="margin-left:24px;size:28px;color:#DDE2EC;">{{commentItem.commentUserNickName}}</text>
						</div>
						<div v-if="false" style="flex-direction:row;align-items:center;">
							<image
								style="width:44px;height:44px;"
								src="bmlocal://assets/like_icon.png"
								@click="onCommentlike(index)"
							>
							<text style="size:26px;color:#9BA3B2;margin-left:6px;">26</text>
						</div>
					</div>
					<text
						style="margin-top:24px;margin-bottom:16px;size:28px;color:#DDE2EC;"
					>{{decodeURI(commentItem.commentContext)}}</text>
					<text style="size:22px;color:#9BA3B2;margin-bottom:32px;">{{commentItem.createTime}}</text>
					<div style="width:auto;height:1px;background-color:#1A2131;"></div>
				</div>
			</scroller>
			<div
				style="flex-direction:row;align-items:center;height:98px;width:auto;margin-left:36px;margin-right:36px;"
				@click="inputCommentClick"
			>
				<image style="width:32px;height:32px;" src="bmlocal://assets/suggest_icon.png">
				<text style="margin-left:16px;size:32px;color:#9BA3B2;flex:1;" @click="onEdit">写评论</text>
				<image
					style="width:40px;height:40px;"
					src="bmlocal://assets/review_icon.png"
					@click="toReviewPosition"
				>
				<text style="margin-left:12px;size:26px;color:#9BA3B2;">{{commentDatas.length}}</text>
			</div>
		</div>
		<div v-if="isEdit" ref="input" class="overlayer" @click="onCancelEdit">
			<div :style="{padding:36,position:'fixed',bottom:keyboardHeight,backgroundColor:'#272C39'}">
				<textarea
					type="text"
					class="inputarea"
					autofocus="true"
					return-key-type="send"
					@return="onsendComment"
					upriseOffset="36"
					@keyboard="onKeyboard"
				></textarea>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.inputarea {
		width: auto;
		height: 288px;
		background-color: rgba(155, 163, 178, 0.1);
		padding: 36px;
		color: white;
		size: 32px;
	}
	.overlayer {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		width: 750px;
		height: 1334px;
		z-index: 10;
		background-color: rgba(21, 24, 31, 1);
		opacity: 0.9;
	}

	.mycomponent {
		font-size: 30;
		height: 50;
		width: 750;
	}

	.content {
		padding-left: 36px;
		padding-right: 36px;
		background-color: #272c39;
	}
</style>
<script>
	import navbar from "../nav/navbar.vue";
	import imagenavbar from "../nav/imagenavbar.vue";
	const dom = weex.requireModule("dom");
	const modal = weex.requireModule("modal");
	import Utils from "../utils";
	import paramDao from "../paramDao";
	export default {
		created() {
			this.loginInfo = this.$storage.getSync("loginInfo");
			this.$event.on(this.onBackTag, params => {
				if (this.isEdit) {
					this.onCancelEdit();
				} else {
					this.$router.back();
				}
			});
			this.$router.getParams().then(resData => {
				this.discoverDataItem = resData.data;
				this.isNews = resData.data.isNews === "news";
				this.hasLike = resData.data.hasLike;
				this.likeNum = resData.data.likeNum;
				this.curIndex = resData.index;

				if (typeof this.discoverDataItem.imagesUrl !== "undefined") {
					var arrays = this.discoverDataItem.imagesUrl.split(",");

					while (
						arrays.length >= 1 &&
						(arrays[arrays.length - 1] === "" ||
							arrays[arrays.length - 1] == null)
					) {
						arrays.pop();
					}

					var imgParam = new Map();
					imgParam.set("width", 678);
					imgParam.set("height", 308);
					var myJsonString = Utils.arrayToJson(arrays, imgParam);

					this.imageUrls = myJsonString;
				}

				this.id = resData.data.id;
				// 如果是资讯添加浏览数
				if (this.isNews) {
					this.addBrowserNum();
				}

				this.$event.on("onLikeInfoChange", params => {
					if (params == null) {
						this.discoverDataItem.hasLike = !this.discoverDataItem.hasLike;
						this.discoverDataItem.likeNum += this.discoverDataItem.hasLike
							? 1
							: -1;
						this.$event.emit("discoveryS", this.discoverDataItem);
					} else {
						this.discoverDataItem.hasLike = params.hasLike;
						this.discoverDataItem.likeNum = params.likeNum;
					}
				});
				this.toReviewArea = resData.toReviewArea;
				this.getCommentList(resData.toReviewArea);
			});
		},
		components: {
			navbar: navbar,
			imagenavbar: imagenavbar
		},
		methods: {
			addBrowserNum() {
				var paramMap = new Map();
				paramMap.set("id", this.id);
				this.$fetch({
					method: "POST", // 大写
					name: "DISCOVERY.browse", //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
					data: paramDao.getParamsJSON(paramMap),
					header: {
						Authorization: "Bearer  " + this.loginInfo.data.token.access_token
					}
				}).then(
					resData => {
						if (resData.code === 1000) {
							this.discoverDataItem.browseNum++;
							if (typeof this.discoverDataItem.position === "undefined") {
								this.$event.emit("discoveryS", this.discoverDataItem);
							} else {
								this.$event.emit("addBrowser_" + this.curIndex, {
									position: this.discoverDataItem.position
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
			onsendComment(event) {
				if (event.returnKeyType === "send") {
					this.sendComment(event);
				}
			},
			onCancelEdit() {
				this.isEdit = false;
			},
			onEdit() {
				this.isEdit = true;
			},
			onKeyboard(event) {
				if (event.isShow) {
					this.keyboardHeight = 520;
					// this.$notice.toast({
					//     message:event
					// })
					//   this.keyboardHeight=event.keyboardSize
					//   this.keyboardHeight=event.keyboardSize
					// this.$refs.input.scrollIntoViewIfNeeded()
					// setTimeout(function(){
					//     console.log('scrollIntoViewIfNeeded');
					// },400);

					//       this.$notice.toast({
					//         message: '执行成功'
					//   })
				} else {
					this.keyboardHeight = 0;
				}
			},

			getCommentList(toReviewPosition) {
				var paramMap = new Map();
				paramMap.set("newsShareId", this.id);
				this.$fetch({
					method: "POST", // 大写
					name: "DISCOVERY.queryComment", //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
					data: paramDao.getParamsJSON(paramMap),
					header: {
						Authorization: "Bearer  " + this.loginInfo.data.token.access_token
					}
				}).then(
					resData => {
						this.commentDatas = resData.data.context;
						if (toReviewPosition) {
							this.onCancelEdit();
							if (!this.isNews) {
								setTimeout(() => {
									this.toReviewPosition();
								}, 1000);
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

			sendComment(event) {
				var commentContext = event.value;
				var paramMap = new Map();
				paramMap.set("newsShareId", this.id);
				paramMap.set("commentContext", encodeURI(commentContext));
				paramMap.set("userId", this.loginInfo.data.userInfo.userId);
				this.$fetch({
					method: "POST", // 大写
					name: "DISCOVERY.sendComment", //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
					data: paramDao.getParamsJSON(paramMap),
					header: {
						Authorization: "Bearer  " + this.loginInfo.data.token.access_token
					}
				}).then(
					resData => {
						this.discoverDataItem.commentNum++;
						this.$event.emit("addComment_" + this.curIndex, {
							position: this.discoverDataItem.position
						});
						this.getCommentList(true);
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

			onWebLoad(event) {
				this.webHeight = event.contentHeight;
				if (this.isNews && this.toReviewArea) {
					setTimeout(() => {
						this.toReviewPosition();
					}, 2000);
				}
			},

			// 图片加载完成
			onImageLoad(img, event) {
				if (event.success) {
					img.height =
						(event.size.naturalHeight * img.width) / event.size.naturalWidth;
				}
			},
			// 滚动到评论的其实位置
			toReviewPosition() {
				dom.scrollToElement(this.$refs.reviewPosition);
			},
			//  动态的点赞和取消点赞
			onlike(itemData) {
				this.$event.emit("onlike_" + this.curIndex, itemData);
			},
			// 评论的点赞和取消点赞
			onCommentlike(index) {
				this.commentDatas[index].isLike = !this.commentDatas[index].isLike;
			},
			// 点击触发评论输入界面
			inputCommentClick() {
				this.$router.open({
					name: "commentinput",
					type: "PUSH"
				});
			}
		},
		data() {
			return {
				toReviewArea: false,
				webHeight: 200,
				position: -1,
				curIndex: -1,
				isNews: false,
				id: "",
				loginInfo: null,
				onBackTag: "onDetailBack",
				keyboardHeight: 0,
				isEdit: false,
				imageUrls: null,
				backgroundColor: "#272C39",
				discoverDataItem: null,
				commentDatas: null
			};
		}
	};
</script>
