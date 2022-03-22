import Vue from 'vue'
import App from './App.vue'

// importando o módulo
import VueResource from 'vue-resource';
// registrando o módulo/plugin no global view object
import VueRouter from 'vue-router';
//importação do vue route
// tem que vir entre chaves, porque não é default
import {routes} from './routes';
//importação das rotas 

Vue.use(VueRouter);
//registrou o vueRouter
import './directives/Transform';
// importando o arquivo `Transform.js`.

const router = new VueRouter({
  routes, 
  mode:'history'
});

Vue.use(VueResource);


//com o vue router criou-se uma instância passando como parametros as rotas que foram configuradas
//em ecma script 6 se a propriedade tiver o mesmo nome pd deixar assim mas o certo é router

new Vue({
  el: '#app',
  router,
  //em ecma script 6 se a propriedade tiver o mesmo nome pd deixar assim mas o certo é router
  render: h => h(App)
})
