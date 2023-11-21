const express = require("express");
const route = express.Router();

const ProductSystem = require("../controller/ProductControllers")
//console.log(ProductSystem.PRODUCTS);


const router = async() => {
    await ProductSystem.fetchProducts()
    ProductSystem.PRODUCTS.push({
        "id": 31,
        "title": "justman",
        "description": "OPPO F19 is officially announced on April 2021.",
        "price": 280,
        "discountPercentage": 17.91,
        "rating": 4.3
    })
}


//Post
route.post("/", ProductSystem.postProduct.bind(ProductSystem));

//Get all
route.get("", ProductSystem.getAllProducts.bind(ProductSystem));

//GET with limit/ offset
route.get("/", ProductSystem.getLimit);

//GET with Search
route.get("/search", ProductSystem.searchProducts.bind(ProductSystem));

//Get (by id)
route.get("/:id", ProductSystem.getById.bind(ProductSystem));

//Put (update)
route.put("/:id", ProductSystem.putProduct);

//Patch
route.patch("/:id", ProductSystem.patchProducts);

//Delete
route.delete("/:id", ProductSystem.deleteProduct);


router().catch((err)=>{
    console.log(err);
})
module.exports = route;