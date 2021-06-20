<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#009c50">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">飞达维护</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						料架编号
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.FEEDER_ID" placeholder=" " :focus="autoFocus">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						描述
					</view>
					<view class="form-value">
						<input class="form-input" type="text" v-model="form.DESCRIPTION" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						维护类型
					</view>
					<view>
						<radio-group @change="radioChange">
							<label style="display: flex;align-items: center;">
								<view>
									<radio value="1" :checked="form.MAINTAIN_KIND === 1"/>
								</view>
								<view style="font-size: 16px;color: #888;margin-left: 10rpx;">已保养</view>
							</label>
							<label style="display: flex;align-items: center;margin-top: 10rpx;">
								<view>
									<radio value="2" :checked="form.MAINTAIN_KIND === 2"/>
								</view>
								<view style="font-size: 16px;color: #888;margin-left: 10rpx;">已校正</view>
							</label>
							<label style="display: flex;align-items: center;margin-top: 10rpx;">
								<view>
									<radio value="3" :checked="form.MAINTAIN_KIND === 3" />
								</view>
								<view style="font-size: 16px;color: #888;margin-left: 10rpx;">已保养+校正</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
					<text class="tix">保存</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./SmtFeederMaintain.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
	  width: 5em!important; 
	 }
</style>
