# vue-elm

> A Vue.js project，仿饿了么网站

## 构建

``` bash
# install dependencies

yarn

# serve with hot reload at localhost:9983
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn analyz
```
## 开发

**接口请求**

封装了fetch，只需要在./src/services/urls.js里添加你需要的接口路径，然后在./src/services/services.js里添加接口请求的封装，在你需要请求的地方引入即可，封装例子如下

```javascript
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
```

**组件**

需要的公共组件放在./src/components

**过滤器**

vue可以自定义过滤器，你可以放在./src/filters下


**工具类函数**

工具类函数写在./src/utils/tools.js里，可定义公共函数

**状态管理**

vuex，在src/store/modules/添加相应模块的module，写法如下

```javascript

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
```

相应页面引入

```javascript
import { mapActions, mapState } from 'vuex';

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },
    created () {
        this.cities({ type: 'guess' });
    },
    computed: {
        ...mapState({
            citiesDate: state => state.test.cities,
        }),
    },
    methods: {
        ...mapActions(['cities']),
    },
};
```
**路由**

使用的是vue-router，使用见http://router.vuejs.org/zh-cn/index.html

**静态文件**

静态文件放在./src/assets/下公共的scss和各页面需要的图片和公共js文件、字体等

[elm开放api接口文档](https://github.com/bailicangdu/node-elm/blob/master/API.md)
[element-ui](http://element-cn.eleme.io/#/zh-CN)
