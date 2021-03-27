import { Router } from 'express'

import jwt from 'jsonwebtoken'
import passport from 'passport'

import AuthService from '../services/AuthService'

const api = Router()

// tokens
const REFRESH_TOKEN_SECRET  = process.env.REFRESH_TOKEN_SECRET as jwt.Secret
const TOKEN_SECRET          = process.env.TOKEN_SECRET as jwt.Secret

// api.post('/login', (req, res) => {
// 	const email: string = req.body.email
// 	const password: string = req.body.password

// 	// const validPassword = await bcrypt.compare(password, user[0].password)
// 	// TODO CSRF security
// 	const accessToken = generateAccessToken({ id: 1 })
// 	const refreshToken = jwt.sign({ id: 1 }, REFRESH_TOKEN_SECRET, { expiresIn: 525600 })
// 	// Save refresh Token in DB

// 	res.cookie('JWT', accessToken, {
// 		maxAge: 86400000,
// 		httpOnly: true,
// 	})

// 	res.send({ accessToken, refreshToken })
// })

api.post('/login', passport.authenticate('local', {session: false}), AuthService.login)

api.post('/api/auth/refresh', (req, res) => {
	const refreshToken = req.body.token

	if (!refreshToken) {
		return res.status(401)
	}

	// TODO: Check if refreshToken exists in DB

	const validToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

	if (!validToken) {
		return res.status(403)
	}

	const accessToken = generateAccessToken({ id: 1 })

	res.send({ accessToken })
})

function generateAccessToken(payload: object) {
	return jwt.sign(payload, TOKEN_SECRET, { expiresIn: 86400 }) // 86400
}

export default api