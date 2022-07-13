const User = require('../model/User')

const router = require('express').Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res, next) => {
    try {
        const { email, name, password, confirmpassword } = req.body
        if (!email || !password || !confirmpassword) {
            res.status(422).json({ success: false, result: null, msg: "please enter all field" })
        }
        const isExitUser = await User.findOne({ email });
        if (isExitUser) {
            res.status(422).json({ success: false, result: null, msg: "email already exist" })
        } else {
            if (password !== confirmpassword) {
                res.status(422).json({ success: false, result: null, msg: "Password and confirmpassword Field not match" })
            } else if (password < 5) {
                res.status(422).json({ success: false, result: null, msg: "Password must contain at five characters" })
            } else {
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                const newUser = await User.create({
                    name: name,
                    email: email,
                    password: passwordHash
                })
                res.status(201).json({ success: true, result: newUser, msg: "register successfull" })
            }
        }
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ success: false, result: null, msg: error })
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ msg: "please enter all field" })
        }
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(422).json({ success: false, msg: "Invalid credentials" })
        }
        let isMatch = await bcrypt.compare(password, checkUser.password)
        if (!isMatch) {
            return res.status(422).json({ success: false, msg: "Invalid credentials" })
        }
        let token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET);
        res.status(200).json({ success: false, result: token, msg: "login successfull" })
    } catch (error) {
        res.status(500).json({ success: false, result: null, msg: error })
    }
})

module.exports = router