const Category = require('../models/categoryModel')
const express = require('express');
const router = express.Router();
const authenticateToken = require('../auth/authenticationToken'); // Đường dẫn đến file middleware xác thực

router.post('/category', authenticateToken ,async(req, res) => {
    try {
        const {title, slug} = req.body;

        //Kiểm tra xem có danh dục nào có title giống với title vừa được tạo không
        const existingCategory = await Category.findOne({title})
        const existingSlug = await Category.findOne({slug})

        if(existingCategory) {
            return res.status(400).json({message: `Danh mục đã tồn tại`})
        }
        else if(existingSlug) {
            return res.status(400).json({message: `slug đã tồn tại`})
        }
        const category = await Category.create(req.body)
        res.status(200).json(category)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router 