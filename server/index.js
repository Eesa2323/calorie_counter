// Import dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter =require('./routes/auth')
const auth = require('../middleware/auth')

// Setup middleware for the express routing and allow for authentication token to be passed as header
app.use(express.json())
app.use(cors({origin: "*", allowedHeadjers: ["x-auth-token"], exposedHeaders: ["x-auth-token"]}))

// connected to the DB
// CONN URL
mongoose.connect('mongodb+srv://admin:admin123@caloriecounter.78kht.mongodb.net/?retryWrites=true&w=majority&appName=CalorieCounter')
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err))

app.use(express.json())    
app.use(express.urlencoded({extended: true}))
app.use("/api/auth", authRouter)   

app.get("/", [auth], (req, res) => {
    res.send("Hello, It's Eesa.")
})

// Configured server to listen on port 6000
const PORT = 6000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))