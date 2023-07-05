const fs = require("fs");
const file = "./products.json";
const express = require("express");


class ProductManager {
  #revenue = 0.4;
  constructor(path) {
    this.event = [];
    this.path = path;
  }

  async getProduct() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if(!data) {
        throw new Error("No hay productos que mostrar");
      }
      console.log(data);
      const json = JSON.parse(data);
      return json;
    } catch (error){
      console.log(error);
    }
  }

  async addProduct(data) {
    const product = {
      id: this.event.length + 1,
      code: data.code,
      title: data.title,
      description: data.description,
      price: data.price + this.#revenue,
      thumbnail: data.thumbnail,
      stock: data.stock,
    };

    if (
      !data.code ||
      !data.title ||
      !data.description  ||
      !data.price  ||
      !data.thumbnail  ||
      !data.stock
    ) {
      console.log("Todos los campos son obligatorios.")
      return ;
    }

    const productAdded = this.event.findIndex(product => product.code === data.code);

    if (productAdded !== -1) {
      console.log("Error: El producto ya se encuentra cargado");
      return;
    }

    this.event.push(product);

    const productString = JSON.stringify(this.event, null, 2);

    fs.promises
      .writeFile(this.path, productString, "utf-8")
      .then(() => {
        console.log("Se guarda correctamente")
      })
      .catch((error) => {
        console.log([error]);
      })


  }

  async getProductbyId(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if(!data) {
        throw new Error("No hay productos que mostrar");
      }
      const json = JSON.parse(data);
      const product = json.find((product) => product.id === id);
      console.log(product);
      if (!product) {
        throw new Error("No se encontró el producto");
      }
      return product;
    } catch (error){
      console.log(error)
    }
  }

  async updateProduct(id, data) {
    try{
      const event = await this.getProduct();
      const index = event.findIndex((product) => product.id === id);
      if(index=== -1){
        throw new Error ("No se encontró el producto");
      }
      const product = event[index];
      const updateProduct = { ...product, ...data, id};
      event.splice(index, 1, updateProduct);
      const productString = JSON.stringify(event, null, 2);
      await fs.promises.writeFile(this.path, productString, "utf-8");
      console.log("Producto actualizado correctamente");
    }catch (error){
      console.log(error);
    }
  }

  deleteProduct(id) {
    const productIndex = this.event.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      return console.log("No se encuentra el producto");
    }
    this.event.splice(productIndex, 1);

    console.log("Se eliminó el producto");
  }


}

const manager = new ProductManager("./products.json");

module.exports = ProductManager;

/* 
const product1 = {
  code: 1,
  title: "Porta Vela",
  description: "Vela en copa a juego para decoración",
  price: 3450,
  thumbnail: "../img/Porta-vela.jpeg",
  stock: 12,
};

manager.addProduct(product1);

console.log(manager.getProduct());

const product2 = {
  code: 2,
  title: "Cuadros Botánicos",
  description: "Combo cuadros x 3",
  price: 12800,
  thumbnail: "../img/Cuadro-botanico.webp",
  stock: 9,
};

manager.addProduct(product2);

console.log(manager.getProductbyId(2));

manager.updateProduct(2, { 
  code:2,
  title: "Cuadros",
  description: "Cuadro de combo",
  price: 15000,
  thumbnail: "www.image.com",
  stock: 30
});

manager.getProductbyId(2); 

const product3 = {
  code: 3,
  title: "Cuadros geométricos",
  description: "Combo cuadros x 6",
  price: 0,
  thumbnail: "",
  stock: 12,
};


manager.addProduct(product3);
 */