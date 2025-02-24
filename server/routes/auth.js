// Auth Routes - Yet to implement
const express = require('express')
const router = express.Router()

// ELLO
router.post("/signup", (req, res) => {
    const {username, password} = req.body
    if (!username|| !password) return res.status(400).send('Could not signup')

        

})