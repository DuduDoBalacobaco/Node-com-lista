let consultaId = document.getElementById('consultaId')
let consultaProduto = document.getElementById('consultaProduto')

let cadastroProduto = document.getElementById('cadastroProduto')

let alterarProd = document.getElementById('alterarProd')
let alterarId = document.getElementById('alterarId')

let deletarId = document.getElementById('deletarId')

let textCad = document.getElementById('textoCadastrar')

let lista = []

async function carregaLista() {
    const resposta = await fetch("/listas");
    const listas = await resposta.json();

    lista = listas;

    let listagem =  document.getElementById('lista')
    let listagem2 =  document.getElementById('lista2')
    listagem.textContent = ""
    listagem2.textContent = ""
    let contador = 1;

    document.getElementById('parteDeFurosPagina2').style.animation = "fecharFuro 1.5s ease-in-out forwards"
    document.getElementById('mostrarPagina2').style.animation = "fecharPagina 1.5s ease-in-out forwards"

    listas.forEach(u => {
        if(contador <= 10){
            criarLista(u, listagem)
            contador += 1;
        }
        else{
            if(contador === 11){
                document.getElementById('parteDeFurosPagina2').style.animation = "abrirFuro 2s ease-in-out forwards"
                document.getElementById('mostrarPagina2').style.animation = "abrirPagina 2s ease-in-out forwards"
            }
            criarLista(u, listagem2)
            contador += 1; 
        }
    })
}

function criarLista(u, lista){
    let li = document.createElement('li')
    let hr = document.createElement('hr')
    li.id = u.id

    li.textContent = `${u.id} - ${formatarTexto(u.produto)}`;
    lista.appendChild(li)
    lista.appendChild(hr)
}

function consultaLista(){
    let existe = false;
    let texto = document.getElementById('textoConsulta')

    lista.forEach(u => {

        let id = Number(consultaId.value)
        let prod = `ID: ${u.id} - ${formatarTexto(consultaProduto.value)}`

        if(id === u.id || prod === `ID: ${u.id} - ${u.produto}`){
            document.getElementById(u.id).style.color = "magenta"

            existe = true

            setTimeout(() => {
                document.getElementById(u.id).style.color = "black"
            }, 3000)
        }
    })

    if(!existe){
            texto.textContent = "Produto não encontrado"
            texto.style.color = "red"
            document.getElementById('green').style.display = "none"

            setTimeout(() => {
                texto.textContent = "Digite o que você gostaria de "
                texto.style.color = "black"
                document.getElementById('green').style.display = "flex"
            }, 3000)
        }

    limparInput(consultaId)
    limparInput(consultaProduto)
}

async function cadastrarProduto(item) {
    await fetch("/listas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({produto: item})
    });

    carregaLista()
}

function verificarItemExistente(){
    let item = formatarTexto(cadastroProduto.value);
    let existe = false;

    if(item === ""){
        textCad.textContent = "Digite ao menos um produto"
        textCad.style.color = "red"
        document.getElementById('yellow').style.display = "none"

        existe = true
    }
    else{
        lista.forEach(u => {
            if(u.produto === `${item}`){
                textCad.textContent = "Já existe esse produto na lista"
                textCad.style.color = "red"
                document.getElementById('yellow').style.display = "none"

                existe = true
            }
        })
    }

    setTimeout(() => {
        textCad.textContent = "Digite abaixo o que quer "
        document.getElementById('yellow').style.display = "flex"
        textCad.style.color = "black"
    }, 2000)

    limparInput(cadastroProduto)

    if(!existe){
        cadastrarProduto(item)
    }
}

async function alterarProduto(id ,prod){
    await fetch(`/listas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({produto: prod})
    });
    
    limparInput(alterarId)
    limparInput(alterarProd)

    alteraLayoutAlterar()
    carregaLista()
}

function capturarIdAlterar(){
    let id = Number(alterarId.value)
    let prod = formatarTexto(alterarProd.value)

    alterarProduto(id, prod)
}

async function excluirItem(id) {
   await fetch(`/listas/${id}`, {
       method: "DELETE"
   });

   limparInput(deletarId)
   alteraLayoutDeletar()
   carregaLista()
}

function capturarIdDeletar(){
    let id = Number(deletarId.value)
    
    excluirItem(id)
}

function limparInput(input){
    input.value = ""
}

function formatarTexto(text){
    let texto = text.trim().toLowerCase();
    let formatado = "";

    for(let i = 0; i < texto.length; i++){
        formatado += (i === 0) || (texto.charAt(i - 1) === " ") ? texto.charAt(i).toUpperCase() : texto.charAt(i)
    }
    return formatado
}

let layoutCon = document.getElementById('consultar')
let layoutCad = document.getElementById('cadastrar')
let layoutAlt = document.getElementById('alterar')
let layoutDel = document.getElementById('deletar')

let layoutConfirmar = document.getElementById('confirmar')
let layoutIdDel = document.getElementById('idDeletar')
let layoutIdAlt = document.getElementById('idAlterar')
let layoutInputAlt = document.getElementById('inputAlterar')

let alt = document.getElementById('alt')
let con = document.getElementById('con')
let cad = document.getElementById('cad')
let del = document.getElementById('del')

let layout = document.getElementById('layoutAberto')

function alteraLayoutConsulta(){
    layoutCon.style.display = "flex"
    layoutAlt.style.display = "none"
    layoutCad.style.display = "none"
    layoutDel.style.display = "none"

    cad.style.border = "2px solid black"
    alt.style.border = "2px solid black"
    del.style.border = "2px solid black"

    cad.style.borderBottom = "2px solid rgb(0, 255, 0)"
    alt.style.borderBottom = "2px solid rgb(0, 255, 0)"
    del.style.borderBottom = "2px solid rgb(0, 255, 0)"
    con.style.border = "2px solid rgb(0, 255, 0)"
    layout.style.border = "2px solid rgb(0, 255, 0)"

    con.style.borderBottom = "none"
    layout.style.borderTop = "none"

    con.style.color = "rgb(0, 255, 0)"
    del.style.color = "black"
    alt.style.color = "black"
    cad.style.color = "black"

    con.style.transform = "scaleY(1.3)"
    cad.style.transform = "scaleY(1)"
    del.style.transform = "scaleY(1)"
    alt.style.transform = "scaleY(1)"
}

function alteraLayoutCadastro(){
    layoutCon.style.display = "none"
    layoutAlt.style.display = "none"
    layoutCad.style.display = "flex"
    layoutDel.style.display = "none"

    alt.style.border = "2px solid black"
    del.style.border = "2px solid black"
    con.style.border = "2px solid black"

    cad.style.border = "2px solid yellow"
    alt.style.borderBottom = "2px solid yellow"
    del.style.borderBottom = "2px solid yellow"
    con.style.borderBottom = "2px solid yellow"
    layout.style.border = "2px solid yellow"

    cad.style.borderBottom = "none"
    layout.style.borderTop = "none"

    cad.style.color = "yellow"
    con.style.color = "black"
    alt.style.color = "black"
    del.style.color = "black"

    cad.style.transform = "scaleY(1.3)"
    con.style.transform = "scaleY(1)"
    del.style.transform = "scaleY(1)"
    alt.style.transform = "scaleY(1)"
}

function alteraLayoutAlterar(){
    layoutCon.style.display = "none"
    layoutAlt.style.display = "flex"
    layoutCad.style.display = "none"
    layoutDel.style.display = "none"

    layoutInputAlt.style.display = "none"
    layoutIdAlt.style.display = "flex"

    con.style.border = "2px solid black"
    cad.style.border = "2px solid black"
    del.style.border = "2px solid black"

    cad.style.borderBottom = "2px solid rgb(3, 3, 199)"
    alt.style.border = "2px solid rgb(3, 3, 199)"
    del.style.borderBottom = "2px solid rgb(3, 3, 199)"
    con.style.borderBottom = "2px solid rgb(3, 3, 199)"
    layout.style.border = "2px solid rgb(3, 3, 199)"

    alt.style.borderBottom = "none"
    layout.style.borderTop = "none"

    alt.style.color = "rgb(3, 3, 199)"
    del.style.color = "black"
    con.style.color = "black"
    cad.style.color = "black"

    alt.style.transform = "scaleY(1.3)"
    cad.style.transform = "scaleY(1)"
    del.style.transform = "scaleY(1)"
    con.style.transform = "scaleY(1)"
}

function alteraLayoutDeletar(){
    layoutCon.style.display = "none"
    layoutAlt.style.display = "none"
    layoutCad.style.display = "none"
    layoutDel.style.display = "flex"

    layoutConfirmar.style.display = "none"
    layoutIdDel.style.display = "flex"

    alt.style.border = "2px solid black"
    con.style.border = "2px solid black"
    cad.style.border = "2px solid black"

    cad.style.borderBottom = "2px solid red"
    alt.style.borderBottom = "2px solid red"
    del.style.border = "2px solid red"
    con.style.borderBottom = "2px solid red"
    layout.style.border = "2px solid red"

    del.style.borderBottom = "none"
    layout.style.borderTop = "none"

    del.style.color = "red"
    cad.style.color = "black"
    con.style.color = "black"
    alt.style.color = "black"

    del.style.transform = "scaleY(1.3)"
    cad.style.transform = "scaleY(1)"
    con.style.transform = "scaleY(1)"
    alt.style.transform = "scaleY(1)"

    limparInput(deletarId)
}

function mudarLayoutInputAlterar(){
    let id = Number(alterarId.value)
    let texto = document.getElementById('textoAlterar')
    let existeId = false

    lista.forEach(u => {
        if(id == u.id){
            existeId = true
        }
    })


    if(id === "" || !existeId){
        texto.textContent = "Digite um ID válido"
        texto.style.color = "red"
        document.getElementById('blue').style.display = "none"
        limparInput(alterarId)

        setTimeout(() => {
            texto.textContent = "Digite o id do produto que quer "
            texto.style.color = "black"
            document.getElementById('blue').style.display = "flex"
        }, 3000)
    }
    else{
        layoutIdAlt.style.display = "none"
        layoutInputAlt.style.display = "flex"
    }
}

function mudarLayoutInputDeletar(){
    let id = Number(deletarId.value)
    let texto = document.getElementById('textoDeletar')
    let existeId = false

    lista.forEach(u => {
        if(id === u.id){
            existeId = true
        }
    })

    if(id === "" || !existeId){
        texto.textContent = "Digite um ID válido"
        texto.style.color = "red"
        document.getElementById('red').style.display = "none"
        limparInput(deletarId)

        setTimeout(() => {
            texto.textContent = "Digite o id do produto que quer "
            texto.style.color = "black"
            document.getElementById('red').style.display = "flex"
        }, 3000)
    }
    else{
        layoutIdDel.style.display = "none"
        layoutConfirmar.style.display = "flex"
    }
}

alteraLayoutConsulta()

carregaLista()