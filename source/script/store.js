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
        mutations: { setLang, openGallery, galleryIndex, active },
        modules: {},
        state: {
            lang: 'ru',
            hideText: false,
            gallery: false,
            category: getCategory(),
            works: getWorks(),
            lastActive: new Date()
        }
    }
}

function setLang(state, lang) {
    state.hideText = true

    setTimeout(() => {
        state.lang = lang

        setTimeout(() => {
            state.hideText = false
        }, 150)
    }, 300)
}

function openGallery(state, payload) {
    state.gallery = payload
}

function galleryIndex(state, index) {
    state.gallery.index = index
}

function active(state, date) {
    state.lastActive = date
}

function getCategory() {
    return [{
            name: 'first',
            icon: 'img/list/first.png',
            ttl: {
                en: 'Tolstoy and Films',
                ru: 'Тостой и Фильмы'
            },
            title: {
                en: 'Films based on the works of L.&nbsp;N.&nbsp;Tolstoy',
                ru: 'Фильмы по произведениям Л.&nbsp;Н.&nbsp;Толстого'
            }
        },

        {
            name: 'second',
            icon: 'img/list/second.png',
            ttl: {
                en: 'Tolstoy and Performances',
                ru: 'Тостой и Постановки'
            },
            title: {
                en: 'Performances based on the works of L.&nbsp;N.&nbsp;Tolstoy',
                ru: 'Постановки по произведениям Л.&nbsp;Н.&nbsp;Толстого'
            }
        },

        {
            name: 'third',
            icon: 'img/list/third.png',
            ttl: {
                en: 'Biography of Tolstoy',
                ru: 'Биография Толстого'
            },
            title: {
                en: 'Biographical films about L.&nbsp;N.&nbsp;Tolstoy',
                ru: 'Биографические фильмы о Л.&nbsp;Н.&nbsp;Толстом'
            }
        },

        {
            name: 'fourth',
            icon: 'img/list/fourth.png',
            ttl: {
                en: 'Tolstoy and Tula',
                ru: 'Тостой и Тула'
            },
            title: {
                en: 'Films created in Yasnaya&nbsp;Polyana and&nbsp;Tula',
                ru: 'Фильмы снятые в Ясной&nbsp;Поляне и&nbsp;Туле'
            }
        },
    ]
}

function getWorks() {
    return [{
        video: 'video/cut-4-1.mp4',
        gallery: ['img/gallery/4-1-1.jpg', 'img/gallery/4-1-2.jpg', 'img/gallery/4-1-3.jpg'],
        title: {
            en: 'Evdokya (1961 г.)',
            ru: 'Евдокия (1961 г.)'
        }
    }]
}