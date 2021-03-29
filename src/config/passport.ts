import passport from 'passport'
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'

// types
import { Request } from 'express'
import { VerifyCallback } from 'passport-jwt'

import User from '../models/User.model'

const secret = process.env.TOKEN_SECRET as string

const jwtFromCookie = (req: Request) => {
    let token = null;

    if (req && req.signedCookies && req.signedCookies.jwt) {
        token = req.signedCookies.jwt;
    }

    return token;
};

const verifyCallback: VerifyCallback = (payload, done) => {

    if(!payload || !payload.id) return done(null)

    return User.findOne({_id: payload.id})
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err)
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