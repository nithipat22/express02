const express = require('express')
const app = express()
const port = 80
app.use(express.static('public'))
app.post('/api/login', (req, res) => {
    res.status(200).json({ massenger: 'success' })
})
app.listen(port, () => {
    console.log(`app listen http://localhost:${(port)}`)
})