const express = require('express');
const ProductManager = require("./src/productNew")
const app = express();

app.get("/", (req, res) => {
    const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido</title>
    </head>
    <body>
        
    </body>
    </html>`
    return res.send(template);
})

app.get("/products", (req, res) => {
    const limit = req.query.limit;
    return res.send("Limite de productos en ${limit}");
})

app.get("/productos/:title/:price", (req, res) => {
    console.log(req.params);
    return res.send(` Este es el producto ${req.params.name}`)
})

app.listen(8080, () => {
    console.log("Servidor express escuchando en el puerto 8080");
})