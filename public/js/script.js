function getCookie(name) {
    let cookie = {}
    document.cookie.split('').forEach(function (el) {
        let split = el.split('=')
        cookie[split[0].trim()] = split.slice(1).join("=")
    })
    return cookie[name]
}
function setCookie(name, value, days) {
    let expires = ""
    if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
}
document.body.classList.add('bg-dark', 'text-warning')
async function loadComponent(id, filename) {
    const el = document.getElementById(id);
    if (!el) {
        console.log(`Element with id '${id}' not found`);
        return;
    }
    try {
        const res = await fetch(`/components/${filename}`);
        const html = await res.text();
        el.innerHTML = html;
        // ...existing code...
    } catch (err) {
        console.error(`Failed to load component '${filename}':`, err);
    }
}

loadComponent('navbar', 'navbar.html').then(() => {
    if (getCookie('token')) {
        document.getElementById('login').classList.add('d-none')
        document.getElementById('register').value.classList.add('d-none')
        document.getElementById('dashboard').classList.remove('d-none')
        document.getElementById('logout').classList.remove('d-none')
    } else {
        document.getElementById('login').classList.remove('d-none')
        document.getElementById('register').classList.remove('d-none')
        document.getElementById('dashboard').classList.add('d-none')
        document.getElementById('logout').classList.add('d-none')
    }
});
function login() {
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(response => {
        if (response.ok) {
            alert('Login successful!');
            setCookie('token', token, 30)
        } else {
            alert('Login failed!');
        }
    }).catch(error => {
        alert('An error occurred: ' + error);
    });
}

// เพิ่ม event listener ให้ Enter trigger login()
document.getElementById('loginForm').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // ป้องกัน reload หน้า
        login();           // เรียกฟังก์ชัน login() เหมือนกดปุ่ม
    }
});
function nextToStep2() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmpassword = document.getElementById('ConfirmPassword').value.trim();

    if (!username || !password || !confirmpassword) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน สมบูรณ์');
        return;
    }

    if (password !== confirmpassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }

    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step2').classList.remove('d-none');
}

function backToStep1() {
    document.getElementById('step1').classList.remove('d-none')
    document.getElementById('step2').classList.add('d-none')
}
function nextToStep3() {
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        alert('กรุณากรอก email');
        return;
    }

    fetch('/api/checkEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    }).then(response => {
        if (response.ok) {   // response.ok = status 200–299
            alert('เช็ค Email สำเร็จ! สามารถไช้งานได้ เข้าสู่การกรอก OTP');
            document.getElementById('step2').classList.add('d-none')
            document.getElementById('step3').classList.remove('d-none')
        } else {
            alert('Email ไม่ถูกต้อง');
        }
    }).catch(error => {
        alert('เกิดข้อผิดพลาด: ' + error);
    });
}
function backToStep2() {
    document.getElementById('step3').classList.add('d-none')
    document.getElementById('step2').classList.remove('d-none')
}
function register() {
    const data = {
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value.trim(),
        confirmpassword: document.getElementById('ConfirmPassword').value.trim(),
        email: document.getElementById('email').value.trim(),
        otp: document.getElementById('otp').value.trim()
    }
    if (data.otp === '') {
        alert('กรุณากรอก OTP ก่อนทำรายการถัดไป')
        return;
    }
    if (data.otp !== '123456') {
        alert('OTP ไม่ถุกต้อง')
        return
    }
    // console.log(data)
    fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) // ส่ง object data
    }).then(response => {
        if (response.ok) {
            alert('สมัครสมาชิกสำเร็จ!');
            window.location.href = '/login';
        } else {
            return response.json(); // แปลง JSON เพื่ออ่าน message จาก server
        }
    }).then(result => {
        if (result && result.message) {
            alert(result.message); // เช่น "username ถูกใช้แล้ว"
        }
    }).catch(error => {
        alert('เกิดข้อผิดพลาด: ' + error);
    });

}
