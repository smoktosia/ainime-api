import jwt from 'jsonwebtoken'

import User, { IUser } from 'models/User.model'

import { isEmail, isAlphanumeric } from 'utils/dataValidation'

// only types
import { Middleware } from 'types/custom'

const secret = process.env.TOKEN_SECRET as jwt.Secret

const login: Middleware = async (req, res, next) => {

    const user: any = req.user

    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: 86400 })

    res.cookie('JWT', secret, {
        maxAge: 86400000,
		httpOnly: true
    })

    res.send({token})
}

const register: Middleware = async (req, res) => {

    interface UserInputData {
        username: string
        email: string
        password: string
        password2: string
    }

    const {
        username, email, password, password2
    }: UserInputData = req.body

    const err: object[] = []

    if(username.length < 3 || username.length > 16)
        err.push({username: 'length'})
    else if(!isAlphanumeric(username))
        err.push({username: 'alpha'})

    if(!isEmail(email))
        err.push({email: 'format'})

    if(password.length < 6)
        err.push({password: 'length'})

    if(password !== password2)
        err.push({password2: 'invalid'})

    if(err.length === 0) {

        try {
            const response = await User.findOne({$or: [
                { email },
                { username }
            ]}) as IUser | null

            if(response) {

                if(response.email === email)
                    err.push({email: 'taken'})
                if(response.username === username)
                    err.push({username: 'taken'})

                res.status(400).json({success: false, err})

            } else {
                const newUser = new User({username, email, password})

                try {
                    await User.register(newUser, password)
                    res.json({success: true})
                } catch(e) {
                    err.push({api: 'err2'})
                    res.status(500).json({success: false, err})
                }
            }

        } catch(e) {
            err.push({api: 'err'})
        }
    }

}

export default {
    login
}