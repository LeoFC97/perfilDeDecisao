var gabaritos = []
gabaritos[0] = ['c', 'a', 'v', 'd']
gabaritos[1] = ['a', 'v', 'd', 'c']
gabaritos[2] = ['v', 'c', 'd', 'a']
gabaritos[3] = ['a', 'd', 'c', 'v']
gabaritos[4] = ['a', 'd', 'c', 'v']

//alert(gabaritos[0][0]) //c
//alert(gabaritos[2][3]) // a
const quantidaPerguntas = 5
const quantidadeAlternativas = 4

function sendForm() {
    var matrizDeRespostas = []
    for (i = 0; i < quantidaPerguntas; i++) {
        var cardAtual = document.getElementsByClassName(`resp${i + 1}`)
        matrizDeRespostas[i] = []
        for (j = 0; j < quantidadeAlternativas; j++) {
            matrizDeRespostas[i][j] = cardAtual[j].value
        }
    }
    generateAnalises(matrizDeRespostas)
}

function handlerCard(classeDoCard) {
    var valorRepetido
    const respostasDesseCard = document.getElementsByClassName(classeDoCard)
    var respostasJaUsadas = [0, -1, -2, -3]
    for (i = 0; i < respostasDesseCard.length; i++) {
        if (respostasDesseCard[i].value != "") {
            valorRepetido = respostasDesseCard[i]
            respostasJaUsadas[i] = respostasDesseCard[i].value
        }
    }
    const a = hasDuplicates(respostasJaUsadas)
    console.log("valor do a: " + a)
    a ? showAlert(valorRepetido) : false
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function showAlert(duplicatedValue) {
    alert("Esse valor ja foi usado")
    duplicatedValue.value = ""
}

function generateAnalises(matrizDeRespostas) {
    var analises = []
    for (i = 0; i < quantidaPerguntas; i++) {
        analises[i] = []
        for (j = 0; j < quantidadeAlternativas; j++) {
            var gabaritoAtual = gabaritos[i][j]
            //console.log(gabaritoAtual)
            analises[i][j] = { [gabaritoAtual]: matrizDeRespostas[i][j] }
        }
    }
    var vlist = []

    var clist = []

    var alist = []

    var dlist = []

    for (i = 0; i < quantidaPerguntas; i++) {
        //console.log(analises[i]['a'])
        for (j = 0; j < quantidadeAlternativas; j++) {
            if (analises[i][j].v) {
                vlist.push(parseFloat(analises[i][j].v))
            }
            if (analises[i][j].c) {
                clist.push(parseFloat(analises[i][j].c))
            }
            if (analises[i][j].a) {
                alist.push(parseFloat(analises[i][j].a))
            }
            if (analises[i][j].d) {
                dlist.push(parseFloat(analises[i][j].d))
            }
        }
    }

    vsum = 2 * (vlist[0] + vlist[1] + vlist[2] + vlist[3] + vlist[4])

    csum = 2 * (clist[0] + clist[1] + clist[2] + clist[3] + clist[4])

    asum = 2 * (alist[0] + alist[1] + alist[2] + alist[3] + alist[4])

    dsum = 2 * (dlist[0] + dlist[1] + dlist[2] + dlist[3] + dlist[4])

    res_dic = { Visual: vsum, Cinestesico: csum, Auditivo: asum, Digital: dsum }
 
    exibirResultados(res_dic)
}


function exibirResultados(resultados) {
    var maior = -Infinity;
    var chave;
    for (var prop in resultados) {
        // ignorar propriedades herdadas
        if (resultados.hasOwnProperty(prop)) {
            if (resultados[prop] > maior) {
                maior = resultados[prop];
                chave = prop;
            }
        }
    }

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '<strong>Seus resultados:</strong>',
        html:
            `
            <p> Voce toma decisões de forma: <strong>${chave}</strong></p>
            <ul>
            <li>Visual: ${resultados.Visual}%</li>
            <li>Cinestesico: ${resultados.Cinestesico}%</li>
            <li>Auditivo: ${resultados.Auditivo}%</li>
            <li>Digital: ${resultados.Digital}%</li>
        </ul>
        <i>Deseja ver mais sobre o seu pefil?</i>
        `,
        showConfirmButton:true,
        showCancelButton: true,
        confirmButtonText:
    `<a href="./perfis/${chave}.html"> <i style="color:white;"> Sim!</i> </a>`,
    confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i>Nao! </i>',
  cancelButtonAriaLabel: 'Thumbs down'
    })
}