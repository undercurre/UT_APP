<template>
	<view class="flex-column">
		<view class="content">
			<view class="infoContentTitle">
				<text class="title">{{ info }}</text>
			</view>
			<text class="line"></text>
		</view>
		<view>
			<view class="infoContentTitle"><text class="infoTitle">更新内容</text></view>
			<view class="infoContent" style="width: 700upx;padding: 0 25upx;">
				<!-- <text class="updateInfo">{{ updateInfo }}</text> -->
				<rich-text class="richText" :nodes="updateInfo"></rich-text>
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: center;margin-top: 60upx;"><button type="primary"
			 style="width: 300upx;display: flex;align-items: center;justify-content: center;" @click="handleUpdate">立即更新</button></view>
		<view class="minorContent">
			<view v-if="startProgress && !currentIsLatest" class="smallTitle">
				<text>下载进度:{{ downloadProgress }}%</text>
				<progress :percent="downloadProgress" stroke-width="4" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		MES_BS_HOST
	} from '@/utils/config';

	import store from '@/store';

	export default {
		components: {},
		data() {
			return {
				info: '正在加载', // 主标题显示版本号
				updateInfo: '无', // 更新摘要

				latest: null, // 版本信息
				packgeSize: null, // 更新包大小
				packgePath: null, // 更新包的文件地址
				downloadTask: null, // 下载任务
				downloadProgress: 0, // 下载进度

				buttonLoading: false, // 加载 - 标记
				installed: false, // 是否执行了安装 - 标记
				startProgress: false, // 下载进行 - 标记
				currentIsLatest: true // 当前版本就是最新版本 - 标记
			};
		},
		onReady() {
			this.getLatest();
			const updated = uni.getStorageSync('updated');
			if (updated.packgePath) {
				this.packgePath = updated.packgePath;
			}
		},
		// 如果用户下载后没有完成安装，却回到app，则执行这里
		onShow() {
			if (this.installed === true && this.packgePath) {
				this.installed = false;
				this.haveDownloaded();
			}
		},
		// 用户关闭页面时检查是否存在下载任务
		onUnload() {
			if (this.downloadTask) {
				this.closeTask();
				this.showToast('更新被取消');
			}
		},
		// 下拉刷新更新
		onPullDownRefresh() {
			this.getLatest();
			uni.stopPullDownRefresh();
		},
		methods: {
			// 封装个Toast方便用
			showToast(text) {
				uni.showToast({
					title: text,
					duration: 3000,
					icon: 'none'
				});
			},
			installPackge() {
				// 安装更新
				plus.runtime.install(plus.io.convertLocalFileSystemURL(this.packgePath), {
					force: true
				}, function(e) {
					console.log(e)
				}, function(error) {
					console.log(error)
				});

				this.installed = true;
				// 保存更新记录到stroage，方便下次启动app时删除安装包
				uni.setStorage({
					key: 'updated',
					data: {
						completed: true,
						packgePath: this.packgePath
					},
					success: res => {
						console.log('成功保存更新记录');
					}
				});
				// 判断是否为热更新（判断文件名中是否含有.wgt）
				if (this.packgePath.match(RegExp(/.wgt/))) {
					this.installed = false;
					uni.showModal({
						title: '提示',
						content: '应用将重启以完成更新',
						showCancel: false,
						complete: () => {
							plus.runtime.restart();
						}
					});
				}
			},
			// 已经下载了更新包但是没有安装
			haveDownloaded() {
				uni.showModal({
					title: '更新尚未完成',
					content: '您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？',
					success: res => {
						if (res.confirm) {
							// 安装
							this.installPackge();
						} else if (res.cancel) {
							this.showToast('更新被取消');
						}
					}
				});
			},
			// 取得最新版本及其所有信息
			getLatest() {
				this.info = '正在加载'; // 主标题显示版本号
				this.updateInfo = '无'; // 更新摘要

				this.buttonLoading = true;
				this.latest = null;
				const cur_url = 'http://' + store.getters.host + MES_BS_HOST + '/api/PADUpgrade/GetUpgradeInfo';

				uni.request({
					url: cur_url,
					method: 'GET',
					data: {},
					success: res => {
						if (res.statusCode === 200 && !res.data.ErrorInfo.Status) {
							const response = res.data.Result;

							const srvVer = response.Version;
							const app_url = response.Url;
							console.log(srvVer, app_url);

							this.latest = response;
							this.buttonLoading = false;
							this.checkLatest();
						}
					}
				});
			},
			// 检查版本
			checkLatest() {
				// 当前版本与新版本不符（$current在main.js里）
				this.currentIsLatest = false;
				this.Mtip = '发现新版本';
				this.info = this.latest.Title; //名称 版本号
				this.updateInfo = this.latest.Note;
			},
			// 关闭下载任务
			closeTask() {
				this.downloadTask.abort();
				this.downloadTask = null;
				this.startProgress = false;
			},
			// 开始下载任务
			createTask(downloadLink) {
				this.downloadProgress = 0;
				this.startProgress = true;
				// 创建下载任务对象
				this.downloadTask = uni.downloadFile({
					url: downloadLink,
					success: res => {
						if (res.statusCode === 200) {
							// 保存下载的安装包
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: _res => {
									this.packgePath = _res.savedFilePath;
									// 进行安装
									this.installPackge();
									// 任务完成，关闭下载任务
									this.closeTask();
								}
							});
						}
					}
				});
				// 进度条更新
				this.downloadTask.onProgressUpdate(res => {
					this.downloadProgress = res.progress;
				});
			},
			handleUpdate() {
				// 判断系统类型
				if (plus.os.name.toLowerCase() === 'android') {
					if (this.latest.Url && this.latest.Url !== '#') {
						// 我这里默认#也是没有地址，请根据业务自行修改
						// 安卓：创建下载任务
						this.createTask(this.latest.Url);
					} else {
						this.showToast('未找到下载地址');
					}
				} else {
					if (this.latest.iosLink && this.latest.iosLink !== '#') {
						// 我这里默认#也是没有地址，请根据业务自行修改
						// 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
						if (this.latest.iosLink.match(RegExp(/.wgt/))) {
							this.createTask(this.latest.iosLink);
						} else {
							// 苹果(B)：打开商店链接（如果iosLink是苹果商店的地址）
							plus.runtime.openURL(this.latest.iosLink);
						}
					} else {
						this.showToast('未找到ios商店地址');
					}
				}
			}
		}
	};
</script>

<style>
	.flex-column {
		flex-direction: column;
	}

	.content {
		text-align: center;
	}

	.minorContent {
		width: 650upx;
		padding: 0 50upx;
	}

	.process {
		margin-top: 200upx;
		margin-left: 30%;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 100upx;
	}

	.title {
		font-size: 36upx;
		color: #373737;
		font-weight: bold;
	}

	.infoTitle {
		font-size: 32upx;
		color: #373737;
		padding-left: 15upx;
		font-weight: bold;
	}

	.tip {
		font-size: 28upx;
		color: #7e7e83;
		/* vertical-align: text-top; */
	}

	.line {
		padding: 0 600upx;
		/* border-bottom: 2upx solid #d8d8d8; */
	}

	.infoPic {
		height: 50upx;
		width: 50upx;
	}

	.infoContentTitle {
		align-items: center;
		padding: 40upx 40upx;
	}

	.infoContent {
		align-items: center;
	}

	.updateInfo {
		font-size: 28upx;
		color: #7e7e83;
		padding: 0 80upx;
	}

	.smallTitle {
		font-size: 26upx;
		font-weight: 500;
		padding: 20upx 0;
		line-height: 1.5;
		color: #888;
	}
</style>
