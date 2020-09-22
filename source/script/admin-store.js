import Vue from 'vue'
import Vuex from 'vuex'

export default storage()

function storage() {
    const store = getStore()
    Vue.use(Vuex)

    return new Vuex.Store(store)
}

function getStore() {
    return {
        state: {
            menu: getMenu(),
            default: getDefault()
        },
        mutations: {},
        actions: {},
        modules: {}
    }
}

function getMenu() {
    return [{
            title: '123123',
            url: '/page/first'
        },

        {
            title: '123123',
            url: '/page/second'
        },

        {
            title: '123123',
            url: '/page/third'
        },

        {
            title: '123123',
            url: '/page/fourth'
        }
    ]
}

function getDefault() {
    var langs = {
        en: '',
        ru: ''
    }

    return {
        gallery: [],
        metas: [],
        actors: [],
        poster: '',
        video: '',
        year: '',
        genres: {...langs },
        country: {...langs },
        title: {...langs }
    }
}