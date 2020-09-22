const path = require('path')
const root = __dirname

module.exports = {
    publicPath: './',
    filenameHashing: false,
    productionSourceMap: false,
    outputDir: path.join(root, 'interface'),

    pages: getPages(),
    configureWebpack: getConfigureWebpack()
}

function getPages() {
    return {
        index: {
            entry: path.join(root, 'source', 'main.js'),
            template: path.join(root, 'public', 'index.pug'),
            filename: 'app.html'
        },

        admin: {
            entry: path.join(root, 'source', 'admin/main.js'),
            template: path.join(root, 'public', 'index.pug'),
            filename: 'index.html'
        }
    }
}

function getConfigureWebpack() {
    return {
        resolve: {
            alias: {
                'root': root,
                ':root': root,

                'src': path.join(root, 'source'),
                ':src': path.join(root, 'source')
            }
        }
    }
}