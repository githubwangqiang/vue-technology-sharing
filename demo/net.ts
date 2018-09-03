/**
 * Created by wonderwang on 2017/6/9.
 */

// import * as parseParam from './parseParam';
const parseParam=function(param, key){ 
	var paramStr=""; 
	if(param instanceof String||param instanceof Number||param instanceof Boolean){ 
	  paramStr+="&"+key+"="+encodeURIComponent(param); 
	}else{ 
		param.forEach(function(i){ 
		var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i); 
		paramStr+='&'+parseParam(this, k); 
	  }); 
	} 
	return paramStr.substr(1); 
  };
async function base(method: string, url: string, data: object): Promise<any> {
	let result;
	let params = {
		t: +new Date()
		// g_tk: parseParam.getCSRFToken(),
		// p_tk: parseParam.getPrivateToken()
	};

	//参数拼接
	url = url.indexOf('?') == -1 ? url + '?' + parseParam.stringify(params) : url + '&' + parseParam.stringify(params);

	if (method.toLocaleLowerCase() == 'post') {
		result = await ajax({
			url: url,
			method: 'post',
			body: parseParam.stringify(data),
			withCredentials: true
		});

	} else if (method.toLocaleLowerCase() == 'get') {
		url = data ? url + '&' + parseParam.stringify(data) : url;
		result = await ajax({
			url: url,
			method: 'get',
			withCredentials: true
		});
	}

	if (result.status == 200) {
		if (result.data.ret == -100001) {
			let href = location.href;
			location.href = [
				"http://ui.ptlogin2.qq.com/cgi-bin/login?",
				"hide_title_bar=1",
				"&no_verifyimg=1",
				"&style=" + (/iphone|ipad|itouch/ig.test(navigator.userAgent) ? 8 : 9),
				"&link_target=blank",
				"&appid=8000212",
				"&target=top",
				"&daid=18",
				"&s_url=" + href
			].join('');
		} else {
			return result.data;
		}

	}
}

async function get(url: string, data?: object): Promise<any> {
	return await base('get', url, data);
}

async function post(url: string, data?: object): Promise<any> {
	return await base('post', url, data);
}

async function getJSON(url): Promise<any> {
	let result;

	result = await ajax({
		url: url,
		method: 'get',
		withCredentials: true
	});

	if (result.status == 200) {
		return result.data;
	}
}


let count = 0;

async function getJSONP(url, opts?): Promise<any> {

	return new Promise((resolve => {

		function noop() {
		}

		opts = opts || {};

		let prefix = opts.prefix || '__jp';
		let id = opts.name || (prefix + (count++));
		let param = opts.param || 'callback';
		let timeout = null != opts.timeout ? opts.timeout : 60000;
		let enc = encodeURIComponent;
		let target = document.getElementsByTagName('script')[0] || document.head;
		let script;
		let timer;

		if (timeout) {
			timer = setTimeout(function () {
				cleanup();
				throw 'jsonp timeout!'
			}, timeout);
		}

		function cleanup() {
			if (script.parentNode) script.parentNode.removeChild(script);
			window[id] = noop;
			if (timer) clearTimeout(timer);
		}

		function cancel() {
			if (window[id]) {
				cleanup();
			}
		}

		window[id] = function (data) {
			cleanup();
			resolve(data);
		};


		url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
		url = url.replace('?&', '?');


		script = document.createElement('script');
		script.src = url;
		target.parentNode.insertBefore(script, target);
	}))

}

function getScript(uri): Promise<any> {

	return new Promise((resolve => {
		uri = uri.replace(/^https?:\/\//, location.protocol + '//');
		var script = document.createElement("script");
		var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
		script.async = true;
		script.type = "text/javascript";
		script.charset = "utf-8";
		script.onload = function () {
			setTimeout(() => {
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}

				resolve(true);
			}, 0)
		};

		script.src = uri;
		head.appendChild(script);
	}));
}

function ajax(params) {

	return new Promise((resolve => {
		var reqfields = [
			'responseType', 'withCredentials', 'timeout', 'onprogress'
		];

		var headers = params.headers || {}
			, body = params.body
			, method = params.method || (body ? 'POST' : 'GET')
			, called = false;

		function setDefault(obj, key, value) {
			obj[key] = obj[key] || value
		}

		var req = new XMLHttpRequest();

		function cb(statusCode, responseText?: string) {
			return function () {
				if (!called) {
					if (statusCode) {
						try {
							let json = JSON.parse(req.response || req.responseText);
							resolve({
								status: statusCode,
								data: json
							});
						} catch (e) {
							throw 'JSON parse error!'
						}
					} else {
						throw 'ajax failed: ' + responseText
					}

					called = true
				}
			}
		}

		req.open(method, params.url, true);

		var success = req.onload = cb(200);
		req.onreadystatechange = function () {
			if (req.readyState === 4) success()
		};
		req.onerror = cb(null, 'Error');
		req.ontimeout = cb(null, 'Timeout');
		req.onabort = cb(null, 'Abort');

		if (body) {

			if (!FormData || !(body instanceof FormData)) {
				setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
			}
		}

		for (var i = 0, len = reqfields.length, field; i < len; i++) {
			field = reqfields[i];
			if (params[field] !== undefined)
				req[field] = params[field]
		}

		for (let field in headers)
			req.setRequestHeader(field, headers[field])

		req.send(body);

		return req
	}));
}

export { get, post, getJSON, getJSONP, getScript }