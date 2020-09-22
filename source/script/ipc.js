const { ipcRenderer } = window.external.electron
const queue = {}

export default { install }

function install (vue) {
    vue.prototype.ipc = ipc
}

function ipc (name, data) {
    return new Promise(resolve => {
        var id = unique()

        queue[id] = resolve
        ipcRenderer.send(name, { id, data })
        ipcRenderer.once(`${name}-reply`, (_, res) => {
            queue[res.id](res.data)
        })
    })
}

function unique () {
    return Date.now().toString(36)
}