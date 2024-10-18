
import { createApp } from 'vue';  // Pro Vue 3 musíte používat createApp
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';  // Import routeru
import 'bulma/css/bulma.min.css';  // Import Bulma CSS
import './assets/styles.css';  // Import vlastních stylů

import en from './locales/en.json';
import cs from './locales/cs.json';

const messages = {
  en,
  cs
};
  
  // Vytvoření instance vue-i18n
  const i18n = createI18n({
    locale: 'cs', // Výchozí jazyk
    fallbackLocale: 'en', // Pokud překlad chybí, použije se tento jazyk
    messages, // Zprávy pro různé jazyky
  });

const app = createApp(App)


app.use(router);
app.use(i18n);  // Připojení i18n k Vue instanci
app.mount('#app');  // Použití routeru a připojení k Vue instanci

