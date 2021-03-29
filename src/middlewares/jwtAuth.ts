import passport from 'passport'
import { Middleware } from 'types/custom'

const jwtAuth: Middleware = (req, res, next) =>
    passport.authenticate('jwt', { session: false })(req, res, next)

export default jwtAuth