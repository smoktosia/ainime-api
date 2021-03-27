import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const secret = process.env.TOKEN_SECRET as jwt.Secret

function authenticate(req: Request, res: Response, next: NextFunction) {

	// const authHeader = req.headers.authorization
	// const token = authHeader && authHeader.split(' ')[1]
	const token = req.cookies.JWT as string | undefined

	if (!token) return res.sendStatus(401)

	jwt.verify(token, secret, (err, user) => {
		if (err) return res.sendStatus(403)

		req.user = user
		next()
	})
}

export default authenticate