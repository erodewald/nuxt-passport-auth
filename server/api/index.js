import express from 'express'

import auth from './auth'

const router = express.Router()

// Set up routes
router.use('/auth', auth)

export default router
