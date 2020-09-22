const fs = require('fs')
const path = require('path')
const tables = {
    works: load('works')
}

module.exports = { find, findList, create, remove, edit }

function load (name) {
    console.log(global.dir)
    var src = path.join(global.dir, `data/${name}.json`)
    var file = fs.readFileSync(src)

    return JSON.parse(file)
}

function find (table, filter) {
    for ( let data of tables[table] ) {
        let pass = true

        for ( let key of Object.keys(filter) )
            if ( data[key] !== filter[key] ) {
                pass = false
                break
            }

        if ( pass === true )
            return data
    }
}

function findList (table, filter) {
    var result = []

    for ( let data of tables[table] ) {
        let pass = true

        for ( let key of Object.keys(filter) )
            if ( data[key] !== filter[key] ) {
                pass = false
                break
            }

        if ( pass === true )
            result.push(data)
    }

    return result
}

function create (table, data) {
    var id = Date.now().toString(36)

    data.id = id
    tables[table].push(data)

    update(table)
    return data
}

function remove (table, id) {
    for ( let i = 0; i != tables[table].length; ++i )
        if ( tables[table][i].id === id ) {
            tables[table].splice(i, 1)
            return update(table)
        }
}

function edit (table, id, replace) {
    for ( let i = 0; i != tables[table].length; ++i )
        if ( tables[table][i].id === id ) {
            tables[table][i] = replace
            return update(table)
        }
}

function update (table) {
    var file = path.join(__dirname, `../data/${ table }.json`)
    var json = JSON.stringify(tables[table])

    fs.writeFileSync(file, json)
}