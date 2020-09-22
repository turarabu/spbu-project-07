const fs = require('fs')
const path = require('path')

module.exports = { install }

function install(router) {
    router.post('/create', create)
    router.post('/remove', remove)

    router.post('/edit', edit)
    router.post('/video', video)
    router.post('/poster', poster)
    router.post('/push-gallery', pushGallery)
    router.post('/remove-gallery', removeGallery)
}

function create (req, res) {
    console.log(req.query.parent, req.query)
    var work = req.db.create('works', req.body)

    work.parent = req.query.parent
    work.gallery = []
    work.poster = ''
    work.video = ''

    return res.end(JSON.stringify(work))
}

function remove (req, res) {
    var id = req.query.id

    req.db.remove('works', id)
    res.end(JSON.stringify({
        success: true
    }))
}

function edit (req, res) {
    var id = req.query.id
    var work = req.db.find('works', { id })

    for ( let key of Object.keys(req.body) ) {
        if ( key === 'id' )
            continue

        work[key] = req.body[key]
    }

    req.db.edit('works', id, work)
    return res.end(JSON.stringify(work)) 
}

function video (req, res) {
    var id = req.query.id
    var file = req.files.file
    var work = req.db.find('works', { id })
    var src = createPath('video', file.name)

    file.mv(src.full)
    work.video = src.url

    req.db.edit('works', id, work)
    return res.end(JSON.stringify(work))
}

function poster (req, res) {
    var id = req.query.id
    var file = req.files.file
    var work = req.db.find('works', { id })
    var src = createPath('poster', file.name)

    file.mv(src.full)
    work.poster = src.url

    req.db.edit('works', id, work)
    return res.end(JSON.stringify(work))
}

function pushGallery (req, res) {
    var id = req.query.id
    var file = req.files.file
    var work = req.db.find('works', { id })
    var src = createPath('image', file.name)

    file.mv(src.full)
    work.gallery.push({
        id: src.id,
        src: src.url
    })

    req.db.edit('works', id, work)
    return res.end(JSON.stringify(work))
}

function removeGallery (req, res) {
    var id = req.query.id
    var img = req.query.img
    var work = req.db.find('works', { id })

    for ( let i = 0; i != work.gallery.length; ++i ) {
        if ( work.gallery[i].id === img ) {
            work.gallery.splice(i, 1)
            break
        }
    }

    req.db.edit('works', id, work)
    return res.end(JSON.stringify(work))
}

// helper functions
function createPath (type, name) {
    var unique = Date.now().toString(36)
    var dirPath = path.join(global.dir, `data/${ type }`)
    var filePath = `${ unique }-${ name }`

    if ( fs.existsSync(dirPath) === false )
        fs.mkdirSync(dirPath)

    return {
        id: unique,
        url: `data/${ type }/${ filePath }`,
        full: path.join(dirPath, filePath)
    }
}