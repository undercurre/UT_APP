import request from '../utils/request.js'
import { MES_BS_HOST, MES_CS_HOST } from '@/utils/config.js'

export async function login({
	UserName,
	Password,
	Host
}) {
	request.setConfig((config) => {
		config.baseUrl = 'http://' + Host + MES_CS_HOST;
		return config;
	})
	const res = await request.post('System/Login', {
		UserName: UserName.trim(),
		Password
	})
	return request.post('api/Auth/GetToken', {
		UserName: UserName.trim(),
		Password
	}, {
		baseUrl: 'http://' + Host + MES_BS_HOST,
		showModal: true
	})
}
