const Hotel = require("../model/Hotel");
const Room = require("../model/Room")
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
    const { min, max, ...other } = req.query
    try {
        const hotel = await Hotel.find({ ...other, cheapestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(req.query.limit);
        res.status(200).json(hotel)
    } catch (error) {
        console.log(error, "error");
        res.status(500).json(error)
    }
})

router.get("/find/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        console.log(error, "error");
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

router.get("/countByCity", async (req, res, next) => {
    try {
        const city = req.query.cities.split(",")
        const list = await Promise.all(city.map((city) => {
            return Hotel.countDocuments({ city })
        }))
        res.send(list)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/contByType", async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ])

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/room/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.room.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (error) {
        console.log(error, "error");
    }
})

module.exports = router