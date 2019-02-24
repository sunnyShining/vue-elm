<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container">
                <router-link class="brand" to="/home">
                    <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="logo" />
                </router-link>
                <ul class="nav pull-right">
                    <li><router-link to="/home">首页</router-link></li>
                    <li><router-link to="/messages">未读消息</router-link></li>
                    <li><router-link to="/create/new">发布话题</router-link></li>
                    <li><router-link to="/getstart">新手入门</router-link></li>
                    <li><router-link to="/api">API</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                </ul>
                <a class="btn btn-navbar" id="responsive-sidebar-trigger">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
            </div>
        </div>
    </div>
</template>
