const express = require('express')
const app = express()
const port = 80
app.use(express.static('public'))
app.use(express.json())
app.post('/api/login', (req, res) => {
    if (!req.body) {
        res.status(500).json({ massenger: 'error' })
    } else {
        res.status(200).json({ massenger: 'success' })
    }
})
app.listen(port, () => {
    console.log(`app listen http://localhost:${(port)}`)
})