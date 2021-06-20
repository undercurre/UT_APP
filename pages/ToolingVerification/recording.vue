<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#009c50">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装保养</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
				 
					<view class="form-item">
						<view class="form-label align-right">
							工装编码：
						</view>
						<view class="form-value" :class="UrlStatus === false ? 'disabled' : ''">
							<input class="form-input" :disabled="!UrlStatus" type="text" v-model="info.CODE" :focus="autoFocus" @confirm="getLoadData">
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							 工装名称：
						</view>
						<view class="form-value disabled">
							<input class="form-input" disabled type="text" v-model="info.TONGS_TYPE" >
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							 型号：
						</view>
						<view class="form-value disabled">
							<input class="form-input" disabled type="text" v-model="info.TONGS_MODEL" >
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							 储位：
						</view>
						<view class="form-value disabled">
							<input class="form-input" disabled type="text" v-model="info.STORE_NAME" >
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							 状态：
						</view>
						<view class="form-value disabled">
							<input class="form-input" disabled type="text" v-model="info.STATUS" >
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							保养状态：
						</view>
						<view>
							 <radio-group>
							 	<label style="display: flex;align-items: center;">
							 		<view>
							 			<radio :value="1" v-model="Form.STATUS" :checked="true"/>正常
							 		</view>
							 		<view>
							 			<radio :value="2" v-model="Form.STATUS"/>异常
							 		</view>
							 	</label>
							 </radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-label align-right">
							描述：
						</view>
						<view class="form-value">
							 <textarea class="form-input" style="height: 140rpx;" v-model="Form.REMARK" placeholder=" "></textarea>
						</view>
					</view>
					<view class="form-item">
						<u-table style="position: relative;height: 400rpx;overflow: auto;">
							<u-tr style="position: sticky;top: 0;">
								<u-th style="width: 100rpx;">序号</u-th>
								<u-th style="width: 200rpx;">事项名称</u-th>
								<u-th style="width: 200rpx;">事项描述</u-th>
								<u-th style="width: 200rpx;">是否合格</u-th>
								<u-th style="width: 300rpx;">备注</u-th>
							</u-tr>
							<u-tr  v-for="(item, index) in Maintain" :key="index">
								<u-td style="width: 100rpx;overflow: hidden;line-height: 21px;">{{index+1}} </u-td>
								<u-td style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.ITEM_NAME }}</u-td>
								<u-td style="width: 200rpx;overflow: hidden;line-height: 21px;">{{ item.REMARK }}</u-td>
								<u-td style="width: 200rpx;overflow: hidden;"><u-switch :size="switchSize" class="switchInfo" v-model="item.ACTIVE" active-value="true" inactive-value="false" ></u-switch></u-td>
								<u-td style="width: 300rpx;overflow: hidden;"><u-input class="descinfor" v-model="item.DESC" type="text"/></u-td>
							</u-tr>
						</u-table>
					</view>
				</view>
			</view>
			<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">关闭</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm" >
						<text class="tix">确定</text>
					</view>
				</div>
			</view>
		</gracePage>
	</view>
</template>

<script src="./recording.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 6em !important;
	}
	.form-content{
		padding-bottom: 0px;
	}
	.u-switch{
		width: 1.2em;
	    height: 0.7em;
	}
	 .u-switch__node {
	    width: 2em !important;
	    height: 1.7em !important;
	}
	.uni-radio-input {
	    width: 15px;
	    height: 15px;
	}
	/* #ifdef APP-PLUS */
	.descinfor{
		height: 21px;
		position: relative;
		top: -20rpx;
	}
	/* #endif */
	
	/* #ifdef H5 */
	.switchInfo{
		margin: auto;
	}
	/* #endif */
</style>
