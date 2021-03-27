import passport from 'passport'
import passportJWT, { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'

// types
import { Request } from 'express'
import { VerifyCallback } from 'passport-jwt'

import User from '../models/User.model'

const secret = process.env.TOKEN_SECRET as string

const jwtFromCookie = (req: Request) => {
    const token = req.cookies.JWT as string | undefined
    return token || ''
}

const verifyCallback: VerifyCallback = (payload, done) => {
    if(!payload || !payload.id) return done(null)

    return User.findOne({_id: payload.id})
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err, undefined)
        })
}

export default () => {
    const config: StrategyOptions = {
        jwtFromRequest: jwtFromCookie,
        secretOrKey: secret
    }

    passport.use(User.createStrategy())
    passport.use(new JwtStrategy(config, verifyCallback))
}