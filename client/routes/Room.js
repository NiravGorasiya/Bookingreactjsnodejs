const Hotel = require("../model/Hotel");
const Room = require("../model/Room");

const router = require("express").Router();

router.post("/add/:id", async (req, res) => {
    const newRoom = new Room(req.body);
    try {
        const result = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate({ _id: req.params.id }, { $push: { room: result._id } })
        } catch (error) {
            console.log(error, "dsf");
            res.status(500).json(error)
        }
        return res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const result = await Room.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json(result)
    } catch (error) {
        console.log(error, "df");
        res.status(500).json(error)
    }
})

router.get("/all", async (req, res, next) => {
    try {
        const room = await Room.find();
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id/:hotelId", async (req, res, next) => {
    try {
        const hotel = await Room.findById(req.params.id);
        try {
            await Hotel.findByIdAndUpdate({ _id: req.params.hotelId }, { $pull: { room: req.params.id } })
        } catch (error) {

        }
        hotel.delete();
        res.status(200).json({ msg: "successfull delete" })
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router