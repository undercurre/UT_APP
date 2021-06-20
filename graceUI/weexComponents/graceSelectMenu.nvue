<template>
	<view class="grace-select-menu-wrap">
		<view class="grace-select-menu-title" @click.stop="showMenu" id="menumain">
			<text class="grace-select-menu-title-txt" :class="{
				on: items[currentIndex]
			}">{{items[currentIndex] ? items[currentIndex] : defaultText}}</text>
			<text class="grace-select-menu-title-icon grace-icons" :class="{
				on: items[currentIndex]
			}" v-if="!show">&#xe603;</text>
			<text class="grace-select-menu-title-icon grace-icons" :class="{
				on: items[currentIndex]
			}" v-if="show">&#xe654;</text>
		</view>
		<view class="grace-select-menu" @click.stop="close" @touchmove.stop="" v-if="show">
			<view class="grace-select-menus">
				<view class="grace-select-item" v-for="(item, index) in items" :key="index" :data-index="index" @click.stop="select">
					<text class="grace-selected-icon grace-icons" :style="{color : index == currentIndex ? activeColor : color}" v-if="index == currentIndex">&#xe7f8;</text>
					<text class="grace-selected-text" :style="{color : index == currentIndex ? activeColor : color}">{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props:{
		items : {
			type : Array,
			default : function () {
				return []
			}
		},
		show : {
			type : Boolean,
			default : false
		},
		height : {
			type : Number,
			default : 300
		},
		color : {
			type : String,
			default : "#333333"
		},
		activeColor : {
			type : String,
			default : "#3688FF"
		},
		selectIndex : {
			type : Number,
			default : 0
		},
		defaultText: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			currentIndex : 0,
			top : 0
		}
	},
	created : function () {
		this.currentIndex = this.selectIndex;
	},
	watch:{
		selectIndex : function () {
			this.currentIndex = this.selectIndex;
		}
	},
	methods:{
		showMenu:function () {
			this.$emit('showMenu');
		},
		close : function(){
			this.$emit('close');
		},
		select : function(e){
			var index = Number(e.currentTarget.dataset.index);
			this.currentIndex = index;
			this.$emit('select', index);
			this.close();
		}
	}
}
</script>
<style scoped>
.grace-select-menu-wrap{}
.grace-select-menu-title{flex-direction:row; justify-content:center; flex-wrap:nowrap; align-items:center;}
.grace-select-menu-title-txt{font-size:28rpx; line-height:92rpx;}

.grace-select-menu-title-icon{margin-left:10rpx; font-size:22rpx; line-height:92rpx;}
.grace-select-menu{position:fixed; width:750rpx; left:0; top:0; bottom:0; background-color:rgba(0,0,0,0.2); flex-direction:column; align-items:flex-end;}
.grace-select-menus{width:750rpx; position:absolute; left:0; bottom:0; background-color:#FFFFFF;}
.grace-select-item{padding:10rpx 25rpx; margin:0 20rpx; background-color:#FFFFFF; font-size:28rpx; color:#333333; border-bottom-width:1px; border-bottom-style:solid; border-bottom-color:#F8F8F8; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.grace-selected-icon{font-size:28rpx; line-height:80rpx; margin-right:20rpx;}
.grace-selected-text{font-size:28rpx; line-height:80rpx;}

/* 我修改的 */
.grace-select-menu-title{flex-direction:row; justify-content:space-between; flex-wrap:nowrap; align-items:center;height: 80rpx;}
.grace-select-menu-title-txt{font-size:34rpx; color: #333; line-height:36rpx;color: #999;}
.on {color: #333;}
.grace-select-menu-title-icon{margin-left:10rpx; font-size:34rpx; line-height:36rpx;color: #999;}
.grace-select-item{padding:10rpx 25rpx; margin:0 20rpx; background-color:#FFFFFF; font-size:28rpx; color:#333333; border-bottom-width:1px; border-bottom-style:solid; border-bottom-color:#F8F8F8; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.grace-selected-icon{font-size:36rpx; line-height:120rpx; margin-right:20rpx;}
.grace-selected-text{font-size:36rpx; line-height:120rpx;}
</style>