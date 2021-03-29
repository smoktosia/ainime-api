import { Application } from 'express'

import authenticate from '../middlewares/authenticate'

import auth from './auth'

const prefix = '/api/v1'

export default function(app: Application) {

    app.get(prefix + '/users', authenticate, (req, res) => {
        const users = [{id: 1, name: 'Adam'}]

        res.send(users)
    })

    app.use(prefix + '/auth', auth)

}