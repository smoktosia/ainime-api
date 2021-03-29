import { Router } from 'express'
import passport from 'passport'

import AuthService from '../services/AuthService'
import jwtAuth from '../middlewares/jwtAuth'

const api = Router()

api.post('/', jwtAuth, (req, res) => {
	res.json({auth: true})
})

api.post('/login', passport.authenticate('local', {session: false}), AuthService.login)

api.post('/register', AuthService.register)



export default api