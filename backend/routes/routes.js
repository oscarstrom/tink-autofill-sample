const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const accountsController = require('../controllers/accountsController')
const urlController = require('../controllers/urlController')

router.post('/authorize', authController.authorize)
router.get('/url', urlController.getURL)
router.get('/accounts', accountsController.getAccounts)

module.exports = router
