const express = require('express')
const app = express()
const port = 80
app.use(express.static('public'))
app.use(express.json())
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
    console.log(`app listen http://localhost:${(port)}`)
})