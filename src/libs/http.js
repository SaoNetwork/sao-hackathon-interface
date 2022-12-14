import axios from 'axios'
import Vue from 'vue'
import config from './config'
import utils from './utils'
import {
	Message
} from 'element-ui';

const http = axios.create({
	baseURL: config.baseApi,
	timeout: config.timeout
})

// Request interception
http.interceptors.request.use(function(header) {
	let headersConfig = utils.getHeadserConfig();
	console.log(headersConfig);
	if (headersConfig) {
		header.headers = Object.assign(header.headers, headersConfig);
	}
	return header;
}, function(error) {
	return Promise.reject(error);
});

// Response interception
http.interceptors.response.use(function(response) {
	if (response.data.code == 200) {
		return Promise.resolve(response.data);
	} else if (response.status == 200) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(response.message);
	}
}, function(error) {
	switch (error.response.status) {
		case 401:
			// Message.error("Signature is invalid, please re sign!");
			// Vue.prototype.$getWalletAddress().then(address => {
			// 	let signaturemessage = config.signMessage + address;
			// 	Vue.prototype.$sign(config.signMessage, address).then(signature => {
			// 		let sign = {
			// 			address,
			// 			signaturemessage,
			// 			signature
			// 		};
			// 		localStorage.setItem(config.localStorageSignKey, JSON.stringify(sign));
			// 		utils.setSignList(sign);
			// 	})
			// });
			break;
		case 404:
			Message.error("Your request was not found!");
			break;
		default:
			// Message.error(error.response.data.message);
	}
	return Promise.reject(error);
});

export default http;
