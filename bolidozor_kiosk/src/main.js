
import { createApp } from 'vue';  // Pro Vue 3 musíte používat createApp
import App from './App.vue';
import router from './router';  // Import routeru
import 'bulma/css/bulma.min.css';  // Import Bulma CSS
import './assets/styles.css';  // Import vlastních stylů

createApp(App).use(router).mount('#app');  // Použití routeru a připojení k Vue instanci
