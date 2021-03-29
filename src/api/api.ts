import { Application } from 'express'

import auth from './auth'

const prefix = '/api/v1'

export default function(app: Application) {

    app.use(prefix + '/auth', auth)

}