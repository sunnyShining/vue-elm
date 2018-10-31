import { hosts } from '../services/urls';

function noop () {}
export default async function request (options = {}, cb = noop) {
    // 请求头
    const headers = options.headers || {};
    // 请求路径
    const url = /^http(s)?:\/\//.test(options.url) ? options.url : `${hosts.baseUrl}${options.url}`;
    // 请求方法
    const method = (options.method && options.method.toLocalUpperCase()) || 'POST';
    const json = {}; // 默认参数
    // 请求参数
    const params = Object.assign({}, json, options.param);
    // 超时时间
    const fetchTime = options.fetchTime || 20000;
    // 请求结果
    let result;
    let str = '';
    for (const key of Object.keys(params)) {
        str += `&${key}=${params[key]}`;
    }
    const fetchUrl = method === 'GET' ? `${url}?getTime=${new Date().getTime()}${str}` : url;
    const fetchOpts = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include',
        timeout: fetchTime,
    };
    if (method === 'POST') {
        fetchOpts.body = JSON.stringify(params);
    }

    try {
        result = await fetch(fetchUrl, fetchOpts).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return {
                    status: '1234567',
                    msg: res.statusText || '服务器请求失败！',
                };
            }
        });
    } catch (e) {
        result = {
            status: '123456',
            msg: '服务器请求失败！',
        };
    }
    // 中间操作
    cb(result);
}
