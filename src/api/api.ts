import { Application } from 'express'

import authenticate from '../middlewares/authenticate'

import root from './root'
import auth from './auth'

export default function(app: Application) {

    app.get('/api/users', authenticate, (req, res) => {
        const users = [{id: 1, name: 'Adam'}]

        res.send(users)
    })

    app.use('/', root)

    app.use('/api/auth', auth)

}