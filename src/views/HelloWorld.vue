<template>
    <div class="panel">
        <div class="header">
            <a href="/?tab=all" class="topic-tab current-tab">{{msg}}</a>
            <a href="/?tab=good" class="topic-tab ">精华</a>
            <a href="/?tab=share" class="topic-tab ">分享</a>
            <a href="/?tab=ask" class="topic-tab ">问答</a>
            <a href="/?tab=job" class="topic-tab ">招聘</a>
            <a href="/?tab=dev" class="topic-tab ">客户端测试</a>
        </div>
        <div class="inner no-padding">
            <div id='topic_list'>
                <div v-for="(item, index) in topics" class="cell" :key="index">
                    <a class="user_avatar pull-left" href="/user/alsotang">
                        <img src="https://avatars1.githubusercontent.com/u/1147375?v=4&amp;s=120" title="alsotang">
                    </a>
                    <span class="reply_count pull-left">
                        <span class="count_of_replies" title="回复数">
                        143
                        </span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_visits" title="点击数">
                        15152
                        </span>
                    </span>
                    <a class="last_time pull-right" href="/topic/5bd4772a14e994202cd5bdb7#5c6f443733b0b629ac84403a">
                        <img class="user_small_avatar" src="https://avatars1.githubusercontent.com/u/46803867?v=4&amp;s=120">
                        <span class="last_active_time">2 天前</span>
                    </a>
                    <div class="topic_title_wrapper"> 
                        <span class="put_top">置顶</span>
                        <a class="topic_title" href="/topic/5bd4772a14e994202cd5bdb7" title="服务器迁移至 aws 日本机房">
                        服务器迁移至 aws 日本机房
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { topics } from '../services/services';

export default {
    name: 'HelloWorld',
    data () {
        return {
            topics: [],
            msg: '123'
        };
    },
    created () {
        topics({
            page: 1,
            tab: 'all',
            limit: 40,
            mdrender: true,
        }).then((res) => {
            this.topics = res.data || [];
        })
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
