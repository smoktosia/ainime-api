import { Router } from 'express'

const root = Router()

root.get('/', (req, res) => {
    res.status(200).send()
})

export default root