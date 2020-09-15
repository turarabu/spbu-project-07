<template lang='pug'>
    
    body#body( :class='{ "hide-text": hideText, ...classes }' v-bind='{ page }' )
        div#bg-color( class='full' )

        router-view( class='full' )

        div( class='timer' v-if='timer' )
            div( class='timer-notice' )
                div( class='close-div' @click='cancel' )
                    img( class='close' src='~src/assets/img/main/close.png' )

                p( class='notice-text' )
                    span( class='dark' ) Через
                    span( class='light' ) 30 секунд
                    span( class='dark' ) вы вернётесь к начальному экрану.
                    span( class='light' ) Для отмены нажмите на крестик


</template>

<script>
export default {
    computed: { hideText, page },
    methods: { hideBlocks, showBlocks, cancel },
    mounted: start,
    data: function () {
        this.$root.app = this

        return {
            timer: false,
            classes: {
                'full': true,
                'hide-blocks': false
            }
        }
    }
}

function page () {
    return this.$route.name
}

function hideText () {
    return this.$store.state.hideText
}

function hideBlocks () {
    this.classes['hide-blocks'] = true
}

function showBlocks () {
    this.classes['hide-blocks'] = false
}

function cancel () {
    clearTimeout(this.timer)
    this.timer = false
    this.$store.commit('active', new Date())
}

function start () {
    window.addEventListener('mousemove', () => {
        this.$store.commit('active', new Date())
    })

    setInterval(() => {
        let now = new Date()
        let last = this.$store.state.lastActive

        if ( this.$route.name === 'main' )
            this.$store.commit('active', new Date())

        else if ( (now - last) > (30 * 60 * 1000) ) {
            if ( this.timer === false ) {
                this.timer = setTimeout(() => {
                    this.$router.push('/')

                    let remover = this.$router.afterEach(() => {
                        this.timer = false                        
                        remover()
                    })
                }, 30*1000)
            }
        }
    }, 5*1000)
}
</script>

<style lang='stylus'>
@import '~src/style/fonts'
@import '~src/style/base'

@import '~src/style/palette'

#body
    background-size cover
    overflow hidden
    transition .5s background-image
    &[page=main]
        background-image url('~src/assets/img/main/bg-main.jpg')
    &[page=list]
        background-image url('~src/assets/img/main/bg-list.jpg')
    &[page=page]
        background-image url('~src/assets/img/main/bg-list.jpg')
    
    &.hide-text *
        color transparent !important

    > .timer
        align-items center
        background RGBA(0, 0, 0, .8)
        display flex
        justify-content center
        position fixed
        top 0
        left 0
        bottom 0
        right 0
        z-index 50

        .timer-notice
            background $dark
            border 1px solid $default
            padding 48px 28px
            position relative
            width 800px

            .close-div
                align-items center
                background $default
                border 1px solid $dark
                display flex
                justify-content center
                transform rotate(45deg)
                position absolute
                top -16px
                right -16px
                height 32px
                width 32px

            .notice-text
                font-family 'Nocturne Serif', serif
                font-size 38px
                font-weight normal
                text-align center

                .light
                    color $default
                    // display inline-block
                    font-family 'Nocturne Serif', serif
                    margin 0 4px

                .dark
                    color $played
                    // display inline-block
                    font-family 'Nocturne Serif', serif
                    margin 0 4px


#bg-color
    background RGBA(23, 34, 53, .74)
</style>