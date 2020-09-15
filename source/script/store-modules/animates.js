export default {
    state: {
        shows: {},
        hides: {}
    },

    mutations: {
        'show-animate': showAnimate,
        'hide-animate': hideAnimate,
    }
}

function showAnimate(state, payload) {
    state.shows[payload.name] = decorator(payload)
}

function hideAnimate(state, payload) {
    state.hides[payload.name] = decorator(payload)
}


function decorator(payload) {
    return (...args) => {
        return payload.handler.apply(payload.self, args)
    }
}