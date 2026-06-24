const express = require('express');
const app = express();

let listas = [
    { id: 1, produto: 'Leite'}
]

let tamLista = listas.length;

app.use(express.json());

app.get("/listas", (req, res) => {
  res.json(listas);
});

app.post("/listas", (req, res) => {
    tamLista += 1;

    const item = {
        id: tamLista,
        produto: req.body.produto
    }

    listas.push(item)

    res.json(item)
});

app.put("/listas/:id", (req, res) => {
    const item = listas.find(
        u => u.id === Number(req.params.id)
    );
    
    item.produto = req.body.produto ?? item.produto

    res.json(item)
})

app.delete("/listas/:id", (req, res) => {
    let tamanho = listas.length

    listas = listas.filter(
        u => u.id !== Number(req.params.id)
    );

    tamanho === listas.length ? res.send("Item não encontrado") : res.send("Item removido")
})

app.use(express.static("public"));

app.listen(3000);