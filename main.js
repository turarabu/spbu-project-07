global.dir = __dirname

const { ipcMain } = require('electron')

const db = require('./core/data')
const server = require('./core/server')
const window = require('./core/window')

main()

async function main () {
    await server.start()
    window.open()
}

ipcMain.on('get-list', (event, { id, data }) => {
    var list = db.findList('works', data)
    event.reply('get-list-reply', {
        id,
        data: list
    })
})

