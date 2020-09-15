<template lang='pug'>
    
    div( class='header' )
        div( class='bg-line' )
        div( class='title-div' )
            div( class='title-border full' )
            div( class='title-angles' )
            div( class='title-angles right' )
            h3( class='header-title' ) {{ title }}

        div( class='langs-div' )
            div( class='lang' :class='{ active: lang === "en" }' @click='setLang("en")' )
                span( class='lang-name' ) Eng

            div( class='lang' :class='{ active: lang === "ru" }' @click='setLang("ru")' )
                span( class='lang-name' ) Рус

</template>

<script>
export default {
    computed: { lang, pageName, title },
    methods: { setLang }
}

function lang () {
    return this.$store.state.lang
}

function pageName () {
    return this.$route.params.name
}

function title () {
    for ( let page of this.$store.state.category ) {
        if ( page.name === this.pageName )
            return page.ttl[ this.$store.state.lang ]
    }

    return 'Неизвестная страница'
}

function setLang (lang) {
    return this.$store.commit('setLang', lang)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#page .header
    align-items center
    background $header-bg
    box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
    display flex
    justify-content center
    height 124px
    position relative
    z-index 2

    .bg-line
        border-bottom 2px solid $default
        border-top 2px solid $default
        height 6px
        position absolute
        left 0
        right 0

    .langs-div
        display flex
        position absolute
        right 64px

        .lang
            align-items center
            background $header-bg
            border 2px solid $default
            border-radius 50%
            color $default !important
            display flex
            font-weight 300
            justify-content center
            margin-left 12px
            height 60px
            width 60px
            &.active
                background $default
                color $header-bg !important
                font-weight 400

        .lang-name
            color inherit !important
            font-size 20px
            transition none
            position relative
            top -2px

    .title-div
        background $header-bg
        display inline-block
        padding 14px 28px
        position relative
        
    .title-border
        border 6px double $default

    .title-angles
        position absolute
        bottom 0
        top 0
        left 0
        &.right
            left auto
            right 0
            transform scale(-1, 1)
        &:after, &:before
            background-image url('~src/assets/img/page/title-angle.png')
            background-size cover
            display block
            content  ''
            position absolute
            left 0px
            height 15px
            width 15px
        &:after
            bottom 0
            transform scale(1, -1)
            

    .header-title
        color $default
        font-family 'Nocturne Serif', serif
        font-size 32px
        font-weight 100

// #body.hide-blocks .header
//     opacity 0
</style>
