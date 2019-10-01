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

function tamanho(obj) {
    let tamanho = 0;

    for (let i in obj) {
        tamanho++;
    }

    return tamanho;
}

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