<template lang='pug'>
    
    div( class='scroll-bar' )
        div( class='scroll-rails' ref='rails' )
            span( class='scroll-thumb' ref='thumb' :style='{ top: `${thumbY}px` }' )

</template>

<script>
export default {
    methods: { top, bottom, scroll },
    mounted: start,
    data: function () {
        return {
            block: false,
            moveable: false,
            mouseStart: 0,
            thumbY: 0
        }
    }
}

function top () {
    var top = this.$refs.rails.offsetTop
    var parent = this.$refs.rails.offsetParent

    while ( parent ) {
        top += parent.offsetTop
        parent = parent.offsetParent
    }
    
    return top
}

function bottom () {
    return this.$refs.rails.offsetHeight
}

function start () {
    this.$refs.thumb.addEventListener('mousedown', event => {
        this.mouseStart = event.clientY
        this.moveable = true
    })

    this.$refs.thumb.addEventListener('touchstart', event => {
        event = event.touches[0]
        
        this.mouseStart = event.clientY
        this.moveable = true
    })


    window.addEventListener('mousemove', event => {
        if ( this.moveable  ) {
            let currentY = event.clientY - this.top()
            let percentY = Math.max(0, Math.min(100, currentY * 100 / this.bottom()))
            this.thumbY = Math.max(0, Math.min(this.bottom(), currentY))

            this.$emit('scroll', percentY)
        }
    })

    window.addEventListener('touchmove', event => {
        event = event.touches[0]

        if ( this.moveable  ) {
            let currentY = event.clientY - this.top()
            let percentY = Math.max(0, Math.min(100, currentY * 100 / this.bottom()))
            this.thumbY = Math.max(0, Math.min(this.bottom(), currentY))

            this.$emit('scroll', percentY)
        }
    })


    window.addEventListener('mouseup', () => {
        this.moveable = false
    })

    window.addEventListener('touchend', () => {
        this.moveable = false
    })
}

function scroll (percent) {
    this.thumbY = this.bottom() * percent / 100
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#page .scroll-bar
    background $default
    position absolute
    bottom 0
    top 100px
    right 80px
    width 5px

    .scroll-rails
        position absolute
        bottom 50px
        top 50px
        width 100%

    .scroll-thumb
        background $dark
        border 2px solid $default
        outline 2px solid $dark
        display block
        transform rotate(45deg)
        height 16px
        width 16px
        position absolute
        transition none
        left -5px
        top 0
</style>