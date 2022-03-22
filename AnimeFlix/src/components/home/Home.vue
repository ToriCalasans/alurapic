
<template>
<div> 

<h1 class="centralizado">AnimeFlix</h1>

<!--
Pode-se usar os binds ou o v-text 
<h1 v-text="titulo"></h1>
-->
<input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="Filtre por parte do título">
<!--
O input tem uma diretiva chamada input, que é disparado toda vez q algum valor é inserido lá.
A diretiva v-on: podemos elaborar uma resposta para eventos do JavaScript. No caso, adicionamos o nome do evento logo após os dois pontos.
O valor de $event.target.value é atribuido a filtro. Há um objeto especial chamado event que detém um monte de informação sobre o evento js é disparado.
No caso usamos $event pois esse é um objeto especial do Vue (Um event original encapsulado pelo Vue.) É através dele podemos ter acesso ao alvo do evento ou seja target. 
No caso o target é o próprio input. É por isso que do target podemos fazer .value para obter o valor do input.
-->
{{filtro}}
<ul class="lista-fotos">
<!--v-for é um for no vue. foto pode ser qualquer nome (precisa ser igual no src e alt) 
mas fotos tem q referênciar o array em baixo
Pode ser usar a sintaxe de foto of fotos ou foto in fotos
<li v-for="foto of fotos">{{ foto }} também pode ser usada assim</li>
--> 
  <li class="lista-fotos-item" v-for="foto of fotosComFiltro"> 
    <meu-painel :titulo="foto.titulo">
        <imagem-responsiva  :url="foto.url" :titulo="foto.titulo" v-transform.animate="15"/><!-- o v-transform vai aqui, podendo ser .animate ou .animate.reverse-->
        <!--<imagem-responsiva  :url="foto.url" :titulo="foto.titulo" v-transform="{incremento: 180, animate: true}"/> Essa versão pode-se  passar os valores como parametro-->
        <meu-botao 
          tipo="button" 
          rotulo="remover"       
          @botaoAtivado ="remove(foto)" 
          :confirmacao = "false"
          estilo="padrao"
        />
        <!--@botaoAtivado="remove(foto)" vai chamar o metodo em method de Botao.js , ou seja nosso elemento filho precisa de alguma maneira chamar um método do seu elemento pai.-->
        <!--
         <meu-botao tipo="button" rotulo="remover" @click.native="remove(foto)"/>
         primeira versão, antes era feito a chamada de methodo aqui, agora virou um metodo lá de botão.js
         v-bind:confirmacao="false", quando usamos : o valor passado deixa de ser uma string e passa a ser a expressão ou seja, aqui é false. <- COM A MUDANÇA DO PROPS NÃO PRECISA MAIS DOS : ANTES DE CONFIRMACAO
        -->
    </meu-painel>   
  </li>
</ul>

 <!--
 Não podemos usar interpolação nos atributos das tag's HTML.
 Pode-se usar o v-bind ou apenas : antes do atributo
 <img v-bind:src="foto.url" v-bind:alt="foto.titulo">
 -->
</div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';



export default {

  components:  {
    'meu-painel': Painel,
    'imagem-responsiva':ImagemResponsiva,
    'meu-botao' :Botao
  },

  data(){
    return{
      titulo:'AnimeFlix',
      fotos: [
        /*
        {
        url:'https://wallpaperaccess.com/full/6319352.jpg',
        titulo:'Kimetsu no Yaiba'
        },
        {
        url:'https://coolwallpapers.me/th700/2615792-anime-wallpaper-hd-free-download.jpg',
        titulo:'One Piece'
        },
        {
        url:'https://www.nawpic.com/media/2020/cool-anime-nawpic-10.jpg',
        titulo:'Shingeki no Kyojin'
        }
        */
      ],
      filtro: ''
    }
  },
/*computed property é um propriedade computada para utilizar a logica para realizar um cálculo ou aplicar uma lógica dinamicamente.
Sendo que cada propriedade vai ser obrigatoriamente uma função.
No lugar de fotos no v-for, vamos usar fotosComFiltro, pois o computed property pode ser acessado como uma propriedade
FotosComFiltro vai perguntar se this.filtro é uma string em branco, ele vai ser falso e retornar this.fotos, que é a lista inteira.

let exp = new RegExp(this.filtro.trim(),'i'); 
exp vai receber RegExp ( uma expressão que realiza correspondência de texto com um padrão)
baseado no que foi digitado no this.filtro. trim é pra ignorar os espaços em branco e o i é uma opção pro RegExp ignorar maisucula e minuscula

return this.fotos.filter(foto => exp.test(foto.titulo));
Então se retorna this.fotos ( nossa lista de fotos lá em data) .filter (método pra filtrar os elementos de um array) 
(foto => exp.test(foto.titulo)) vai testar se o titulo da foto é igual ao digitado e retornar o próximo item da lista de foto
Traduzindo, esse return vai retornar todas as fotos cujo o titulo sejam iguais ao digitado no filtro e retornado em exp.
*/

  computed:{
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(),'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },
//ANTES: o método remove declarada em methods através do evento click usando o atalho @click ( @ no lugar do v-on: chamando o evento escolhido, no caso click)
//só que por por n ser nativo o <meu-botao> n vai funcionar, pois ele não tem a propriedade para isso. Então colocamos um .native para ativar a função do botão
//AGORA: Em methods temos o metodo remove, que usa a o elemento foto para referenciar cada elemento da lista (lá no <meu-botao> também)
//pois estamos usando o v-for lá pra fazer a lista.
//o alert dentro do remove só vai remover e selecionar a foto cujo o titulo esteja relacionado ( já que foto lá no v-for é uma lista )
  methods:{
    remove(foto){
         alert('Remover a foto!' + foto.titulo);
    }
  },

  created(){
    /*
    Tudo que é retornado pelo método then é acessível através da próxima chamada ao then. A resposta em res está em res.json, que coverte a resposta em json
    usando arrow functions há um retorno (return) implícito: no caso, o retorno de res.json()
    o segundo then tb está acessível em fotos
    
    let promise =this.$http.get('http://localhost:3000/v1/fotos');
    promise.then(res => {
      res.json().then(fotos => this.fotos = fotos);
    });
    Não é comum trabalhar com a variável promise ou qualquer outra intermediária. 
    */
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));

    /*A função then tem um parametro de erro, o err*/
    
  }
}
</script>

<style>

.centralizado{
  text-align:center;
}
.lista-fotos{
  list-style:nome;
}
.lista-fotos .lista-fotos-item{
  display:inline-block;
}

.filtro{
  display:block;
  width:100%;
}

</style>
<!--
npm run dev
npm start
-->

<!--
A diretiva v-bind realiza uma associação que flui da fonte de dados para a view.
Qualquer mudança na fonte de dados fará com que a view seja atualizada para representar o novo valor.
Já a diretiva v-on realiza uma associação de evento que flui da view para a fonte de dados.
Para que as mudanças realizadas por v-on sejam atualizadas na view, é necessário combinar v-on com v-bind.
-->


