/**
 * @author sunny
 * @email yanlihui276@163.com
 * @create date 2018-10-31
 * @desc 接口请求封装
*/

import { Loading, Message } from 'element-ui';
import { hosts } from '../services/urls';

function noop () {}
export default async function request (options = {}, cb = noop) {
    const mask = options.mask === undefined ? true : options.mask;
    const spin = options.spin === undefined ? true : options.spin;
    // 请求头
    const headers = options.headers || {};
    // 请求路径
    const url = /^http(s)?:\/\//.test(options.url) ? options.url : `${hosts.baseUrl}${options.url}`;
    // 请求方法
    const method = (options.method && options.method.toLocaleUpperCase()) || 'POST';
    const json = {}; // 默认参数
    // 请求参数
    const params = Object.assign({}, json, options.param);
    // 超时时间
    const fetchTime = options.fetchTime || 20000;
    const errorToast = options.errorToast === undefined ? true : options.errorToast;
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
        // credentials: 'include',
        timeout: fetchTime,
    };
    if (method === 'POST') {
        fetchOpts.body = JSON.stringify(params);
    }
    let loadingInstance;
    if (spin) {
        if (window.responseCount === undefined) window.responseCount = 0;
        if (!window.responseCount++) loadingInstance = Loading.service({ text: '加载中...', fullscreen: mask });
    }
    try {
        result = await fetch(fetchUrl, fetchOpts).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return {
                    status: '1234567',
                    message: res.statusText || '服务器请求失败！',
                };
            }
        });
    } catch (e) {
        result = {
            status: '123456',
            message: '服务器请求失败！',
        };
    }
    if (spin) {
        if (!window.responseCount || !--window.responseCount) {
            loadingInstance && loadingInstance.close();
        }
    }
    if (result.message) {
        Message.error({ message: result.message });
    }
    cb(result);
}
