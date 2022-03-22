<template> 
    <button @click="disparaAcao()" class="botao" :class="estiloBotao" :type="tipo">{{ rotulo }}</button>
    <!--a classe tem dois botao pq um é a classe padrão e o outro a especificação mas podemos tirar e colocar duas classes, uma vai ser a normal com "botao" e a outra com o v-bind ( ou :) para receber o diferncial-->
    <!-- @click="dispararAcao()" vai disparar o evento customizado de botaoAtivado ( que é ativado com o this.$emit)-->
</template>

<script>
export default{
    props: {
        tipo:{
            required: true,
            type: String
        },
        rotulo:{
            required: true,
            type: String
        },
        confirmacao: Boolean,
        estilo:String
    },
    //Aqui vamos indicar melhor qual o tipo que queremos no props e se ele é requerido ou não

    methods:{
        disparaAcao(){
            if(this.confirmacao){
               if(confirm('Confirma operação ?')){
                    this.$emit('botaoAtivado');
                    //através de this.$emit que disparamos um evento customizado passando como nome do parâmetro o evento, no caso botaoAtivado
                    //$emit() é uma função que permite passar eventos personalizados para a árvore de componentes.incluindo aplicativos de nível superior e componentes individuais.Geralmente, você usa $emit()para notificar o componente pai de que algo mudou .
                    //o confirm é uma função que faz uma verificação via alert ( pode ser usado com true e false)
               }  
               return;         
            }
            this.$emit('botaoAtivado');
            //Aqui vamos verificar se ele precisa ou não de confirmação no alert. se for false, só vai this.$emit('botaoAtivado');
            
        }

    },
    computed:{
        estiloBotao(){
            if(this.estilo == 'padrao' || !this.estilo) return 'botao-padrao';
            if(this.estilo == 'perigo') return 'botao-perigo';
            //Aqui vamos fazer uma verificação, o metodo vai verificar se estilo ( lá no props) vai ser igual ou não tem nada (! é não) e retorna o botao-padrao pro botao ( cujo chama a função)
            //mesma coisa em baixo
        }
    }
}

</script>

<style scoped>
    .botao{
        display: inline-block;
        padding:10px;
        border=radius:3px;
        margin:10px;
        font-size:1.2em;
    }
    .botao-perigo{
        background: firebrick;
        color: white;
    }
    .botao-padrao{
        background: darkcyan;
        color:white;
    }

</style>