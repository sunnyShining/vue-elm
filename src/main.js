// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import 'whatwg-fetch';
import Vue from 'vue';
import ElementUI, { Message } from 'element-ui';
import './assets/css/reset.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.less';
import './assets/css/responsive.css';
import './assets/css/font-awesome.less';
import './utils/fetch';
import App from './App';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.config.errorHandler = function (err, vm, info) {
    Message.error({ message: err.message });
};

if (process.env.NODE_ENV === 'development') {
    Vue.config.devtools = true;
}

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
