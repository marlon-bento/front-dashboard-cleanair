import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import CreateLaudoDevolucao from '@/components/CreateLaudoDevolucao.vue';
import { useLoginStore } from "@/stores/LoginStore";
import SelecionarUnidade from '@/components/SelecionarUnidade.vue';
import NotFound from '@/components/NotFound.vue';
import Dashboard from '@/components/Dashboard.vue';
import CriarConta from '@/components/CriarConta.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sing-in',
      name: 'sing-in',
      component: CriarConta
    },
    {
      path: '/seleciona_unidade',
      name: 'seleciona-unidade',
      component: SelecionarUnidade,

    },
    {
      path: '/adicionar-laudo/devolucao',
      name: 'adicionar-laudo-devolucao',
      component: CreateLaudoDevolucao,

    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,

    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,

    },
  ]
});

// Middleware de verificação de autenticação e primeiro acesso
router.beforeEach((to, from, next) => {
  const login = useLoginStore();

  // Se o usuário não estiver autenticado e não estiver tentando acessar a rota de login
  if (!login.token && to.name !== 'login' && to.name !== 'sing-in') {
    next({ name: 'login' });
  }
  else {

    next(); // Permite o acesso
  }

})

export default router;
