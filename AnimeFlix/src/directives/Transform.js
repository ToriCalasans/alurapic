import Vue from 'vue';

Vue.directive('transform', {
//criando a diretiva (essa diretiva rotaciona 90°), quando for utlizar precisa ser v-tranform ( ou v-nome da diretiva)
/*O objeto passado como segundo parâmetro precisa ter o método bind, um hook chamado toda vez
que a diretiva é associada ao elemento do DOM. O método recebe três parâmetros. 
funções de gatilho (el, binding, vnode, e oldVnode).

*/
    bind(el, binding, vnode) {
        let current = 0;

        /*Cada diretiva é aplicada isoladamente para cada elemento, Podendo ter suas variáveis de controle específicas para cada elemento.
         A variável current que será iniciada assim que nossa diretiva for aplicada no elemento.( usamos let pra declarar)
         Ela guardará o eixo atual utilizado para rotacionarmos o elemento, começando do 0*/

        el.addEventListener('dblclick', function() {
            let current = 0;
            let incremento = binding.value || 90;
            //Aqui inicializamos as variaiveis

            if(binding.modifiers.reverse) {
                //aqui vai verificar se ta reverso padrão. O current vai incrementar ou decrementar
                current-=incremento;

              } else {
                current+=incremento;
              }
          el.style.transform = `rotate(${current}deg)`;
          //this.style.transform = `rotate(${current}deg)`; funciona também
          if(binding.modifiers.animate){
              el.style.transition = 'transform 0.5s';
          //adiciona uma transição( uma rodadinha mais bonitinha)
          }
          //if (binding.modifiers.animate) this.style.transition = "transform 0.5s"; também funciona
          
          
        });
        /*Utilizamos o addEventListener para adicionar um evento ao el, o dbclick é a chamada pra função
        Via DOM, aplicamos um estilo diretamente no elemento através de elemento.style.nomeDoPropriedade:
        rotate é uma trasnformação tipo css e dag, que é grau
        Usamos ${current} para interpolar dentro da strinf valores de variaveis */
      }
});

/*
- el: O elemento a que a diretiva está vinculada. Isso pode ser usado para manipular o DOM diretamente. omente leitura e nunca modificá-los. Se você precisar compartilhar informações entre gatilhos, é aconselhável utilizar um atributo dataset.
- binding: Um objeto contendo as seguintes propriedades:
    * name: O nome da diretiva, sem o prefixo v-.
    * value: O valor passado para a diretiva. Por exemplo em v-my-directive="1 + 1", o valor passado seria 2. 
    * oldValue: O valor anterior, somente disponível em update e componentUpdated. Está presente tanto se o valor foi alterado quanto não alterado.
    * expression: A expressão de vinculação como uma String. Por exemplo em v-my-directive="1 + 1", a expressão seria "1 + 1".
    * arg: O argumento passado para a diretiva, se houver algum. Por exemplo em v-my-directive:foo, o argumento seria "foo".
    * modifiers: Um objeto contendo modificadores, se houver algum. Por exemplo em v-my-directive.foo.bar, o objeto seria { foo: true, bar: true }.
- vnode: O nó virtual produzido pelo compilador do Vue. Veja VNode API para mais detalhes.
- oldVnode: O nó virtual anterior, somente disponível em update e componentUpdated. 
https://br.vuejs.org/v2/guide/custom-directive.html
Abaixo tem uma versão anterior que pode ser usada. A forma acima está de outro jeito mas achei pertinente manter ambos para ver outros modos
bind(el, binding, vnode) {
        let current = 0;

       // Cada diretiva é aplicada isoladamente para cada elemento, Podendo ter suas variáveis de controle específicas para cada elemento.
       //  A variável current que será iniciada assim que nossa diretiva for aplicada no elemento.( usamos let pra declarar)
       //  Ela guardará o eixo atual utilizado para rotacionarmos o elemento, começando do 0

         el.addEventListener('dblclick', function() {
            let incremento = 90;
            let animate = false;
            //Aqui inicializamos as variaiveis
            if(binding.value){
              incremento = binding.value.incremento;
              animate = binding.value.animate;
              //O if vai verificar se tem valor em binding.value e receber os valores dos parametros
            }
            current+=incremento;
            el.style.transform = `rotate(${current}deg)`;
            //this.style.transform = `rotate(${current}deg)`; funciona também
            if(animate){
                el.style.transition = 'transform 0.5s';
            //adiciona uma transição( uma rodadinha mais bonitinha)
            }
          });
          //Utilizamos o addEventListener para adicionar um evento ao el, o dbclick é a chamada pra função
          //Via DOM, aplicamos um estilo diretamente no elemento através de elemento.style.nomeDoPropriedade:
          //rotate é uma trasnformação tipo css e dag, que é grau
          //Usamos ${current} para interpolar dentro da strinf valores de variaveis 
        }


*/