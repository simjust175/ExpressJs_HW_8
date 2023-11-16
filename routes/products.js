const express = require("express");
const route = express.Router();

const ProductSystem = require("../controller/ProductControllers")
//console.log(ProductSystem.PRODUCTS);



ProductSystem.fetchProducts()
ProductSystem.PRODUCTS.push({
    "id": 31,
    "title": "justman",
    "description": "OPPO F19 is officially announced on April 2021.",
    "price": 280,
    "discountPercentage": 17.91,
    "rating": 4.3
})
console.log(ProductSystem.PRODUCTS[30]);
console.log(ProductSystem.postProduct);
//Post
route.post("/", ProductSystem.postProduct);

//Get all
route.get("/", ProductSystem.getAllProducts.bind(ProductSystem));

//Get with queries
route.get("/", ProductSystem.getLimit);

//GET with Search
route.get("/search", ProductSystem.searchProducts);

//Get (by id)
route.get("/:id", ProductSystem.getById.bind(ProductSystem));

//Put (update)
route.put("/:id", ProductSystem.putProduct);

//Delete
route.delete("/:id", ProductSystem.deleteProduct);

//Patch
route.patch("/:id", ProductSystem.patchProducts);



module.exports = route;