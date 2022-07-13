const User = require("../model/User");

const router = require("express").Router();

router.post("/add", async (req, res) => {
    const newUser = new User(req.body);
    try {
        const result = await newUser.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(201).json(result)
    } catch (error) {
        console.log(error, "df");
        res.status(500).json(error)
    }
})

router.get("/all", async (req, res, next) => {
    try {
        const user = await User.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        user.delete();
        res.status(200).json({ msg: "successfull delete" })
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router