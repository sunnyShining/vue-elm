/**
 * @author sunny
 * @email yanlihui276@163.com
 * @create date 2018-10-31
 * @desc vuex测试模块
*/

import { Commit } from 'vuex';
import * as types from '../mutation-types';
import { cities } from '../../services/services';

const state = {
    cities: {
        pinyin: '',
        is_map: false,
        longitude: 0,
        latitude: 0,
        sort: 0,
        area_code: '',
        abbr: '',
        name: '',
        id: 0,
    },
};

const actions = {
    async cities (context, params) {
        const data = await cities(params);
        context.commit(types.CITIES, data);
    },
};

const mutations = {
    [types.CITIES] (state, payload) {
        state.cities = payload || {};
    },
};

export default {
    state,
    mutations,
    actions,
};