import './assets/main.css'

// tabler
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/js/tabler.min.js'
// toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
    // You can set your default options here
};
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueApexCharts from "vue3-apexcharts";

import App from './App.vue'

import router from './router'

const app = createApp(App)



import * as svgs from '@/assets/static/js/svgs.js'; // Importando todos os SVGs

// Adicionando os SVGs ao protótipo global
app.config.globalProperties.svgs = svgs;


app.use(createPinia())
app.use(router)
app.use(Toast, options);
app.use(VueApexCharts);
app.mount('#app')
