
<template>
    <div id="app">
        <Header />
        <div id="main">
            <Sider />
            <div id="content">
                <router-view/>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script>
import { Header, Footer, Sider } from './components/Layout/index';

export default {
    components: {
        Header,
        Footer,
        Sider,
    }
};
</script>
