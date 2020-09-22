import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from ':src/admin/view/Main.vue'
import Page from ':src/admin/view/Page.vue'
import Edit from ':src/admin/view/Edit.vue'
import Create from ':src/admin/view/Create.vue'

import NotFound from ':src/admin/view/NotFound.vue'

export default router()

function router() {
    Vue.use(VueRouter)

    return new VueRouter({
        base: './',
        mode: 'hash',
        routes: getRoutes()
    })
}

function getRoutes() {
    return [{
            path: '/',
            name: 'Main',
            component: Main
        },

        {
            path: '/page/:page',
            name: 'Page',
            component: Page
        },

        {
            path: '/edit/:index',
            name: 'Edit',
            component: Edit
        },

        {
            path: '/create/:category',
            name: 'Create',
            component: Create
        },


        // 404 page
        {
            path: '/not-found',
            name: 'Not Found',
            component: NotFound
        },

        {
            path: '*',
            redirect: '/not-found'
        }
    ]
}