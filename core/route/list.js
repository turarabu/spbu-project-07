const path = require('path')

module.exports = { install }

function install(router) {
    router.post('/list', list)
    router.post('/get', get)
}

function list (req, res) {
    var parent = req.query.parent
    var list = req.db.findList('works', { parent })

    res.end(JSON.stringify(list))
}

function get (req, res) {
    var id = req.query.id
    var work = req.db.find('works', { id })

    res.end(JSON.stringify(work))    
}