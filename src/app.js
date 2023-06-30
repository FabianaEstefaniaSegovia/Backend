const express = require("express");
const ProductManager = require("./product/ProductManager")
const app = express();
app.use(express.urlencoded({extended: true}))
const manager = new ProductManager("./productos.json");

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

app.get("/products", async (req, res) => {
    const products = await manager.getProduct();
    const limit = req.query.limit;

    if(!limit) {
        console.log(products);
        return res.send(products);
    } else {

    const prodLimit = products.slice(0, limit)
    console.log(prodLimit);
    return res.send(`Limite de productos en ${prodLimit}`);
    }
})

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const prod = await manager.getProductbyId(id);
    if (!prod){
        return res 
            .status(404)
            .send("No se encontró producto con ese id");
    }

    console.log(prod);
    return res.send(prod);
})

app.listen(8080, () => {
    console.log("Servidor express escuchando en el puerto 8080");
})