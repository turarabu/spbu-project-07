<template lang='pug'>
    
    div( class='controls full' :class='{ show }' )
        div( class='top-controls' )
            p( class='title' ) Отрывок из фильма "Евдокия"
            img( class='close' src='~src/assets/img/page/close-white.png' @click='close' )

        div( class='bot-controls' )
            div( class='player-button-div' @click='toggle' )
                img( v-if='paused == true' class='player-button' src='~src/assets/img/page/player-play.png' )
                img( v-if='paused == false' class='player-button' src='~src/assets/img/page/player-pause.png' )

            div( class='timing-div' )
                div( class='played-time' :style='{ width: playedPercent }' )
                div( class='thumb' :style='{ left: playedPercent }' )
                div( class='timing full' ref='timing' )

</template>

<script>

export default {
    props: ['video'],
    computed: { playedPercent },
    methods: { play, toggle, close, signEvents, unsignEvents, updateTimer,
        e_timeupdate, e_play, e_pause, e_mousedown, e_mouseup, e_mousemove  },
    data: function () {
        return {
            show: false,

            listener: {},
            paused: true,
            moveable: false,
            currentTime: 0,
            duration: 0
        }
    }
}

function playedPercent () {
    return `${ this.currentTime * 100 / this.duration }%`
}

function play () {
    this.signEvents()
    this.video.play()
    this.$emit('start')
}

function toggle () {
    if ( this.paused )
        this.video.play()
    else this.video.pause() 
}

function close () {
    this.unsignEvents()
    this.video.pause()

    this.show = false
    
    this.$emit('close')

    setTimeout(() => {
        this.video.currentTime = 0
    }, 1000)
}

function signEvents () {
    this.updateTimer()

    this.video.addEventListener('timeupdate', this.e_timeupdate)

    this.video.addEventListener('play', this.e_play)
    this.video.addEventListener('pause', this.e_pause)

    this.$refs.timing.addEventListener('mousedown', this.e_mousedown)
    this.$refs.timing.addEventListener('mouseup', this.e_mouseup)
    window.addEventListener('mousemove', this.e_mousemove)

    this.$refs.timing.addEventListener('touchstart', this.e_mousedown)
    this.$refs.timing.addEventListener('touchend', this.e_mouseup)
    window.addEventListener('touchmove', this.e_mousemove)
}

function unsignEvents () {
    this.video.removeEventListener('timeupdate', this.e_timeupdate)
    this.video.removeEventListener('play', this.e_play)
    this.video.removeEventListener('pause', this.e_pause)

    this.$refs.timing.removeEventListener('mousedown', this.e_mousedown)
    this.$refs.timing.removeEventListener('mouseup', this.e_mouseup)
    window.removeEventListener('mousemove', this.e_mousemove)

    this.$refs.timing.removeEventListener('touchstart', this.e_mousedown)
    this.$refs.timing.removeEventListener('touchend', this.e_mouseup)
    window.removeEventListener('touchmove', this.e_mousemove)
}

function updateTimer () {
    this.show = true
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
        this.show = false
    }, 2000)
}

function e_timeupdate ( event ) {
    this.duration = event.target.duration
    this.currentTime = event.target.currentTime
    this.playing = true

    this.$store.commit('active', new Date())
}

function e_play ( event ) {
    this.paused = false
}

function e_pause ( event ) {
    this.paused = true
}

function e_mousedown ( event ) {
    if ( event.touches )
        event = event.touches[0]

    this.updateTimer()
    this.video.currentTime = offsetOf(this, event) * this.video.duration / this.$refs.timing.offsetWidth
    // this.video.currentTime = event.offsetX * this.video.duration / event.target.offsetWidth
    this.moveable = {
        start: event.clientX - offsetOf(this, event),
        width: this.$refs.timing.offsetWidth
    }
}

function e_mouseup ( event ) {
    this.moveable = false
}

function e_mousemove ( event ) {
    if ( this.moveable === false )
        return

    if ( event.touches )
        event = event.touches[0]

    this.updateTimer()

    var position = event.clientX - this.moveable.start
    var calculate = Math.max(0, Math.min(this.moveable.width, position))
    var newTime = calculate * this.video.duration / this.moveable.width

    this.video.currentTime = newTime
}

function offsetOf (self, event) {
    var e = self.$refs.timing
    var x = e.offsetLeft
    var p = e.offsetParent

    while ( p.offsetParent ) {
        x += p.offsetLeft
        p = p.offsetParent
    }

    return event.clientX - x
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.player .controls
    opacity 0
    z-index 5

    .top-controls
        background linear-gradient(to bottom, RGBA(0, 0, 0, .75), RGBA(0, 0, 0, 0))
        padding 16px 72px
        position absolute
        top 0
        left 0
        width 100%

        .close
            position absolute
            top 20px
            right 42px

        .title
            color $default
            font-family 'Nocturne Serif', serif
            font-size 48px
            font-weight normal

    .bot-controls
        background linear-gradient(to top, RGBA(0, 0, 0, .35), RGBA(0, 0, 0, .3))
        padding 16px 72px 24px 72px
        position absolute
        bottom 0
        left 0
        width 100%

    .player-button-div
        text-align center
        height 40px
        width 40px

        .player-button
            max-height 100%
            max-width 100%

    .timing-div
        background $default
        height 2px
        position absolute
        top calc(50% - 1px)
        left 152px
        right 72px

    .played-time
        background $played
        height 100%
        transition none
        position absolute
        left 0

    .thumb
        background $dark
        border 1px solid $default
        outline 2px solid $dark
        transform rotate(45deg)
        margin-left -6px
        transition none
        position absolute
        top -6px
        left 0
        height  14px
        width 14px

    .timing
        position absolute
        top -9px
        left 0
        height 20px
        width 100%
        max-width 100%
        z-index 5

.player .controls.show
    opacity 1
</style>