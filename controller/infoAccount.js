const InfoAccount = require('../models/infoAccount')
const express = require('express');
const router = express.Router();

router.get('/infoAccounts', async(req, res) => {
    try {
        const infoAccount = await InfoAccount.find({})
        res.status(200).json(infoAccount)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/infoAccount', async(req, res) => {
    try {
        const infoAccount = await InfoAccount.create(req.body)
        res.status(200).json(infoAccount)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/infoAccount/:id', async(req, res) => {
    try {
        const {id} = req.params
        const infoAccount = await InfoAccount.findByIdAndDelete(id)
        if(!infoAccount) {
            return res.status(400).json({message: `Khong tim thay account co id: ${id}`})
        }
        res.status(200).json({message: `delete success`})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router 