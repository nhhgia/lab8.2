
function loadUsers() {
 let stored = localStorage.getItem('users');
    if (stored) {
        return JSON.parse(stored);
    } else {
        const initialUsers = [
            {
                "id": 1,
                "username": "nghia",
                "password": "123456",
                "fullname": "Nghĩa",
                "email": "nghia@example.com",
                "phone": "0912345678",
                "address": "123 Đường ABC, Quận 1, TP.HCM",
                "orders": [1, 2,4,5,6]
            },
            {
                "id": 2,
                "username": "admin",
                "password": "admin123",
                "fullname": "Quản trị viên",
                "email": "admin@example.com",
                "phone": "0988112233",
                "address": "456 Đường XYZ, Hà Nội",
                "orders": [2,4,5,6]
            }
        ];
        saveUsers(initialUsers);
        return initialUsers;
    }
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

async function register() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let repassword = document.getElementById("repassword").value.trim();

    let users = await loadUsers();

    // Check tồn tại
    if (users.some(u => u.username === username)) {
        document.getElementById("mes").innerHTML = "User đã tồn tại";
        return;
    }

    // Check xác nhận mật khẩu
    if (password !== repassword) {
        document.getElementById("mes").innerHTML = "Mật khẩu xác nhận không đúng";
        return;
    }

    // Lưu user mới
    users.push({
        username: username,
        password: password
    });

    saveUsers(users);
    document.getElementById("mes").innerHTML = "Đăng ký thành công!";
}

function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    const users = loadUsers();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem("userId", user.id); 
        document.getElementById("mes").innerHTML = "Đăng nhập thành công";

        setTimeout(() => {
            window.location.href = "main.html";
        }, 1500);
    } else {
        document.getElementById("mes").innerHTML =
            "Sai tên đăng nhập hoặc mật khẩu!";
    }
}
