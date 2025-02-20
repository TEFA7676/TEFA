const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost', // أو عنوان السيرفر الخاص بك
    user: 'root', // اسم المستخدم لقاعدة البيانات
    password: '', // كلمة المرور لقاعدة البيانات
    database: 'my_database' // اسم قاعدة البيانات
});

// الاتصال بقاعدة البيانات
 db.connect((err) => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح!');
});

module.exports = db;

// ربط قاعدة البيانات بالسيرفر
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const db = require('./db_config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// إعدادات السيرفر
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// استقبال البيانات من نموذج الاتصال وتخزينها في قاعدة البيانات
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('❌ خطأ في إدخال البيانات:', err);
            res.status(500).json({ error: 'حدث خطأ أثناء إرسال الرسالة' });
            return;
        }
        console.log('✅ تم تخزين الرسالة بنجاح!', result);
        res.json({ message: 'تم إرسال الرسالة بنجاح!' });
    });
});

// إعداد WebSockets للدردشة الحية
io.on('connection', (socket) => {
    console.log('مستخدم متصل');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('مستخدم غادر الدردشة');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});
