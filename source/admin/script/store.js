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
            default: getDefault
        },
        mutations: {},
        actions: {},
        modules: {}
    }
}

function getMenu() {
    return [{
        id: 'first',
            title: 'Фильмы по произведениям Л. Н. Толстого',
            url: '/page/first'
        },

        {
            id: 'second',
            title: 'Постановки по произведениям Л. Н. Толстого',
            url: '/page/second'
        },

        {
            id: 'third',
            title: 'Биографические фильмы о Л. Н. Толстом',
            url: '/page/third'
        },

        {
            id: 'fourth',
            title: 'Фильмы снятые в Ясной Поляне и Туле',
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