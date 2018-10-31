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