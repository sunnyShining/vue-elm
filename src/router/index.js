/**
 * @author sunny
 * @email yanlihui276@163.com
 * @create date 2018-10-31
 * @desc 页面路由
*/

import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/views/HelloWorld';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
        },
    ],
});
