const path = require('path')
const { app, BrowserWindow } = require('electron')

module.exports = { open }

function open() {
    if (app.isReady())
        openWindow()

    else app.whenReady().then(openWindow)
}

function openWindow () {
    app.thisPath = global.dir

    const window = new BrowserWindow({
        height: 1000,
        width: 1700,
        frame: false,
        resizable: false,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
			enableRemoteModule: true,
            preload: path.join(__dirname, 'extra.js')
        }
    })

    // window.webContents.openDevTools()
    window.loadFile(path.join(global.dir, 'interface/app.html'))
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        openWindow()
})