const express = require('express')
const livereload = require('livereload')
const connectLivereload = require('connect-livereload')
const path = require('path')

const app = express()
const port = 80

// 1) สร้าง livereload server
const lrserver = livereload.createServer()
lrserver.watch(path.join(__dirname, 'public')) // watch โฟลเดอร์ public

// 2) ใส่ middleware (ต้องอยู่ก่อน static)
app.use(connectLivereload())

// 3) serve static files
app.use(express.static(path.join(__dirname, 'public')))

// 4) server json
app.use(express.json())
app.post('/api/checkEmail', (req, res) => {
    res.status(200).json({ massage: "success" })
})
app.post('/api/register', (req, res) => {
    res.status(200).json({ message: "succuss" })
})
const users = [
    { username: 'username', password: 'password', role: 'admin' },
    { username: 'user', password: 'abcd', role: 'user' }
];
app.post('/api/login', (req, res) => {
    // {
    // "username","password"
    // }
    if (!req.body) {
        res.status(500).json({ message: 'ไม่พบ data' })
    }
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ massenger: 'กรุณากรอก uesnam และ password' })
    }
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        res.status(401).json({ massenger: 'usename หรือ passeword ไม่ถูกต้อง' });
    }
    res.status(200).json({ massenger: 'สำเร็จ' })

})
app.listen(port, () => {
    console.log(`🚀 App running at http://localhost:${port}`)
})