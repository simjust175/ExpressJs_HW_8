//const { log } = require("console");
const fs = require("fs");
const path = require("path");

class ProductSystem {
   static PRODUCTS = [];

    // fetch products
    static async fetchProducts() {
        const res = await fetch("https://dummyjson.com/products");
        const { products } = await res.json();
        this.PRODUCTS = products;
    };


   static statusCheck(res, value) {
        if (!value) {
            console.log("404 error occurred....");
            //fs.createReadStream(path.join(__dirname, "../error/err.html")).pipe(res);
            res.status(404).send("OOPS! 404, YA'LL KNOW WHAT THAT MEANS......")
        }
    }

    static postStatusCheck(res, value){
        console.log(value);
        if (!value) {
            res.status(400).send("Missing book data");
        }
        if (!value.id) {
            res.status(400).send("Missing book id");
        }
        if (!value.title) {
            res.status(400).send("Missing book title");
        }
       
    }

    static getIndexById(req, res){
        const id = req.params.id;
        const productById = this.PRODUCTS.find(product => product.id == id);
        const productIndex = this.PRODUCTS.indexOf(productById);
        return this.PRODUCTS[productIndex];
    }

    //post
    static postProduct(req, res) {
        let product = req.body;
        console.log(product);
        this.postStatusCheck(res, product);
        res.status(201);
        this.PRODUCTS.push(product);
        res.json({ msg: "Product successfully added", product })
    };

    //get all
    static getAllProducts(req, res) {
        this.statusCheck(res, this.PRODUCTS);
        res.send(this.PRODUCTS);
    }

    //get with limit
    static getLimit(req, res) {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const list = [...this.PRODUCTS];
        console.log(list);
        if(list.length < (offset + limit)){
            res.status(404).send("limit too high...")
        }
        const limitedProducts = list.slice(offset, offset + limit);
        res.send(limitedProducts)

    }

    //get with search
    static searchProducts(req, res) {
        this.statusCheck(res, this.PRODUCTS);
        let q = req.query.q.toLowerCase();
        let by = req.query.by || "title";
        let searchedProducts = this.PRODUCTS.filter(product => product[by].toLowerCase().includes(q)) || this.PRODUCTS;
        res.send(searchedProducts);

    }

    //get by id
    static getById(req, res) {
        const currentProduct = this.getIndexById(req, res);
        this.statusCheck(res, currentProduct);
        res.status(200);
        console.log(`Client req by id: ${currentProduct.title}`);
        res.send(currentProduct);
    }

    //Put(update)
    static putProduct(req, res) {
        let product = req.body;
        let id = req.params.id;
        let currentProduct = this.PRODUCTS[id - 1];
        const list = [...this.PRODUCTS]
        list.splice(currentProduct, 1, product)
        res.json({ msg: "product successfully updated"})
    }

    //Patch
    static patchProducts(req, res) {
        const currentProduct = getIndexById()
        let patch = req.body;
        let keys = Object.keys(patch);
        keys.forEach(key => currentProduct[key] = patch[key])
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