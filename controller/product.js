const Product = require('../models/productModel')
const express = require('express');
const router = express.Router();


router.get('/products', async(req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 4; // Số lượng sản phẩm trên mỗi trang, mặc định là 50
        const page = parseInt(req.query.pageIndex) || 1; // Trang hiện tại, mặc định là trang đầu tiên
        
        const sortBy = {};
        if (req.query.SortByPrice) {
            sortBy.price = req.query.SortByPrice === 'asc' ? 1 : -1;
        }
        if (req.query.SortByQuantity) {
            sortBy.quantity = req.query.SortByQuantity === 'asc' ? 1 : -1;
        }

        const startIndex = (page - 1) * limit;

        let products = await Product.find({})
            .sort(sortBy)
            .skip(startIndex)
            .limit(limit);
        const totalProducts = await Product.countDocuments({}); //Tổng item hiện tại

        const totalPage = Math.ceil(totalProducts / limit); 

        res.status(200).json({
            products,
            totalPage,
            pageIndex: page,
            limit
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(err) {
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
})

router.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) {
            return res.status(404).json({message: `Khong tim thay product co id: ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }catch(err) {
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
})

router.delete('/product/:id', async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message: `Khong tim thay product co id: ${id}`})
        }
        res.status(200).json({message: `delete success`})
    }catch(err) {
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
})

module.exports = router