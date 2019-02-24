/**
 * @author sunny
 * @email yanlihui276@163.com
 * @create date 2018-10-31
 * @desc 接口封装
*/

import url from './urls';
import request from '../utils/http';

export function cities (options = {}) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: url.cities,
            param: options,
        }, (res) => {
            resolve(res);
        });
    });
}
// get /topics 主题首页
export function topics (options = {}) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: url.topics,
            param: options,
        }, (data) => {
            resolve(data);
        });
    });
}