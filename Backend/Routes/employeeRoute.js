const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const employeeController = require('../Controllers/employeeController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    },
});
const upload = multer({ storage });

router.post('/newEmp', upload.single('image'), employeeController.createEmployee)

router.get('/fetchEmp', employeeController.fetchEmployee);
router.delete('/delEmployee/:id', employeeController.deleteEmployee)

module.exports = router