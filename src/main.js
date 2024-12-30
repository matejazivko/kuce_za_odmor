import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const app = createApp(App);


app.use(router);
app.mount('#app');
