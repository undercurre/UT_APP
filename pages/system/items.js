import {
	IS_SKYWORTH
} from '@/utils/config'

export default [
	{
		id: 1,
		label: '系统设定',
		icon: '/static/system/02.png',
		href: '/pages/systemSet/index',
		eventType: 'link',
		eventName: null
	},
	{
		id: 2,
		label: '声音设定',
		icon: '/static/system/03.png',
		href: '/pages/voiceSet/index',
		eventType: 'link',
		eventName: null
	},
	{
		id: 3,
		label: '线体配置',
		icon: '/static/system/05.png',
		href: '/pages/lineSet/index',
		eventType: 'link',
		eventName: null
	},
	{
		id: 9,
		label: '打印机设置',
		icon: '/static/print.png',
		href: '/pages/DefaultPrintSet/index',
		eventType: 'link',
		eventName: null
	},
	// {
	// 	id: 6,
	// 	label: '蓝牙打印设置',
	// 	icon: '/static/print.png',
	// 	href: '/pages/BluetoothPrintingTest/index2',
	// 	eventType: 'link',
	// 	eventName: null
	// },
	// {
	// 	id: 8,
	// 	label: 'wifi打印设置',
	// 	icon: '/static/print.png',
	// 	href: '/pages/wifiPrintSet/index',
	// 	eventType: 'link',
	// 	eventName: null
	// },
	IS_SKYWORTH && {
		id: 7,
		label: 'WMS服务器配置',
		icon: '/static/server.png',
		href: '/pages/WMSServiceSet/index',
		eventType: 'link',
		eventName: null
	},
	{
		id: 4,
		label: '注销',
		icon: '/static/system/01.png',
		href: null,
		eventType: 'confirm',
		eventName: 'signOut'
	},
	{
		id: 5,
		label: '退出系统',
		icon: '/static/system/04.png',
		href: null,
		eventType: 'confirm',
		eventName: 'logout'
	}
]