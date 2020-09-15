<template lang='pug'>
    
    div#page
        div( class='bg-clips full' )
        Header(  )

        div( class='page-div full' )
            div( class='page-scroll' )
                div( class='page-content' ref='scrollBlock' )
                    div( class='content' ref='scrollContent' )
                        h2( class='page-title' :class='{ hide: opened }' v-html='title' )

                        div( v-for='(line, a) in list' class='list' :key='a' )
                            Work( v-for='(work, b) in line'
                                v-bind='{ call: action.work, id: a*5+b }'
                                :ref='`work-${a*5+b}`' :key='b' @open='open' @close='close' )

            ScrollBar( @scroll='scroll' ref='scrollBar' )

            InfoBar( :class='[action.infobar]' )
            img( class='close-black' :class='{ show: !opened }'
                src='~src/assets/img/page/close-black.png' @click='close' )
            img( class='close-white' :class='{ show: opened }'
                src='~src/assets/img/page/close-white.png' @click='close' )

</template>

<script>
import Header from ':src/component/Page/Header.vue'
import Work from ':src/component/Page/Work.vue'
import InfoBar from ':src/component/Page/InfoBar.vue'
import ScrollBar from ':src/component/Page/ScrollBar.vue'

export default {
    components: { Header, Work, InfoBar, ScrollBar },
    computed: { title, pageName, list },
    methods: { open, close, scroll },
    mounted: start,
    data: function () {
        return {
            openedId: null,
            name: this.$route.params.name,
            opened: false,
            scrolled: 0,
            action: {
                infobar: '',
                work: ''
            }
        }
    }
}

function pageName () {
    return this.$route.params.name
}

function title () {
    for ( let page of this.$store.state.category ) {
        if ( page.name === this.pageName )
            return page.title[ this.$store.state.lang ]
    }

    return 'Неизвестная страница'
}

function list () {
    var array = new Array(11)
    var list = []

    while (array.length > 0)
        list.push(array.splice(0, 5))

    return list
}

function start () {
    this.$nextTick(signAnimates)
    this.$refs.scrollBlock.addEventListener('scroll', () => {
        var height = this.$refs.scrollContent.offsetHeight
        var view = this.$refs.scrollBlock.offsetHeight
        var scrolled = this.$refs.scrollBlock.scrollTop
        var percent = 100 * scrolled / (height - view)

        this.$refs.scrollBar.scroll(percent)
    })
}

function open (id) {
    this.scrolled = this.$refs.scrollBlock.scrollTop
    this.opened = true
    this.openedId = id

    setTimeout(this.$refs[`work-${id}`][0].focus, 50)

    for ( let work of Object.keys(this.$refs) ) {
        if ( work.search('work') >= 0 && work !== `work-${id}` )
            setTimeout(this.$refs[work][0].hide, 50)
    }

    setTimeout(() => {
        this.action.infobar = 'show'
    }, 350)
}

function close () {
    if ( this.opened ) {   
        var works = []

        for ( let work of Object.keys(this.$refs) ) {
            if ( work.search('work') >= 0 && work !== `work-${this.openedId}` )
                works.push(this.$refs[work][0])
        }
        
        var wait = this.$refs[`work-${this.openedId}`][0].blur()
        setTimeout(() => {
            this.action.infobar = ''
            this.opened = false

            for ( let work of works )
                work.show()

            setTimeout(() => {
                this.$refs.scrollBlock.scrollTop = this.scrolled
            }, 50)
        }, wait - 50)
    }

    else this.$router.push('/list')
}

function scroll (percent) {
    var height = this.$refs.scrollContent.offsetHeight
    var view = this.$refs.scrollBlock.offsetHeight
    var scroll = ((height - view) * percent / 100)

    this.$refs.scrollBlock.scrollTop = scroll
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
    setTimeout(() => {
        if ( el.classList.contains('show') === false )
        el.classList.add('show')
    }, 300)
}

// Leave animation
function leave (el, done) {
    if ( el.classList.contains('show') === true )
        el.classList.remove('show')
    
    setTimeout(() => {
        done()
    }, 750)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#page
    background rgb(251, 241, 228)
    opacity 0
    transition .75s all

    .bg-clips
        background-image url('~src/assets/img/page/bg-clip.png')
        opacity .25

    .page-scroll
        overflow hidden
        position absolute
        bottom 0
        left calc(50% - (1750px / 2))
        top 0
        width 1750px

    .page-div
        top 124px

    .page-title
        font-family 'Nocturne Serif', serif
        font-size 36px
        font-weight normal
        color #000
        margin 32px auto 24px auto
        width 1585px
        &.hide
            opacity 0

    .page-content
        margin 0 auto
        overflow auto
        height 100%
        width 1600px

        .content
            overflow hidden

    .list
        align-items top
        display flex
        height 400px
        margin 28px auto
        max-width 100%

    .close-black, .close-white
        display none
        opacity 0
        position absolute
        top 40px
        right 62px
        &.show
            display block
            opacity 1
            z-index 3


#page.show
    opacity 1
</style>