//module.exports = {
/**
 * Sorteia aleatoriamente Genes do Genoma e os retorna
 * 
 * @param {Array} obj 
 * @returns resultado
 */
function sorteio(genoma) {
    let resultado;
    let count = 0;

    for (let gene in genoma) {
        if (Math.random() < 1 / ++count) {
            resultado = gene;
        }
    }
    return resultado;
}

/**
 * 
 * @param {object} obj 
 */
function clone(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    return obj;
}


/**
 * Retorna o tamanho do Objeto
 * 
 * @param {object} obj 
 */
function tamanho(obj) {
    let tamanho = 0;

    for (let i in obj) {
        tamanho++;
    }

    return tamanho;
}


/**
 * Adiciona Nova tabela a Tabela
 * 
 * @param {object} selector 
 * @param {String} name 
 * @param {integer} value 
 * @param {integer} peso 
 * @param {integer} isActive 
 */
function addTableRow(selector, name, value, peso, isActive) {
    var newRow = $("<tr class='text-center'>");
    var cols = "";
    cols += '<td>' + name + '</td>';
    cols += '<td>' + peso + ' Kg</td>';
    cols += '<td>R$ ' + value + '</td>';
    if (isActive == 1) {
        cols += '<td><span class="badge badge-success">Selecionado</span></td>';
    } else {
        cols += '<td><span class="badge badge-secondary">Não Selecionado</span></td>';
    }
    newRow.append(cols);
    $(selector).append(newRow);
    return false;
}

/**
 * Adiciona novo elemento ao Objeto
 * 
 * @param {object} obj
 * @param {String} name
 * @param {integer} peso
 * @param {integer} valor
 */
function addObj(obj, name, peso, valor){
    return Object.assign({[name]:{"peso": peso, "valor": valor}}, obj);
}

/**
 * Edita Elemento do Objeto
 * 
 * @param {object} obj
 * @param {String} name
 * @param {integer} peso
 * @param {integer} valor
 */
function editObj(obj, name, peso, valor){
    $.each(obj, (key, value) => {
        if(key == name){
            value.peso = peso;
            value.valor = valor;
        }
    });

    return obj;
}

/**
 * Deletar um item do Objeto
 * 
 */

 function delObj(obj,name){
    delete obj[name];
    return obj;
 }