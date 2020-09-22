const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')

const routes = require('./router')
const data = require('./data')

const erouter = express.Router()
const app = express()
const parser = {
    json: express.json(),
    file: fileUpload()
}

module.exports = { start }

function start () {
    for (let route of routes)
        route.install(erouter)

    app.use(parser.json)
    app.use(parser.file)
    app.use((req, _, next) => {
        req.db = data
        next()
    })

    return new Promise(resolve => {
        var statics = path.join(global.dir, 'interface')
        var dataDir = path.join(global.dir, 'data')

        app.use(erouter)
        app.use(express.static(statics))
        app.use('/data', express.static(dataDir))

        app.listen('80', '127.0.0.1', resolve)
    })
}