<template>
    <img class="imagem-responsiva" :src="url" :alt="titulo">
</template>

<script>
export default{
    props:[
        'url',
        'titulo'
    ]
}
</script>

<style scoped>
/*Deixar a imagem responsiva, ou seja, ela ocupa 100% da área do elemento pai q é a div*/
.imagem-responsiva{
  width:100%;
}
</style>