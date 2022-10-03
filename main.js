const express = require("express");
const app = express();

app.use(express.json());

const products = require("./products.js");

app.get("/products", (req, res) => {
  try {
    res.send(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
});

app.get("/products/:id", (req, res) => {
  const product = products.find((x) => x.id == req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product is not found!" });
    try{
      res.send(product);
    }catch(err){
      res.status(500).json({message: err})
    }
});

app.delete('/products/:id', (req, res)=> {
  const productToDelete = products.findIndex((x) => x.id == req.params.id);
  if(productToDelete === -1) return res.status(404).json({ message: "Product is not found!"})
  try{
    products.splice(productToDelete,1)
    res.status(200).json({message: 'Product deleted successfully!'})
  }catch(err){
    res.status(500).json({ message: "Server Error!" })
  }
});

app.post('/products', (req, res)=> {
  const newProduct = req.body
  newProduct.id = products[products.length-1].id+1
  try{
    products.push(newProduct)
    res.status(200).send(newProduct).json({message: 'Product added successfully!'})
  }catch(err){
    res.status(500).json({message: err})
  }
})

app.listen(3000);
