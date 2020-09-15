<template lang='pug'>
    
    div( class='footer' )
        div( class='arrows-div left hide-arrows join-arrows' )
            img( class='arrow-icon' src='~src/assets/img/list/left-arrow.png' )
            img( class='arrow-icon' src='~src/assets/img/list/left-arrow.png' )
            img( class='arrow-icon' src='~src/assets/img/list/left-arrow.png' )

        div( class='langs-div hide-langs hide-line' )
            div( class='lang-div en' @click='setLang("en")' )
                div( class='lang' :class='{ active: lang === "en" }' )
                    span( class='lang-text' ) Eng

            div( class='lang-div ru' @click='setLang("ru")' )
                div( class='lang' :class='{ active: lang === "ru" }' )
                    span( class='lang-text' ) Рус

        div( class='arrows-div right hide-arrows join-arrows' )
            img( class='arrow-icon' src='~src/assets/img/list/right-arrow.png' )
            img( class='arrow-icon' src='~src/assets/img/list/right-arrow.png' )
            img( class='arrow-icon' src='~src/assets/img/list/right-arrow.png' )

</template>

<script>
const action = {
    'show-line': showLine,
    'show-langs': showLangs,
    'show-arrows': showArrows,
    'split-arrows': splitArrows,

    'hide-line': hideLine,
    'hide-langs': hideLangs,
    'hide-arrows': hideArrows,
    'join-arrows': joinArrows,
}

export default {
    props: ['call'],
    computed: { lang },
    methods: { setLang, callAction },
    mounted: function () {
        this.$watch('call', call => {
            if ( Array.isArray(call) ) {
                for ( let c of call )
                    this.callAction(c)
            }
            
            else this.callAction(call)
        })
    }
}

function lang () {
    return this.$store.state.lang
}

function setLang (lang) {
    this.$store.commit('setLang', lang)
}

function callAction (call) {
    if ( typeof action[call] === 'function' )
        action[call].apply(this, [this.$el])
}

// Animations
function showLine (el) {

    if ( el.querySelector('.langs-div').classList.contains('hide-line') === true )
        el.querySelector('.langs-div').classList.remove('hide-line')
}

function showLangs (el) {
    if ( el.querySelector('.langs-div').classList.contains('hide-langs') === true )
        el.querySelector('.langs-div').classList.remove('hide-langs')
}

function showArrows (el) {
    if ( el.querySelector('.arrows-div.left').classList.contains('hide-arrows') === true )
        el.querySelector('.arrows-div.left').classList.remove('hide-arrows')

    if ( el.querySelector('.arrows-div.right').classList.contains('hide-arrows') === true )
        el.querySelector('.arrows-div.right').classList.remove('hide-arrows')
}

function splitArrows (el) {
    if ( el.querySelector('.arrows-div.left').classList.contains('join-arrows') === true )
        el.querySelector('.arrows-div.left').classList.remove('join-arrows')

    if ( el.querySelector('.arrows-div.right').classList.contains('join-arrows') === true )
        el.querySelector('.arrows-div.right').classList.remove('join-arrows')
}

function hideLine (el) {
    if ( el.querySelector('.langs-div').classList.contains('hide-line') === false )
        el.querySelector('.langs-div').classList.add('hide-line')
}

function hideLangs (el) {
    if ( el.querySelector('.langs-div').classList.contains('hide-langs') === false )
        el.querySelector('.langs-div').classList.add('hide-langs')
}

function hideArrows (el) {
    if ( el.querySelector('.arrows-div.left').classList.contains('hide-arrows') === false )
        el.querySelector('.arrows-div.left').classList.add('hide-arrows')

    if ( el.querySelector('.arrows-div.right').classList.contains('hide-arrows') === false )
        el.querySelector('.arrows-div.right').classList.add('hide-arrows')
}

function joinArrows (el) {
    if ( el.querySelector('.arrows-div.left').classList.contains('join-arrows') === false )
        el.querySelector('.arrows-div.left').classList.add('join-arrows')

    if ( el.querySelector('.arrows-div.right').classList.contains('join-arrows') === false )
        el.querySelector('.arrows-div.right').classList.add('join-arrows')
}

</script>

<style lang='stylus'>
@import '~src/style/palette'

#list .footer
    align-items center
    display flex
    position absolute
    justify-content space-between
    bottom 60px
    left calc(50% - 500px)
    width 1000px

    .langs-div
        align-items center
        display flex
        justify-content space-between
        height 100px


    .lang-div
        display inline-block
        overflow hidden
        position relative
        transition .4s all
        height 100px
        width 125px

    .lang
        align-items center
        background transparent
        border 5px solid $default
        border-radius 50%
        color $default !important
        display inline-flex
        justify-content center
        position absolute
        transition .4s all
        height 100px
        width 100px
        &.active
            background $default
            color $dark !important

    .lang-text
        color inherit !important
        font-size 36px
        font-weight 300
        transition none
        position relative
        top -5px

    .lang-div.en
        border-right 2px solid $default
        .lang
            right 20px

    .lang-div.ru
        border-left 2px solid $default
        .lang
            left 20px

    .arrows-div
        transition .4s all

    .arrows-div.left .arrow-icon
        margin-right -8px
        transition .4s all

    .arrows-div.right .arrow-icon
        margin-left -8px
        transition .4s all

// hides
#list .footer

    .langs-div.hide-line .lang-div
        height 0
        
    .langs-div.hide-langs

        .lang-div.en .lang
            right -130px

        .lang-div.ru .lang
            left -130px

    .arrows-div.hide-arrows
        opacity 0

    .arrows-div.join-arrows
        &.left .arrow-icon
            margin-right -23px

        &.right .arrow-icon
            margin-left -23px
</style>