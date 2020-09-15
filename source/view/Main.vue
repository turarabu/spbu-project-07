<template lang='pug'>

    div#main( @click='toList' class='hide' )
        img( class='hand-icon' src='~src/assets/img/main/hand-icon.png' )
        div( class='borders' )
        button( class='start-button' )
            span Коснитесь чтобы начать
            span( class='decor' )
            span Tap to start
        div( class='borders' )


</template>

<script>
export default {
    methods: { toList, enter, leave },
    mounted: function () {
        this.$nextTick(signAnimates)
    }
}

function toList () {
    this.$router.push('/list')
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
    if ( el.classList.contains('hide') === true )
        el.classList.remove('hide')
}

// Leave animation
function leave (el, done) {
    if ( el.classList.contains('hide') === false )
        el.classList.add('hide')
    
    setTimeout(() => {
        done()
    }, 300)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#main
    align-items center
    display flex
    flex-direction column
    justify-content center
    &.hide
        opacity 0
        
    .hand-icon
        margin 16px 0

    .borders
        border 1px solid $default
        border-width 1px 0 1px 0
        margin 8px 0 2px 0
        height 2px
        width 100%

    .start-button
        background none
        border none
        color $default
        font-family Oswald, sans-serif
        font-size 24px
        font-weight 200
        outline none
        padding 4px 0

    .decor
        border-top 1px solid $default
        display block
        margin 12px 0 8px 0
        position relative
        left -12.5%
        width 125%
        &:after, &:before
            border 1px solid $default
            display block
            content ''
            transform rotate(45deg)
            position absolute
            left -7px
            top -4px
            height 5px
            width 5px
        &:after
            left auto
            right -7px
</style>