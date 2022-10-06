const express = require('express')
const router = express.Router()
const StaffsControllers = require('../controllers/StaffsControllers')


router.post('/add',StaffsControllers.add)
router.get('/staff',StaffsControllers.getAll)
router.put('/update/:id',StaffsControllers.update)
router.delete('/staff/:id',StaffsControllers.delete)


module.exports = router