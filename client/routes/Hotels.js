const Hotel = require("../model/Hotel");

const router = require("express").Router();

router.post("/add", async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const result = await newHotel.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const result = await Hotel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json(result)
    } catch (error) {
        console.log(error, "df");
        res.status(500).json(error)
    }
})

router.get("/all", async (req, res, next) => {
    try {
        const hotel = await Hotel.find();
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        hotel.delete();
        res.status(200).json({ msg: "successfull delete" })
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router