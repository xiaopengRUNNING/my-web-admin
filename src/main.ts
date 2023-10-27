import { createApp } from 'vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from './router';
import store from './store';
import App from './App.vue';
import '@arco-design/web-vue/es/message/style/css.js';
import './assets/tailwind.css';
import './assets/css/reset.less';

const app = createApp(App);

app.use(ArcoVueIcon);
app.use(router);
app.use(store);

app.mount('#app');
