import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './plugins/Router'
import store from './plugins/Store'

// Vuetify
import vuetify from "@/plugins/vuetify";

watch(
    store.state,
    (state) => {
        localStorage.setItem("state", JSON.stringify(state));
    },
    { deep: true }
);



createApp(App).use(store).use(vuetify).use(router).mount('#app')
