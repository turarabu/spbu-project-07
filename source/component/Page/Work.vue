<template lang='pug'>
    
    div( class='work' :class='classList' :style='extraStyles' @click='click' )
        Player( ref='player' )

        div( class='metas-div' )
            h3( class='work-title' ) Евдокия (1961 г.)
            p( class='meta-key' ) Режисёр:
                span( class='meta-value' ) Татьяна Лиознова

            p( class='meta-key' ) Место съёмок:
                span( class='meta-value' ) г. Тула

        div( class='gallery' )
            div( class='gallery-arrow left' @click='slide(-700)' )
            div( class='images-div' )
                img( class='image' src='img/gallery/4-1-1.jpg' )
                img( class='image' src='img/gallery/4-1-2.jpg' )
                img( class='image' src='img/gallery/4-1-3.jpg' )

            div( class='gallery-arrow right' @click='slide(700)' )

</template>

<script>
import Player from ':src/component/Page/Work/Player.vue'

export default {
    props: ['call', 'id'],
    components: { Player },
    methods: { click, hide, show, focus, blur, slide },
    mounted: start,
    data: function () {
        return {
            playerClass: '',

            opened: false,
            lockScroll: false,
            classList: {
                minimize: false,
                hide: false
            },
            save: {},
            extraStyles: {
                margin: '',
                position: '',
                top: '',
                left: ''
            },

        }
    }
}

function start () {
    var  listener = this.$router.beforeEach((to, from, next) => {
        if ( from.name === 'page' && this.opened ) {
            if ( this.$refs.player.stopped ) {
                this.$emit('close')

                setTimeout(() => {
                    next()
                }, 750)
            }

            else {
                this.$refs.player.close()

                setTimeout(() => {
                    this.$emit('close')
                }, 500)

                setTimeout(() => {
                    next()
                }, 1000)
            }
        }

        else next()
    })
}

function click () {
    if ( this.opened === false ) {
        this.$emit('open', this.id)
        this.opened = true
    }
}

function focus () {
    var parent = this.$el.offsetParent

    this.save.top = this.$el.offsetTop
    this.save.left = this.$el.offsetLeft

    while ( parent ) {
        this.save.top += parent.offsetTop
        this.save.left += parent.offsetLeft

        parent = parent.offsetParent
    }

    this.save.top -= this.$parent.$refs.scrollBlock.scrollTop

    this.extraStyles.position = 'fixed'
    this.extraStyles.left = `${this.save.left - 10}px`
    this.extraStyles.top = `${this.save.top}px`

    setTimeout(() => {
        this.extraStyles.margin = '0'
        this.extraStyles.left = `150px`
        this.extraStyles.top = `230px`

        setTimeout(() => {
            open.apply(this, [this.$el])
        }, 100)
    }, 100)
}

function blur (timer) {
    var wait = close.apply(this, [this.$el])

    setTimeout(() => {
        this.extraStyles.margin = ''
        this.extraStyles.left = `${this.save.left - 10}px`
        this.extraStyles.top = `${this.save.top}px`

        setTimeout(() => {
            this.extraStyles.position = ''
            this.extraStyles.left = ''
            this.extraStyles.top = ''
        }, 250)
    }, wait)

    return wait
}

function hide () {
    this.classList.hide = true
    setTimeout(() => {
        this.classList.minimize = true
    }, 300)
}

function show () {
    this.classList.minimize = false
    setTimeout(() => {
        this.classList.hide = false
    }, 300)
}

function slide (px) {
    if ( this.lockScroll )
        return

    this.lockScroll = true

    var scrolled = 0
    var gallery = this.$el.querySelector('.gallery .images-div')
    var interval = setInterval(() => {
        gallery.scrollLeft += px/35
        scrolled += Math.abs(px)/35

        if ( scrolled >= Math.abs(px) ) {
            this.lockScroll = false
            clearInterval(interval)
        }
    }, 10)
}

function open (el) {
    this.$refs.player.open()
    el.classList.add('open')

    setTimeout(() => {
        var images = el.querySelectorAll('.images-div .image')
        var arrows = el.querySelectorAll('.gallery-arrow')

        arrows[0].classList.add('show')
        arrows[1].classList.add('show')

        for ( let i = 0; i != images.length; ++i )
            setTimeout(() => {
                images[i].classList.add('show')
            }, i*150)
    }, 300)
}

function close (el) {
    var images = [...el.querySelectorAll('.images-div .image')]
    var arrows = el.querySelectorAll('.gallery-arrow')

    arrows[0].classList.remove('show')
    arrows[1].classList.remove('show')
    images.reverse()

    for ( let i = 0; i != images.length; ++i )
        setTimeout(() => {
            images[i].classList.remove('show')
        }, i*35)

    setTimeout(() => {
        this.opened = false
        this.$refs.player.close()
        el.classList.remove('open')
    }, 100 + (images.length*35))

    return 100 + (images.length*35)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#page .work
    position relative
    margin 0 10px
    width 300px
    z-index 5
    &.hide
        opacity 0
    &.minimize
        display none

    .metas-div
        max-height 500px
        overflow hidden

    .work-title
        color #000
        font-family 'Nocturne Serif', serif
        font-size 26px
        font-weight normal
        margin 16px 0

    .meta-key
        color #000
        font-size 18px
    
    .meta-value
        color #000
        font-weight 300
        margin-left 8px

    .gallery
        align-items center
        display none
        justify-content space-between
        margin 24px 0
        position relative
        width 100%

    .gallery-arrow
        background-position center
        background-repeat no-repeat
        display none
        opacity 0
        position absolute
        bottom 0
        top 0
        width 25px
        &.show
            display block
            opacity 1
        &.left
            background-image url('~src/assets/img/page/arrow-left.png')
            left -40px
        &.right
            background-image url('~src/assets/img/page/arrow-right.png')
            right -40px


    .images-div
        align-items center
        display flex
        overflow-x hidden
        width 100%

        .image
            border-radius 2px
            box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
            display block
            margin-right 20px
            opacity 0
            position relative
            top -50px
            width 300px
            &.show
                opacity 1
                top 0

#page .work.open
    position relative
    width 850px
    z-index 5

    .metas-div
        opacity 0
        max-height 0

    .gallery
        display flex
        opacity 1

#body.hide-blocks .work
    .gallery
        opacity 0

</style>