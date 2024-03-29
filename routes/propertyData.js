const express = require('express')
const router = express.Router()
const PropertyData = require('../models/propertyData')

router.get('/', async (req, res) => {
    try {
        const propertyData = await PropertyData.find()
        res.json(propertyData)
    } catch (error) {
        console.log('Failed to get propertyData!', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getPropertyData, async (req, res) => {
    res.json(res.propertyData)
})

router.post('/', (req, res) => {
    try {
        const propertyData = new PropertyData({
            propertyImg: req.body.propertyImg,
            price: req.body.price,
            sold: req.body.sold,
            description: req.body.description
        })
        propertyData.save()
        res.status(200).json('propertyData Saved!')
    } catch (error) {
        console.log('Failed to create propertyData', error);
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', getPropertyData, async (req, res) => {
    try {
        await res.propertyData.deleteOne()
        res.json({ message: 'Deleted propertyData!'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getPropertyData(req, res, next) {
    let propertyData
    try {
        propertyData = await PropertyData.findById(req.params.id)
        if (propertyData == null) {
            return res.status(404).json('Cannot find propertyData')
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.propertyData = propertyData
    next()
}

module.exports = router