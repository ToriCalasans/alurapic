import Vue from 'vue';
import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';
export const routes = [
    {path:'', component: Home, titulo: 'Home'},
    {path:'/cadastro', component: Cadastro, titulo: 'Cadastro'}
    // em path estamos colocando mais incrementos, como título ( s...é como um array)
];
// preisa ser uma constante. Exporta uma rota constante
//path equivale a http://localhost:3000/#/   
//Serve para indicar para o template da página principal 
//da aplicação o local no qual os demais componentes carregados através de rotas devem ser renderizados.