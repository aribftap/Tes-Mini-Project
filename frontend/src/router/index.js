import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import BooksDashboard from '../views/BooksDashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/books', name: 'BooksDashboard', component: BooksDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;