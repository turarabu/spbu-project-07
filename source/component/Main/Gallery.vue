<template lang='pug'>
    
    div#gallery( class='closable' @click='close' )
        div( class='arrow left' @click='prev' )
            img( class='arrow-img' src='~src/assets/img/main/arrow.png' )

        div( class='image-box closable' )
            img( class='image' :src='image.src' )

        div( class='arrow right' @click='next' )
            img( class='arrow-img' src='~src/assets/img/main/arrow.png' )

        img( class='close' src='~src/assets/img/page/close-white.png' @click='close(true)' )

</template>

<script>

export default {
    props: ['gallery'],
    computed: { image },
    methods: { close, prev, next },
    mounted: start
}

function start () {
    // console.log('123123')
    // this.$root.app.hideBlocks()
}

function image () {
    return this.gallery.list[this.gallery.index]
}

function close (event) {
    var check = event.target && event.target.classList.contains('closable')

    if ( event === true || check === true )
        this.$store.commit('openGallery', false)
}

function prev () {
    var index = this.gallery.index - 1

    if ( index < 0 )
        index = this.gallery.list.length - 1

    return this.$store.commit('galleryIndex', index)
}

function next () {
    var index = this.gallery.index + 1

    if ( index >= this.gallery.list.length )
        index = 0

    return this.$store.commit('galleryIndex', index)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#gallery
    // display none
    background RGBA(0, 0, 0, .75)
    position fixed
    top 124px
    left 0
    right 0
    bottom 0
    z-index 5

    .close
        position absolute
        top 40px
        right 62px

    .arrow
        align-items center
        background linear-gradient(to left, RGBA(250, 250, 250, .75), RGBA(180, 180, 180, .5))
        border-radius 50%
        display flex
        justify-content center
        position absolute
        top calc(50% - 50px)
        height 100px
        width 100px
        &.left
            left 15px
            transform scale(-1, 1)
        &.right
            right 15px

    .arrow-img
        position relative
        right -7.5px
        width 40px

    .image-box
        align-items center
        display flex
        justify-content center
        margin 24px auto
        height calc(100% - 48px) 
        width calc(100% - 200px)

    .image
        box-shadow 0 0 20px 2px RGBA(0, 0, 0, .75)
        max-height 100%
        max-width 100%
</style>