const Hotel = require("../model/Hotel");

const router = require("express").Router();

router.post("/add", async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const result = await newHotel.save();
        res.send(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router