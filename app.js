const express = require('express');
const app = express();

let listas = [
    { id: 1, produto: 'Leite'}
]

let tamLista = listas.length;

app.use(express.json());

app.get("/listas", (req, res) => {
  res.status(201).json(listas);
});

app.post("/listas", (req, res) => {
    if(!req.body.produto) {
        return res.status(400).json({
            erro: "O produto é obrigatório"
        });
    }

    tamLista += 1;

    const item = {
        id: tamLista,
        produto: req.body.produto
    }

    listas.push(item)

    res.status(200).json(item)
});

app.put("/listas/:id", (req, res) => {
    const item = listas.find(
        u => u.id === Number(req.params.id)
    );
    
    if(!item){
        return res.status(404).json({
            erro: "Item não encontrado"
        })
    }
    item.produto = req.body.produto === "" || req.body.produto === null ? item.produto : req.body.produto;

    res.status(200).json(item)
})

app.delete("/listas/:id", (req, res) => {
    const index = listas.findIndex(
        u => u.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            erro: "Item não encontrado"
        });
    }

    listas.splice(index, 1);

    res.status(200).send("Produto removido")
})

app.use(express.static("public"));

app.listen(3000);