//import { sorteio , clone, tamanho } from './helpers-module.js';

class Genoma{

    pesoTotal = 0;
    valorTotal = 0;
    membros = [];
    pesoMaximo = 32;
    taxaMutacao = 0.7;
    fitnessTotal = 0;

    /**
     * Inicializa o Genoma, sortindo aleatoriamente cada Alelo dos Genes
     * 
     * @param {Array} membros 
     */
    constructor(membros){
        this.membros = membros;
        // Garante a escolha aleatoria do Alelo de cada Gene 
        for(var el in this.membros){
            if(typeof this.membros[el]['ativo'] == 'undefined'){
                this.membros[el]['ativo'] = Math.round(Math.random());
            }
        }

        this.mutacao();
        this.calcFitness();
    }

    /**
     * Gera a mutação de genes aleatórios do Genoma com base a taxa de mutação definida
     */
    mutacao(){
        if(Math.random() > this.taxaMutacao){
            return false;
        }

        let gene = sorteio(this.membros);
        this.membros[gene]['ativo'] = Number(!this.membros[gene]['ativo']);
    }

    /**
     * Calcula o valor do Fitness total
     * 
     * @return
     *  Um valor inteiro que representa o valor do fitness atual
     */

    calcFitness(){
        // Garante que o fitness ainda não foi calculado
        if(this.fitnessTotal){
            return this.fitnessTotal;
        }

        // Inicializa os valor com 0
        this.valorTotal = 0;
        this.pesoTotal = 0;
        this.fitnessTotal = 0;

        // Percorre cada gene somando o valor de cada atributo ao seu total
        for(let gene in this.membros){
            if(this.membros[gene]['ativo']){
                this.valorTotal += this.membros[gene]['valor'];
                this.pesoTotal  += this.membros[gene]['peso']; 
            }
        }

        // Define o valor do fitness - fitness será igual ao somatório de preços dos produtos
        this.fitnessTotal = this.valorTotal;

        // Punição caso o peso total exceda o peso máximo suportado pela mochila
        if(this.pesoTotal > this.pesoMaximo){
            this.fitnessTotal -= (this.pesoTotal - this.pesoMaximo) * 200;
        }

        return this.fitnessTotal;
    }

    /**
     * Realiza o metodo de cruzamento crossover, escolhendo sempre posições aleatorias para realizar o cruzamento
     * 
     * @param {object} outro 
     * @param {object} elementos 
     * 
     * @return
     *  Um array com os dois filhos filhos criados apartir do método
     */
    crossover(outro, elementos){
        let filho1 = {};
        let filho2 = {};
        
        // Escolhendo a posição de maneira aleatória
        let pivot = Math.round(Math.random() * (tamanho(this.membros) - 1));

       let i = 0;
        // realizando o metodo crossover
        for(let elemento in elementos){
            if(i < pivot){
                filho1[elemento] = clone(this.membros[elemento]);
                filho2[elemento] = clone(outro.membros[elemento]);
            }else{
                filho2[elemento] = clone(this.membros[elemento]);
                filho1[elemento] = clone(outro.membros[elemento]);
            }

            i++
        }

        filho1 = new Genoma(filho1);
        filho2 = new Genoma(filho2);

        return [filho1, filho2];
    }
}