// Import dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Setup middleware for the express routing and allow for authentication token to be passed as header
app.use(express.json())
app.use(cors({origin: "*", allowedHeaders: ["x-auth-token"], exposedHeaders: ["x-auth-token"]}))

// connected to the DB
mongoose.connect('mongodb+srv://admin:admin123@caloriecounter.78kht.mongodb.net/?retryWrites=true&w=majority&appName=CalorieCounter')
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err))


app.get("/", (req, res) => {
    res.send("Hello, It's Eesa.")
})

// Configured server to listen on port 6000
const PORT = 6000
app.listen(6000, () => console.log(`Listening on port: ${PORT}`))