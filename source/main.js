import Vue from 'vue'

import App from ':src/App.vue'

import router from ':src/script/router'
import store from ':src/script/store'
import ipc from ':src/script/ipc'

Vue.use(ipc)

new Vue({
    router,
    store,
    render: handle => handle(App)
}).$mount('#body')