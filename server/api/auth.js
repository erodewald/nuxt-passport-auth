import { Router } from 'express'
import passport from 'passport'

import User from '../models/user'

const router = Router()

router.post('/register', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  const user = new User({ email, password })
  user.save(err => {
    if (err) {
      return res.status(409).json({ message: 'Already exists' })
    }
    req.logIn(user, (err) => {
      if (err) return res.sendStatus(500)
      user.password = undefined
      res.json(user)
    })
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  req.user.password = undefined
  res.json(req.user)
})

router.post('/logout', (req, res) => {
  req.logout()
  res.json({ ok: true })
})

/* router.patch('/', (req, res) => {
  if (!req.user || !req.user.id) return res.sendStatus(401)
  User.findById(req.user.id, (err, user) => {
    if (err) return res.sendStatus(404)
    user.password = req.body.password
    user.save(err => res.json({ ok: !err }))
  })
})
 */
export default router
