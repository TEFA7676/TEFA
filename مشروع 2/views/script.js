// script.js

document.addEventListener("DOMContentLoaded", function () {
    // تأثير الكتابة المتحركة
    var typed = new Typed(".typing", {
        strings: ["مرحبا بك في خدماتنا الإلكترونية", "أفضل حلول التقنية هنا", "أمان واحترافية بأعلى جودة"],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true
    });

    // تفعيل الوضع الداكن والفاتح
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // زر العودة إلى الأعلى
    const scrollToTop = document.getElementById("scrollToTop");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTop.style.display = "block";
        } else {
            scrollToTop.style.display = "none";
        }
    });
    scrollToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // تفعيل الأنيميشن عند التفاعل
    AOS.init();
    gsap.from(".service", { duration: 1, opacity: 0, y: 50, stagger: 0.3 });

    // إعداد الدردشة المباشرة باستخدام WebSockets
    const socket = io();
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");

    window.sendMessage = function () {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit("chat message", message);
            messageInput.value = "";
        }
    };

    socket.on("chat message", function (msg) {
        const messageElement = document.createElement("p");
        messageElement.textContent = msg;
        chatBox.appendChild(messageElement);
    });

    // تسجيل الدخول عبر Google
    window.signInWithGoogle = function () {
        alert("تسجيل الدخول عبر Google قيد التطوير.");
    };

    // تسجيل الدخول عبر Facebook
    window.signInWithFacebook = function () {
        alert("تسجيل الدخول عبر Facebook قيد التطوير.");
    };

    // تأثير الخلفية المتحركة باستخدام Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(geometry, material);
    scene.add(blackHole);

    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        blackHole.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
});
