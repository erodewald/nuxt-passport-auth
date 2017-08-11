import auth from './auth'

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const config = require('../config')

// Set up DB
mongoose.connect(config.db)
mongoose.Promise = global.Promise

// Set up passport auth
require('../auth_config')(passport)

// Set up routes
router.use('/auth', auth)

export default router
