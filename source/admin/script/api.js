const ajax = {}

export default { install }

function install(vue) {
    vue.prototype.api = api
    vue.prototype.api.upload = upload
}

function api(path, data = {}) {
    const hash = unique()
    const json = JSON.stringify(data)

    ajax[hash] = XHR('POST', path)

    ajax[hash].setRequestHeader('content-type', 'application/json')
    ajax[hash].send(json)

    return new Promise(resolve => {
        ajax[hash].addEventListener('loadend', event => {
            var json = event.target.response
            var data = JSON.parse(json)

            delete ajax[hash]
            return resolve(data)
        })
    })
}

function upload(path, file) {
    const hash = unique()
    const data = new FormData()

    ajax[hash] = XHR('POST', path)
        // ajax[hash].setRequestHeader('content-type', 'multipart/form-data')

    data.append('file', file)
    ajax[hash].send(data)

    return new Promise(resolve => {
        ajax[hash].addEventListener('loadend', event => {
            var json = event.target.response
            var data = JSON.parse(json)

            delete ajax[hash]
            return resolve(data)
        })
    })
}

function XHR(method, path) {
    const ajax = new XMLHttpRequest()

    ajax.open(method, path, true)
    return ajax
}

function unique() {
    var time = Date.now()
    return time.toString(36)
}