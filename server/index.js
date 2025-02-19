// Server code
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors({origin: "*", allowedHeaders: ["x-auth-token"], exposedHeaders: ["x-auth-token"]}))

app.get("/", async (req, res) => {
    res.send("hey")
})

const PORT = 6000
app.listen(6000, () => console.log(`Listening on port: ${PORT}`))