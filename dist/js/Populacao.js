//let helper = require('./helpers-module');

class Populacao {

    genomas = [];
    elitismo = 0.2;
    tamanho = 100;
    elementos = false;
    setMutacao = 0.7;
    setPesoMax = 32;

    /**
     * Inicializa uma nova população
     * 
     * @param {Array} elementos 
     * @param {Integer} tamanho 
     */
    constructor(elementos, setMutacao, setPesoMax, tam) {
        if (!tam) {
            tam = 10;
        }

        if (!setMutacao) {
            setMutacao = 0.7;
        }

        if (!setPesoMax) {
            setPesoMax = 32;
        }

        this.setMutacao = setMutacao;
        this.setPesoMax = setPesoMax;
        this.elementos = elementos;
        this.tamanho = tam;
        if(tamanho(this.elementos) < 2){
            return false;
        }
        console.log(tamanho(this.elementos));
        this.popular();
    }

    /**
     * Cria e popula todos os Genomas da população
     * 
     */
    popular() {
        while (this.genomas.length < this.tamanho) {
            if (this.genomas.length < this.tamanho / 3) {
                //console.log("Populando peso" + this.setPesoMax);
                this.genomas.push(new Genoma(clone(this.elementos), this.setMutacao, this.setPesoMax));
            } else {
                this.pCrossover();
            }
        }
    }

    /**
     * Ordena todos os Genomas pelo valor fitness
     */
    sort() {
        this.genomas.sort((a, b) => {
            return b.calcFitness() - a.calcFitness();
        });
    }

    /**
     * Ordena todos os Genomas pelo valor do fitness com a correção do peso
     */
    wSort() {
        this.genomas.sort((a, b) => {
            if (a.calcFitness() > b.calcFitness()) {
                if (a.pesoTotal > b.pesoTotal && a.pesoTotal > this.genomas.pesoMaximo) return 1;
                return -1;
            } else if (b.calcFitness() > a.calcFitness()) {
                if (b.pesoTotal > a.pesoTotal && b.pesoTotal > this.genomas.pesoMaximo) return -1;
                return 1;
            }

            if (a.pesoTotal < b.pesoTotal) return -1;
            else if (b.pesoTotal < a.pesoTotal) return 1;

            return 0;
        });
    }

    /**
     * Elimina os genomas com base no falor fitness
     * 
     */
    selecao() {
        let b = Math.floor(this.elitismo * this.genomas.length);

        while (this.genomas.length > b) {
            this.genomas.pop();
        }
    }

    /**
     * Torneio Binário
     */
    torneioBinario(){
        let a = sorteio(this.genomas);
        let b = sorteio(this.genomas);
 
        while(a == b){
            if(a === b) break;
            b = sorteio(this.genomas);
        }

        if(this.genomas[b].calcFitness() > this.genomas[a].calcFitness()) return b;

        return a;
    }


    /**
     * Seleciona os genomas para realização do crossover
     * 
     */
    pCrossover() {

        let key1 = this.torneioBinario();
        let key2 = this.torneioBinario();

        // Garante que o genoma não faça o crossover com ele mesmo
        while(key1 == key2){
            if(key1 === key2) break;
            key2 = this.torneioBinario();
        }

        let filhos = this.genomas[key1].crossover(this.genomas[key2], this.elementos);
        this.genomas = this.genomas.concat(filhos);
    }

    /**
     * Cria a nova geração
     */
    geracao() {
        this.sort(); // ordena os genomas
        this.selecao(); // elimina com base no elitismo
        this.pCrossover(); // realiza o crossover entre os pares de genomas randomicamente selecionados
        this.popular(); // garante que a população tenha sempre o mesmo tamanho
        this.sort(); // reordena os genomas
    }

    /**
     * 
     * @param {integer} i  - Número da geração
     * @param {integer} nenhumaMelhoria  - Número de vezes que não houve alterações no fitness da população
     */
    display(i, nenhumaMelhoria) {
        $('#gen_no').text(i);
        $('#weight').text(this.genomas[0].pesoTotal.toFixed(2));
        $('#value').text(this.genomas[0].fitnessTotal);
        $('#nochange').text(nenhumaMelhoria);
        //let tableElement = $('table#tableElement tbody');
        //let arr;
        //let count = 0;
        console.log(this.genomas[0].pesoTotal.toFixed(2));
        $("#tableElement tbody tr").remove();
        $.each(this.genomas[0].membros, (i, v) => {
            addTableRow('table#tableElement', i, v.valor, v.peso, v.ativo);
        });
    }




    /**
     * Inicia o algoritmo genético
     * 
     * @param {integer} limite - A quantidade de gerações a serem geradas
     * @param {integer} nenhumaMelhoria - O número de vezes que não houve alterações no fitness da população
     * @param {integer} ultimoFitness - O número do ultimo fitness
     * @param {integer} i - Variavel de controle
     */
    iniciar(limite, delay, nenhumaMelhoria, ultimoFitness, i) {
        if (i >= limite) {
            return;
        }
        if(tamanho(this.elementos) < 2){
            return false;
        }
        console.log(tamanho(this.elementos));
        if(!delay || delay == 0){
            delay = 1;
        }

        if (!limite) {
            limite = 1000; // Se limite não for definido, ele gerará 1000 gerações
        }
        if (!nenhumaMelhoria) {
            nenhumaMelhoria = 0; //inicializa as melhorias
        }
        if (!ultimoFitness) {
            ultimoFitness = false; //inicia o ultimofitness
        }
        if (!i) {
            i = 0;
        }

        /**
         * Opcional - Controla o número de gerações através da quantidade de vezes que o fitness não foi alterado
         */
        //if(nenhumaMelhoria == 3){
        //    return ;
        //}

        i++;

        if (nenhumaMelhoria < limite) {
            ultimoFitness = this.genomas[0].calcFitness();
            this.geracao();

            if (ultimoFitness >= this.genomas[0].calcFitness()) {
                nenhumaMelhoria++;
            } else {
                nenhumaMelhoria = 0;
            }

            //i++;

            if (i % 10 == 0 && delay == 1) {
                this.display(i, nenhumaMelhoria);
            }else{
                this.display(i, nenhumaMelhoria);
            }

            let scope = this;

            setTimeout(() => {
                scope.iniciar(limite, delay, nenhumaMelhoria, ultimoFitness, i)
            }, delay);

            return false;
        }

        this.display(i, nenhumaMelhoria);
    }
}