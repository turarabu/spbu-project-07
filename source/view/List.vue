<template lang='pug'>

    div#list
        Category( v-bind='{ call: action.category }' @last='push' )
        Footer( :call='action.footer' )

</template>

<script>
import Category from ':src/component/List/Category.vue'
import Footer from ':src/component/List/Footer.vue'

export default {
    components: { Category, Footer },
    methods: { push },
    mounted: start,
    data: function () {
        return {
            timer: false,
            action: {
                category: '',
                footer: ''
            }
        }
    }
}

function start () {
    this.$nextTick(signAnimates)
    
    if ( this.last !== false )
        this.timer = setTimeout(() => {
            this.last = false
            this.timer = false
        }, 5000)
}

function push (link)  {
    setTimeout(() => {
        this.$router.push(`/page/${link}`)
    }, 500)

    if ( this.timer !== false ) {
        clearTimeout(this.timer)
        this.timer = false
    }
}

function signAnimates () {
    enter.apply(this, [this.$el])

    var removeListener = this.$router.beforeEach((_, __, next) => {
        leave.apply(this, [this.$el, next])
        return removeListener()
    })
}

// Enter animation
function enter (el) {
    setTimeout(() => {
        this.action.footer = ['show-line', 'show-arrows']

        setTimeout(() => {
            this.action.category = 'show-links'
        }, 200)

        setTimeout(() => {
            this.action.footer = ['show-langs', 'split-arrows']
        }, 300)
    }, 300)
}

// Leave animation
function leave (el, done) {
    this.action.category = 'hide-links'
    this.action.footer = ['hide-langs', 'join-arrows']

    setTimeout(() => {
        this.action.footer = ['hide-line', 'hide-arrows']

        setTimeout(done, 600)
    }, 300)
}
</script>

<style lang='stylus'>

@import '~src/style/palette'

// #list
//     position relative

</style>