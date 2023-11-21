const express = require("express");

const products = require("./routes/products")

const app = express();
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", products)

app.listen(port, ()=>{
    console.log(`Express Home-work running on port: ${port}`);
})
