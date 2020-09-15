import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from ':src/view/Main.vue'
import List from ':src/view/List.vue'
import Page from ':src/view/Page.vue'

export default router()

function router() {
    Vue.use(VueRouter)

    return new VueRouter({
        base: '/',
        mode: 'hash',
        routes: getRoutes()
    })
}

function getRoutes() {
    return [{
            path: '/',
            name: 'main',
            component: Main
        },

        {
            path: '/list',
            name: 'list',
            component: List
        },

        {
            path: '/page/:name',
            name: 'page',
            component: Page
        }
    ]
}