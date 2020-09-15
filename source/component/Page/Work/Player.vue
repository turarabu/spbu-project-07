<template lang='pug'>
    
    div( :class='classes' @click='max' )
        div( class='player' ref='player' :style='styles' )
            video( class='video' ref='video' src='video/cut-4-1.mp4' disablePictureInPicture='true' preload )
            div( :class='{ poster: true, hide: !stopped }' :style='{ backgroundImage: "url(\'video/cut-4-1-poster.jpg\')" }' )
            PlayerControls( :video='$refs.video' ref='controls'
                @start='stopped = false'
                @close='min' )

            div( class='player-play-div small' v-if='stopped' )
                img( class='player-play small' src='~src/assets/img/page/play-icon-small.png' )

            div( class='player-play-div big' )
                img( class='player-play big' src='~src/assets/img/page/play-icon-big.png' )

</template>

<script>
import PlayerControls from ':src/component/Page/Work/PlayerControls.vue'

export default {
    props: ['position'],
    components: { PlayerControls },
    methods: { open, close, min, max },
    data: function () {
        return {
            stopped: true,
            styles: {
                top: '',
                left: '',
                position: '',

                height: '',
                width: ''
            },

            classes: {
                'player-div': true,
                'open': false,
                'opened': false,
                'max': false
            },

            temp: {}
        }
    }

}


function open () {
    this.classes['open'] = true
    setTimeout(() => {
        this.classes['opened'] = true
    }, 400)
}

function close () {
    if ( this.stopped ) {
        this.classes['opened'] = false

        setTimeout(() => {
            this.classes['open'] = false
        }, 50)
    }

    else {
        this.$refs.controls.close()

        setTimeout(() => {
            this.classes['open'] = false
        }, 750)
    }
}

function max () {
    if ( this.stopped === false )
        return

    if ( !this.classes.open || this.classes.max )
        return

    var top = this.$parent.extraStyles.top
    var left = this.$parent.extraStyles.left
    var height = this.$el.offsetHeight
    var width = this.$el.offsetWidth

    this.temp = { top, left, height, width }

    this.styles.height = `${height}px`
    this.styles.width = `${width}px`

    setTimeout(() => {
        this.styles.top = top
        this.styles.left = left
        this.styles.position = 'fixed'

        setTimeout(() => {
            this.styles.top = `calc(50% - ${ height / 2 }px)`
            this.styles.left = `calc(50% - ${ width / 2 }px)`

            setTimeout(() => {
                this.$root.app.hideBlocks()
                this.styles.top = `140px`
                this.styles.left = `20px`

                this.styles.height = `calc(100% - 160px)`
                this.styles.width = `calc(100% - 40px)`

                setTimeout(this.$refs.controls.play, 750)
            }, 150)
        }, 50)
    }, 250)
}

function min () {
    this.$root.app.showBlocks()
    this.playing = false
    this.styles.height = `${this.temp.height}px`
    this.styles.width = `${this.temp.width}px`

    this.styles.top = `calc(50% - ${ this.temp.height / 2 }px)`
    this.styles.left = `calc(50% - ${ this.temp.width / 2 }px)`

    setTimeout(() => {
        this.styles.top = this.temp.top
        this.styles.left = this.temp.left
        setTimeout(() => {
            this.stopped = true
            this.styles = {
                top: '',
                left: '',
                position: '',

                height: '',
                width: ''
            }
        }, 300)
        
    }, 150)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.player-div
    border-radius 5px
    box-shadow 0px 4px 4px RGBA(0, 0, 0, .25)
    // overflow hidden
    position relative
    transition .3s all
    height 280px
    width 300px
    z-index 10

    .player
        align-items center
        background #000
        display flex
        position relative
        justify-content center
        height 100%
        width 100%

    .video, .poster
        background-position center
        background-size cover
        height 100%
        width 100%
        position absolute
        left 0
        top 0
        &.hide
            opacity 0

    .player-play-div
        align-items center
        background $default
        border-radius 50%
        display flex
        justify-content center
        opacity 1
        position absolute
        transition .3s opacity 
        &.small
            opacity 1
            padding-left 2px
            top 10px
            right 10px
            height 34px
            width 34px
        &.big
            opacity 0
            padding-left 8px
            right calc(50% - 36px)
            top calc(50% - 36px)
            height 72px
            width 72px

        // .player-play
        //     position absolute
        //     transition .4s all
        //     &.big
        //         opacity 0

.player-div.opened
    .player-play-div.big
        opacity 1

.player-div.open
    height 500px
    width 100%

    .player-play-div.small
        opacity 0

        // .player-play.small
        //     opacity 0

        // .player-play.big
        //     opacity 1
</style>