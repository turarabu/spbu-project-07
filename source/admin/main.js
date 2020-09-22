import Vue from 'vue'

import App from ':src/admin/App.vue'

import router from ':src/admin/script/router'
import store from ':src/admin/script/store'
import api from ':src/admin/script/api'

Vue.use(api)

new Vue({
    router,
    store,
    render: handle => handle(App)
}).$mount('#body')