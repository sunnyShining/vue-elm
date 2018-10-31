// 入口文件
import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import createLogger from 'vuex/dist/logger';
// import actions from './actions';
// import getters from './getters';
import test from './modules/test';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    // actions,
    // getters,
    modules: {
        test,
    },
    strict: debug,
    plugins: debug ? [createLogger({})] : [],
});
