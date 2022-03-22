
<template>
    <div class="painel">
    <!--dblclick é evento do javascript para disparar-->
      <h2 class="painel-titulo" v-on:dblclick="visivel = !visivel">{{titulo}}</h2>
    <!--  
      <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{titulo}}</h2>
    pode-se usar um @ no lugar do v-on: 
    -->
    <!--O componente transition só acopla um elemento de cada vez--> 
      <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot></slot>
      </div>
      </transition>

      <!--
      Quando o Vue renderiza nosso componente Painel em App, ele não entende que deve preservar tudo aquilo que esta entre as tags <meu-painel>. 
      O Vue manipula aquela parte do DOM trocando-a pela renderização do nosso componente Painel. Para que isso seja possível, precisamos indicar no template de Painel a área que queremos considerar como um slot, ou seja, aquela área que recebera tudo aquilo que tiver dentro da tag <meu-painel>.
      Slots são espaços reservados oferecidos por vuejs para exibir o conteúdo transmitido de um componente para outro.
      -->
    </div>
</template>

<script>
export default {
  props: ['titulo'],
  data(){
    return{
      visivel: true
    }
    
  }

}
</script>

<style>
/* estilo do painel */ 

   .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  .painel-fade-enter, .painel-fade-leave-active{
    opacity:0;
  }
  .painel-fade-enter-active, .painel-fade-leave-active{
    transition: opacity .3s;
  }

</style>

<!--
painel-fade-enter // antes do elemento ser incluído ou removido, o estado atual
painel-fade-enter-active // quando o elemento esta sendo incluído
painel-fade-leave-active // quando o elemento esta sendo removido
-->