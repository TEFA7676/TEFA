const API_URL = "http://localhost:3000";

// التبديل بين النماذج
function toggleForm() {
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// تسجيل مستخدم جديد
function register() {
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("❌ خطأ:", error));
}

// تسجيل الدخول
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("❌ خطأ:", error));
}
