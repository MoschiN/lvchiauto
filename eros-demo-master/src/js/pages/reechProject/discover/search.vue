<template>
	<div>
		<div style="flex:1;background-color:#272C39;" :style="{paddingTop:statusHeight}">
			<!-- 搜索的导航栏 -->
			<div class="searchFrameOuter">
				<div class="searchFrameInner">
					<image
						style="width:33px;height:33px;align-self:center;margin-left:20px;"
						src="bmlocal://assets/discovery_search_icon.png"
					>
					<input
						ref="inputC"
						class="input"
						type="text"
						placeholder="搜索"
						placeholder-color="#9BA3B2"
						return-key-type="search"
						:value="valueText"
						@input="onInput"
						@change="onChange"
						@return="onSearch"
					>
					<image
						v-if="isClear"
						style="width:44px;height:44px;align-self:center;margin-right:14px;"
						src="bmlocal://assets/delete_image.png"
						@click="clearText"
					>
				</div>
				<text class="cancelButtom" @click="onCancel">取消</text>
			</div>
			<!-- 编辑状态 -->
			<div></div>
			<!-- 搜索结果 -->
			<list style="margin-top:30px;padding-left:36px;padding-right:36px;">
				<refresh
					@refresh="onRefresh"
					@pullingdown="onPullingdown"
					:display="isRefreshShow?'show':'hide'"
					style="align-items:center;"
				>
					<div style="flex-direction:row;justify-content:center;align-items:center;padding:43px;">
						<image
							style="width:51px;height:58px;margin-right:16px;"
							src="bmlocal://assets/icon_static.png"
						>
						<div>
							<text style="size:26px;color:#868C97;">{{refreshStateStr}}</text>
							<text style="size:26px;color:#868C97;margin-top:4px;">{{lastRefreshTime}}</text>
						</div>
					</div>
				</refresh>
				<cell v-for="(item,position) in searchData" :key="position" @click="onItemClick(item,position)">
					<div style="flex-direction:row;">
						<image
							v-if="typeof item.imagesUrl!=='undefined'"
							style="width:120px;height:120px;margin-top:48px;margin-bottom:48px;background-color:green;border-radius:5px;margin-right:25px;"
							:src="item.imagesUrl.split(',')[0]"
							resize="cover"
						>
						<div
							v-if="typeof item.imagesUrl==='undefined'"
							style="height:120px;margin-top:48px;margin-bottom:48px;"
						></div>
						<div style="margin-top:48px;margin-bottom:48px;flex:1;">
							<bmrichtext
								style="color:#FFFFFF;font-size:28px;"
								:style="{lines:item.isNews==='news'?1:3,textOverflow:ellipsis,}"
							>
								<div
									v-for="(v,i) in item.isNews==='news'?splitToArray(item.title):splitToArrayLimit(item.title,3)"
									:key="i"
								>
									<bmspan :value="v" :style="{color:i%2===0?'#FFFFFF':'#43CBA8'}"></bmspan>
								</div>
							</bmrichtext>
							<bmrichtext
								v-if="item.isNews==='news'"
								style="margin-top:14px;lines:2;color:#ffffff;font-size:24px;flex-direction:row;flex-wrap:wrap;text-overflow:ellipsis"
							>
								<div
									v-for="(v,i) in splitToArrayLimit(item.contextTxt,2,typeof item.imagesUrl!=='undefined')"
									:key="i"
								>
									<bmspan :value="v" :style="{color:i%2===0?'#FFFFFF':'#43CBA8'}"></bmspan>
								</div>
							</bmrichtext>
						</div>
					</div>
					<div style="width:auto;height:1px;background-color:#1A2131;"></div>
				</cell>
				<loading
					@loading="onLoading"
					:display="isLoadingShow?'show':'hide'"
					style="align-items:center;"
				>
					<div style="flex-direction:row;justify-content:center;align-items:center;padding:43px;">
						<image
							style="width:51px;height:58px;margin-right:16px;"
							src="bmlocal://assets/icon_static.png"
						>
						<div>
							<text style="size:26px;color:#868C97;">{{loadingStateStr}}</text>
							<text style="size:26px;color:#868C97;margin-top:4px;">{{lastLoadingTime}}</text>
						</div>
					</div>
				</loading>
			</list>
		</div>
	</div>
</template>
<style scoped>
	.input {
		margin-left: 16px;
		flex: 1;
		justify-items: center;
		color: #ffffff;
		font-size: 32px;
	}
	.searchFrameOuter {
		height: 88px;
		width: auto;
		flex-direction: row;
	}
	.searchFrameInner {
		flex: 1;
		margin-left: 36px;
		margin-top: 8px;
		margin-bottom: 8px;
		background-color: #323845;
		border-top-left-radius: 44px;
		border-bottom-left-radius: 44px;
		border-top-right-radius: 44px;
		border-bottom-right-radius: 44px;
		flex-direction: row;
	}
	.cancelButtom {
		color: #9ba3b2;
		margin-left: 36px;
		margin-right: 36px;
		align-self: center;
	}
</style>

<script>
	import paramDao from "../paramDao";
	export default {
		created() {
			this.$event.on("discoveryS", params => {
				if (typeof params.pos === "undefined") {
					if (params.isRefresh === 2) {
						this.searchData.push.apply(this.searchData, params.data);
					} else {
						if (
							params.isRefresh === 1 ||
							this.searchData == null ||
							this.searchData.length == 0
						) {
							this.searchData = params.data;
						}
					}
				} else {
					this.searchData[params.pos].hasLike = params.hasLike;
					this.searchData[params.pos].likeNum = params.likeNum;
					this.searchData[params.pos].browseNum = params.browseNum;
				}
			});
			this.$router.getParams().then(params => {
				this.curIndex = params.curIndex;
			});
			this.$event.on("refreshOrLoading", params => {
				this.isRefreshShow = params.isRefreshShow;
				this.isLoadingShow = params.isLoadingShow;
				this.lastRefreshTime = "最后更新：" + paramDao.dateFormat();
				this.lastLoadingTime = "最后加载：" + paramDao.dateFormat();
				setTimeout(handler => {
					this.isRefreshShow = true;
					this.isLoadingShow = true;
				}, 500);
			});
		},
		methods: {
			clearText(event) {
				this.valueText = new String();
				this.searchData = [];
			},
			splitToArray(content) {
				var key = this.valueText;
				if (!key) return [content];
				var srcArray = content.split(key);
				var resultArray = new Array();
				if (srcArray != null) {
					for (var i = 0; i < srcArray.length; i++) {
						resultArray[2 * i] = srcArray[i];
						if (i < srcArray.length - 1) resultArray[2 * i + 1] = key;
					}
				}
				return resultArray;
			},
			splitToArrayLimit(content, maxLines, hasImage) {
				var key = this.valueText;
				if (!key) return [content];
				var srcArray = content.split(key);
				var resultArray = new Array();
				if (srcArray != null) {
					// 计算最多可以容纳多少字
					var maxWords = maxLines * (hasImage ? 15 : 20);
					// 统计前三关键字的涉及的字总数
					var lastThreeLength = 0;
					// 每个段平均字数
					var tempLength = Math.round((maxWords - 3 * key.length) / 4);
					var halfTempLength = Math.round(tempLength / 2);
					for (var i = 0; i < srcArray.length; i++) {
						var tLen = srcArray[i].length;
						//去掉空格回车之类的
						var s = srcArray[i];
						// 去掉转义字符
						s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, "");
						// 去掉特殊字符
						s = s.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/);
						s = s.replace(".", "");
						srcArray[i] = s;
						if (tLen > tempLength) {
							if (i === 0) {
								srcArray[i] =
									"..." + srcArray[i].substring(tLen - halfTempLength);
							} else if (i === srcArray.length - 1) {
							} else {
								srcArray[i] =
									srcArray[i].substring(0, halfTempLength) +
									"..." +
									srcArray[i].substring(tLen - halfTempLength);
							}
						}

						resultArray[2 * i] = srcArray[i];
						if (i < srcArray.length - 1) resultArray[2 * i + 1] = key;
					}
				}
				return resultArray;
			},
			onItemClick(item, position) {
				item.pos = position;
				this.$router.open({
					name: "discoverdetail",
					type: "PUSH",
					params: {
						data: item,
						toReviewArea: false,
						index: this.curIndex
					}
				});
			},
			onCancel() {
				this.$router.back();
			},
			onInput(params) {
				if (params.value.length > 0) {
					if (!this.isClear) this.isClear = true;
				} else {
					if (this.isClear) this.isClear = false;
				}
			},
			onChange(params) {
				this.valueText = params.value;
				// this.onSearch(params);
			},
			onSearch(params) {
				this.searchData = [];
				this.$event.emit("discoveryQ", {
					index: 3,
					isRefresh: 1,
					searchCondition: params.value
				});
			},
			onLoading() {
				this.$event.emit("discoveryQ", {
					index: 3,
					isRefresh: 2,
					searchCondition: this.valueText,
					dataLength:
						this.searchData == null || this.searchData.length == 0
							? 0
							: this.searchData.length
				});
			},
			onRefresh(event) {
				this.$event.emit("discoveryQ", {
					index: 3,
					isRefresh: 1,
					searchCondition: this.valueText
				});
			},
			onPullingDown(event) {
				// if(event.type==='pullingdown')
				// if(event.pullingDistance>=event.viewHeight){
				//    this.$notice.toast({
				//   message:'test'
				// })
				// }else{
				// }
			}
		},
		destroyed() {
			this.$event.emit("discoveryQ", {
				index: 3,
				isRefresh: -1
			});
		},
		data() {
			return {
				count: 0,
				isRefreshShow: true,
				isLoadingShow: true,
				refreshStateStr: "下拉刷新",
				lastRefreshTime: "最后更新：" + paramDao.dateFormat(),
				loadingStateStr: "上拉加载",
				lastLoadingTime: "最后加载：" + paramDao.dateFormat(),
				valueText: "",
				curIndex: 0,
				searchData: [],
				isClear: false,
				isEdit: true,
				statusHeight: Number.parseInt(
					this.statusBarHeight || weex.config.env.statusBarHeight || 40
				)
			};
		}
	};
</script>
