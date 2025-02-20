// Import dependencies
const express = require('express')
const app = express()
const cors = require('cors')

// Setup middleware for the express routing and allow for authentication token to be passed as header
app.use(express.json())
app.use(cors({origin: "*", allowedHeaders: ["x-auth-token"], exposedHeaders: ["x-auth-token"]}))

app.get("/",  (req, res) => {
    res.send("Hello, It's Eesa.")
})

// Configured server to listen on port 6000
const PORT = 6000
app.listen(6000, () => console.log(`Listening on port: ${PORT}`))