import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import route from "./router";
import VCalendar from 'v-calendar';
import VueSelect from "vue-select";
import './assets/main.css'
import 'v-calendar/style.css';
import 'vue-select/dist/vue-select.css';

const app = createApp(App);
app.use(createPinia());
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(route);
app.use(VCalendar, {})
app.component("v-select", VueSelect)
app.mount("#app");
