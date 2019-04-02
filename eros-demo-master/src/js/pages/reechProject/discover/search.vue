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
						@input="onInput"
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
						<div style="margin-top:48px;flex:1;">
							<text
								style="color:#FFFFFF;font-size:28px;"
								:style="{lines:3,textOverflow:ellipsis,}"
							>{{item.title}}</text>
							<text
								v-if="item.isNews==='news'"
								style="margin-top:14px;color:#FFFFFF;font-size:24px;lines:2;text-overflow:ellipsis;"
							>{{item.contextTxt}}</text>
						</div>
					</div>
					<div style="width:auto;height:1px;background-color:#1A2131"></div>
				</cell>
			</list>
		</div>
	</div>
</template>
<style scoped>
	.input {
		margin-left: 16px;
		flex: 1;
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
	export default {
		created() {
			this.$event.on("discoveryS", params => {
				if (typeof params.pos === "undefined") {
					this.searchData = params;
				} else {
					this.searchData[params.pos].hasLike = params.hasLike;
					this.searchData[params.pos].likeNum = params.likeNum;
					this.searchData[params.pos].browseNum = params.browseNum;
				}
			});
			this.$router.getParams().then(params => {
				this.curIndex = params.curIndex;
			});
		},
		methods: {
			clearText() {},
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
			onSearch(params) {
				this.$event.emit("discoveryQ", {
					index: 3,
					isRefresh: 0,
					searchCondition: params.value
				});
			}
		},
		data() {
			return {
				curIndex: 0,
				searchData: null,
				isClear: false,
				isEdit: true,
				statusHeight: Number.parseInt(
					this.statusBarHeight || weex.config.env.statusBarHeight || 40
				)
			};
		}
	};
</script>
