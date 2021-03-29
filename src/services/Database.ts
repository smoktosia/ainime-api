import { connect, connection } from 'mongoose'
import chalk from 'chalk'

const connectionString = process.env.DB_CONNECTION_STRING

// colors
const c = {
    connected:      chalk.bold.cyan,
    error:          chalk.bold.yellow,
    disconnected:   chalk.bold.red,
    termination:    chalk.bold.magenta
}

export default () => {

    connect(connectionString || '', {
        useFindAndModify: false,
        poolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .catch(err => {
            // throw err to file or smth
        })

    connection.on('connected', () => {
        console.log(c.connected('Mongoose is connected'))
    })

    connection.on('error', err => {
        console.log(c.error(`Mongoose connection has occured "${err}" error`))
    })

    connection.on('disconnected', () => {
        console.log(c.disconnected('Mongoose connection is disconnected'))
    })

    process.on('SIGINT', () => {
        connection.close(() => {
            console.log(c.termination('Mongoose connection is disconnected due to application termination'))
            process.exit(0)
        })
    })

}