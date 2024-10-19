import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import DataView from './views/DataView.vue';
import AboutView from './views/AboutView.vue';
import StreamView from './views/StreamView.vue';
import StatisticsView from './views/StatisticsView.vue';
import MapView from './views/MapView.vue';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/data',
      name: 'data',
      component: DataView,
    },
    {
      path: '/stream',
      name: 'stream',
      component: StreamView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
  