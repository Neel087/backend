let express = require('express');
let router = express.Router();

let product = require('../model/product');

// get products
router.get('/', async (req, res) => {
    const filter = {}
    if (req.query.name) {
        filter['name'] = { $regex: req.query.name, $options: 'i' }
    };
    const products = await product.find(filter);
    res.send(products)
});

// post - create new product
router.post('/', async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    }
    try {
        const response = await product.create(newProduct);
        res.send({
            message: 'created new product',
            product: response
        })
    } catch (error) {
        res.send(error)
    }
});

// get product by id
router.get('/:id', async (req, res, next) => {
    const productId = req.params.id;
    console.log('here', productId)
    const foundProduct = await product.findById(productId)
    if (foundProduct) {
        res.send(foundProduct)
    } else {
        res.send({ message: 'no product found with provided id' })
    }
});



// update product by id
router.put('/:id', async (req, res, next) => {
    const productId = req.params.id;
    const foundProduct = await product.findById(productId);

    if (foundProduct) {
        foundProduct.name = req.body.name;
        foundProduct.description = req.body.description;
        foundProduct.price = req.body.price;
        foundProduct.quantity = req.body.quantity;
        foundProduct.category = req.body.category;
        try {
            await product.updateOne({ _id: productId }, foundProduct);
            res.send({
                message: `update product successfully`,
                product: foundProduct
            })
        } catch (error) {
            res.send({
                message: `something went wrong while updating product`
            })
        }

    } else {
        res.send({
            message: `no product found with provided id and can't be updated`
        })
    }

});

// delete one product by id
router.delete('/:id', async (req, res, next) => {
    const productId = req.params.id;
    try {
        await product.findByIdAndDelete(productId)
        res.send({ message: 'successully deleted product' })

    } catch (error) {
        res.send({ message: 'something went wrong while deleting product' })
    }
});


// delete all products
router.delete('/', async (req, res, next) => {
    try {
        await product.deleteMany({})
        res.send({ message: 'successully deleted all products' })
    } catch (error) {
        res.send({ message: 'something went wrong while deleting all products' })
    }
});

module.exports = router;