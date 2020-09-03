const express = require("express"),
    multer = require("multer"),
    {handleErrors, requireAuth} = require("./middlewares"),
    productsRepo = require("../../repositories/products"),
    productsNewTemplate = require("../../views/admin/products/new"),
    productsIndexTemplate = require("../../views/admin/products/index"),
    productsEditTemplate = require("../../views/admin/products/edit"),
    {requireTitle, requirePrice} = require("./validators"),
    router = express.Router(),
    upload = multer({storage: multer.memoryStorage()});

router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({})); 
})

router.post('/admin/products/new', requireAuth, upload.single('image'), [requireTitle, requirePrice],
    handleErrors(productsNewTemplate),
     async (req, res) => {
        const image = req.file.buffer.toString('base64');
        const {title, price} = req.body;

        await productsRepo.create({title, price, image});

        res.redirect('/admin/products');
})

router.get('/admin/products/:id/edit', async (req, res) => {
    const product = await productsRepo.getOne(req.params.id);

    if(!product) {
        return res.send("product not found");
    }

    res.send(productsEditTemplate({product}));
})

router.post('/admin/products/:id/edit', requireAuth, upload.single('image'),
    [requireTitle, requirePrice],
    async (req, res) => {
    
})

module.exports = router;