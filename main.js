const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const cors = require('cors')

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

//Get All

app.get('/shops', (req, res) => {
    fs.readFile(path.resolve(__dirname, "./data/shops.json"), (err, data) => {
        if (err) throw err
        res.end(data)
    })
})

app.get('/categories', (req, res) => {
    fs.readFile(path.resolve(__dirname, "./data/categories.json"), (err, data) => {
        if (err) throw err
        res.end(data)
    })
})

app.get('/products', (req, res) => {
    fs.readFile(path.resolve(__dirname, "./data/products.json"), (err, data) => {
        if (err) throw err
        res.end(data)
    })
})

//Get All with ID

app.get('/shops/:id', (req, res) => {
    const shopsID = req.params.id
    fs.readFile(path.resolve(__dirname, "./data/shops.json"), (err, data) => {
        if (err) throw err
        const foundShop = JSON.parse(data).filter(e => e.id == shopsID)
        res.send(foundShop)
    })
})

app.get('/categories/:id', (req, res) => {
    const categoriesID = req.params.id
    fs.readFile(path.resolve(__dirname, "./data/categories.json"), (err, data) => {
        if (err) throw err
        const foundCategory = JSON.parse(data).filter(e => e.shopID == categoriesID)
        res.send(foundCategory)
    })
})

app.get('/products/:id', (req, res) => {
    const productsID = req.params.id
    fs.readFile(path.resolve(__dirname, "./data/products.json"), (err, data) => {
        if (err) throw err
        const foundproducts = JSON.parse(data).filter(e => e.categoryID == productsID)
        res.send(foundproducts)
    })
})

//Get All Info

app.get('/shop/:id/info', (req, res) => {
    const libraryID = req.params.id
    fs.readFile(path.resolve(__dirname, "./data/shops.json"), (err, data) => {
        if (err) throw err
        const arr = []
        const foundShop = JSON.parse(data).filter(e => e.id == libraryID)
        arr.push("Shop:")
        arr.push(foundShop)
        fs.readFile(path.resolve(__dirname, "./data/categories.json"), (err, data) => {
            if (err) throw err
            const foundCategories = JSON.parse(data).filter(e => e.shopID == libraryID)
            arr.push("Categories:")
            arr.push(foundCategories)
            fs.readFile(path.resolve(__dirname, "./data/products.json"), (err, data) => {
                if (err) throw err
                const foundproducts = JSON.parse(data).filter(e => e.shopID == libraryID)
                arr.push("Products:")
                arr.push(foundproducts)
                res.send(arr)
            })
        })

    })
})

//Post

app.post("/newShop", (req, res) => {
    const name = req.body
    fs.readFile(path.resolve(__dirname, "./data/shops.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        type.id = parsedData.length + 1
        parsedData.push(type)
        fs.writeFile(path.resolve(__dirname, "./data/shops.json"), JSON.stringify(parsedData, null, 4), (err) => {
            if (err) throw err
            res.send("OK")
        })
    })
})

app.post("/newCategory", (req, res) => {
    const type = req.body
    fs.readFile(path.resolve(__dirname, "./data/categories.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        type.id = parsedData.length + 1
        parsedData.push(type)
        fs.writeFile(path.resolve(__dirname, "./data/categories.json"), JSON.stringify(parsedData, null, 4), (err) => {
            if (err) throw err
            res.send("OK")
        })
    })
})

app.post("/newProduct", (req, res) => {
    const name = req.body
    fs.readFile(path.resolve(__dirname, "./data/products.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        name.id = parsedData.length + 1
        parsedData.push(name)
        fs.writeFile(path.resolve(__dirname, "./data/products.json"), JSON.stringify(parsedData, null, 4), (err) => {
            if (err) throw err
            res.send("OK")
        })
    })
})

//Delete

app.delete("/deleteShop", (req, res) => {
    const shopsID = req.body
    fs.readFile(path.resolve(__dirname, "./data/shops.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        const foundShop = parsedData.filter(e => e.id != shopsID.id)
        fs.writeFile(path.resolve(__dirname, "./data/shops.json"), JSON.stringify(foundShop, null, 4), (err) => {
            if (err) throw err
            res.send("Deleted")
        })
    })
})

app.delete("/deleteCategory", (req, res) => {
    const categoryID = req.body
    fs.readFile(path.resolve(__dirname, "./data/categories.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        const foundCategory = parsedData.filter(e => e.id != categoryID.id)
        fs.writeFile(path.resolve(__dirname, "./data/categories.json"), JSON.stringify(foundCategory, null, 4), (err) => {
            if (err) throw err
            res.send("Deleted")
        })
    })
})

app.delete("/deleteProduct", (req, res) => {
    const productID = req.body
    fs.readFile(path.resolve(__dirname, "./data/products.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        const foundProduct = parsedData.filter(e => e.id != productID.id)
        fs.writeFile(path.resolve(__dirname, "./data/products.json"), JSON.stringify(foundProduct, null, 4), (err) => {
            if (err) throw err
            res.send("Deleted")
        })
    })
})

//Update

app.put("/updateShop", (req, res) => {
    const shopsID = req.body
    fs.readFile(path.resolve(__dirname, "./data/shops.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        const foundShop = parsedData.filter(e => e.id == shopsID.id ? e.name = shopsID.name : e)
        fs.writeFile(path.resolve(__dirname, "./data/shops.json"), JSON.stringify(foundShop, null, 4), (err) => {
            if (err) throw err
            res.send("Updated!")
        })
    })
})

app.put("/updateCategory", (req, res) => {
    const categoryID = req.body
    fs.readFile(path.resolve(__dirname, "./data/categories.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        const foundCategory = parsedData.filter(e => e.id != categoryID.id ? e.type = shopsID.type : e)
        fs.writeFile(path.resolve(__dirname, "./data/categories.json"), JSON.stringify(foundCategory, null, 4), (err) => {
            if (err) throw err
            res.send("Updated!")
        })
    })
})

app.put("/updateProduct", (req, res) => {
    const productID = req.body
    fs.readFile(path.resolve(__dirname, "./data/products.json"), (err, data) => {
        if (err) throw err
        const parsedData = JSON.parse(data)
        const foundProduct = parsedData.filter(e => e.id != productID.id ? e.name = shopsID.name : e)
        fs.writeFile(path.resolve(__dirname, "./data/products.json"), JSON.stringify(foundProduct, null, 4), (err) => {
            if (err) throw err
            res.send("Updated!")
        })
    })
})

app.listen(PORT, () => {
    console.log(PORT)
})
