import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import { Nuxt, Builder } from 'nuxt'

import api from './api'
import { db } from './config'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: '9dj48bhkldhr48fj3890drkgb6739&#HF(&5j5&*^%',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))
app.use(passport.initialize())
app.use(passport.session())

// Set up DB
mongoose.connect(db)
mongoose.Promise = global.Promise

// Set up passport auth
require('./auth_config')(passport)

app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
