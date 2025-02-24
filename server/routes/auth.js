// Auth Routes - Yet to implement
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// ELLO
router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body
    if (!username|| !password) return res.status(400).send('Could not signup')

    // Username already exists
    let user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send("Username is already taken")

    // Email already exists
    user = await User.findOne({ email })
    if (user) return res.status(400).send("Email address is not available")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user in the database
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
    await user.save()

    res.send(user)

})

module.exports = router