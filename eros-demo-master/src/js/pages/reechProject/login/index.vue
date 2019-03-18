<template>
	<div>
		<scroller class="main-scroller wrapper" offset-accuracy="300px">
			<div class="wrapper">
				<text class="i-phone">请输入手机号</text>
				<wxc-cell
					title="+86"
					:has-top-border="false"
					:has-bottom-border="false"
					style="background-color: #272C39;margin-top: 150px"
				>
					<text slot="label" style="color: #FFFFFF;margin-left: 25px">+86</text>
					<input
						style="tint-color: #43CBA8;"
						type="text"
						placeholder="请输入您的手机号码"
						class="input"
						:autofocus="false"
						v-model="eventText"
					>
				</wxc-cell>
				<wxc-button
					text="下一步"
					style="margin-left: 36px;
                        margin-top: 160px;
                        width: 678px;
                        height: 98px"
					type="#272C39"
					class="btnBox"
					@wxcButtonClicked="emit"
				></wxc-button>
			</div>
		</scroller>
	</div>
</template>
<script>
	import { WxcButton, WxcCell } from "weex-ui";
	const SCROLL_FULL_WIDTH = 750;
	const dom = weex.requireModule("dom");

	export default {
		components: {
			WxcButton,
			WxcCell
		},
		created() {
			this.init();
		},
		data() {
			return {
				eventText: ""
			};
		},
		methods: {
			emit() {
				this.$router.open({
					name: "loginNext"
				});
				this.$event.emit("getParams", this.eventText);
				this.$notice.toast({
					message: "登陆成功"
				});
			}
		}
	};
</script>
<style lang="sass" src="./index.scss"></style>
