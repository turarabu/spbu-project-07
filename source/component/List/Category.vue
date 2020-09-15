<template lang='pug'>

    div( class='category' )
        template( v-for="link in list" )
            div( class='link' @click='push(link.name)'
                :class='{ hide: hides[link.name], active: last === link.name }' )

                div( class='link-icon-div' )
                    img( class='link-icon' :src='link.icon' )

                div( class='delemiter' )
                p( class='link-title' v-html='link.title[lang]' )

</template>

<script>
const action = {
    'show-links': showLinks,
    'hide-links': hideLinks
}

export default {
    props: ['call'],
    methods: { push },
    computed: { lang, list },
    mounted: function () {
        this.$watch('call', call => {
            if ( typeof action[call] === 'function' )
                action[call].apply(this, [this.$el])
        })
    },

    data: function () {
        return {
            last: false,
            hides: {
                first: true,
                second: true,
                third: true,
                fourth: true
            }
        }
    }
}

function lang () {
    return this.$store.state.lang
}

function list () {
    return this.$store.state.category
}

function push (link) {
    this.last = link
    this.$emit('last', link)
}

// Animations
function showLinks (el) {
    this.hides.second = false
    this.hides.third = false

    setTimeout(() => {
        this.hides.first = false
        this.hides.fourth = false
    }, 300)
}

function hideLinks (el) {
    this.hides.first = true
    this.hides.fourth = true

    setTimeout(() => {
        this.hides.second = true
        this.hides.third = true
    }, 300)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#list .category
    align-items top
    display flex
    justify-content center
    position relative
    top 200px

    .link
        align-items center
        box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
        background RGBA(28, 38, 53, .8)
        border-radius 10px
        display flex
        flex-direction column
        margin 0 20px
        position relative
        top 0
        transition .5s all
        width 300px
        &.hide
            top -50px
            opacity 0

    .link-icon-div
        align-items center
        display flex
        justify-content center
        height 260px

    .link-icon
        margin 100px 0 64px 0
        width auto

    .delemiter
        background-image url('~src/assets/img/list/delemiter.png')
        display inline-block
        height 8px
        width 184px

    .link-title
        color $default
        font-family 'Nocturne Serif', serif
        font-size 26px
        line-height 32px
        letter-spacing .02em
        margin 18px 0 36px 0
        text-align center
        width 230px

        span
            font inherit
            display block

#list .category .link.active
    background transparentify($default, .7)
    color $dark

    .delemiter
        background-image url('~src/assets/img/list/delemiter-black.png')
        
    .link-title
        color $dark

</style>