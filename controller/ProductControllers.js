const { log } = require("console");
const fs = require("fs");
const path = require("path");

class ProductSystem {
   static PRODUCTS = [];

    // fetch products
    static async fetchProducts() {
        const res = await fetch("https://dummyjson.com/products");
        const { products } = await res.json();
        this.PRODUCTS = products;
        console.log(typeof this.PRODUCTS[2]);
    };


   static statusCheck(res, value) {
        if (value.length < 1) {
            res.status(404);
            console.log("404 error occurred....");
            fs.createReadStream(path.join(__dirname, "../error/err.html")).pipe(res);
        }
    }
    //post
    static postProduct(req, res) {
        let product = req.body;
        console.log(product);
        //this.statusCheck(res, this.PRODUCTS);
        // res.status(201);
        // this.PRODUCTS.push(product);
        // res.json({ msg: "Product successfully added", product })
    };

    //get all
    static getAllProducts(req, res) {
        this.statusCheck(res, this.PRODUCTS);
        res.send(this.PRODUCTS);
    }

    //Put(update)
    static putProduct(req, res) {
        let product = req.body;
        let id = req.params.id;
        let currentProduct = this.PRODUCTS[id - 1];
        this.PRODUCTS.splice(currentProduct, 1, product)
        res.json({ msg: "PRODUCT successfully updated", PRODUCT })
    }

    //get with limit
    static getLimit(req, res) {
        let limit = parseInt(req.query.limit, 10) || 10;
        let offset = parseInt(req.query.offset, 10) || 0;
        this.statusCheck(res, this.PRODUCTS);
        let limitedProducts = this.PRODUCTS.slice(offset, offset + limit);
        res.send(limitedProducts)

    }

    //get searched
    static searchProducts(req, res) {
        this.statusCheck(res, this.PRODUCTS);
        let q = req.query.q.toLowerCase();
        let by = req.query.by || "title";
        let searchedProducts = this.PRODUCTS.filter(product => product[by].toLowerCase().includes(q)) || this.PRODUCTS;
        res.send(searchedProducts);

    }

    //get by id
    static getById(req, res) {
        console.log("entered the search by id ward");
        let id = parseInt(req.params.id);
        this.statusCheck(res, id);
        let currentProduct = this.PRODUCTS[id - 1];
        console.log(`CurrentPRODUCT: ${currentProduct}`);
        res.status(200);
        res.send(currentProduct);
    }

    //Patch
    static patchProducts(req, res) {
        let id = req.params.id;
        let patch = req.body;
        let keys = Object.keys(patch);
        keys.forEach(key => this.PRODUCTS[id - 1][key] = patch[key])
        res.send({ "msg": "Item successfully patched.", patch })
    }

    //Delete
    static deleteProduct(req, res) {
        let id = req.params.id;
        this.PRODUCTS.splice(id - 1, 1);
        res.send({ "msg": "Product successfully deleted" })
    }
}

module.exports = ProductSystem;