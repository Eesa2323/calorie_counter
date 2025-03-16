// Auth Routes - Yet to implement
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {User} = require('../models/User')

const JWT_SECRET = 'RANDOM_SECRET'

router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body
    if (!username|| !password || !email) return res.status(400).send('Could not signup')

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

    const token = generteJWT(user)
    res.header('x-auth-token', token).send(user)
})


router.post("/login", async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) return res.status(400).send('Could not login')

    const user = await User.findOne({ email })
    if (!user) return res.status(400).send("User Doesn't exist with provided email")

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Could not match passwords')

    const token = generteJWT(user)
    res.header('x-auth-token', token).send('Logged in')
})



function generteJWT(user) {
    const token = jwt.sign({_id: user._id, username: user.username}, JWT_SECRET)
    return token
}

module.exports = router