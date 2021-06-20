<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">钢网绑定工单</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工单
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="netData.WO_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						机种
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.MODEL" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" type="text" disabled v-model="netData.PART_NO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						钢网编号
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text"  :focus="autoFocus" v-model="formData.stencil_no" placeholder=" ">
					</view>
				</view>
				<view class="form-item" v-if="!IS_UT">
					<view class="form-label align-right">
						位号
					</view>
					<view class="form-value">
						<picker mode="selector" disabled :range="locList" @change="pickLoc" range-key="VALUE">
							<div class="picker-s">
								<input class="form-input" :style="{
									color: locList[locIndex] ? '#333' : 'rgb(158, 158, 158)'
								}"
								 disabled type="text" :value="locList[locIndex] ? locList[locIndex].VALUE : ' '" placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
			</view>
		</view>
	
		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="goback">
					<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">关闭</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SteelMesh.js">
</script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 6em!important;
	}
</style>
