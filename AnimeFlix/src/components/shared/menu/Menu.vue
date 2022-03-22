<template> 
    <nav> 
        <ul> 
            <li v-for="rota in rotas">
                <router-link :to="rota.path ? rota.path : '/'">
                    {{ rota.titulo}}
                </router-link>
                <!--Do mesmo jeito que fazemos um lista de fotos com v-for, usamos ele aqui também, pegando as rotas e lendo aquele array de rotas em routes
  router-link é um componente, e o to serve pra substituir o href para não recarregar a página. 
  o ? vai fazer uma verificação ternária onde vamos verificar se há um / para identificar se  link tem o / para ir para página home ( que só tem / em router.js)
  o bind vai puxar o título e deixar ele disponivel-->
            </li>
        </ul>
    </nav>
</template>
<script>
    export default{
       props:{
           rotas:{
                type: Array,
                required: true
                //a validar propriedades em um componente
           }
           
       }
    }
</script>

<style scoped> 

</style>


