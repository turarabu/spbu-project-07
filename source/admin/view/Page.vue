<template lang='pug'>
    
    div#page( class='block' )
        h1( class='page-title' ) {{ title }}

        div( class='list' )
            template( v-for='work in list' )
                Work( v-bind='{ work }' ref='work' @remove='remove' )

            div( class='work add-work' ref='create' @click='goCreate' )
                span( class='add-icon' ) +
                span( class='add-text' ) Создать

        div( class='confirm full' v-if='confirm' )
            div( class='confirm-box' )
                p( class='confirm-text' ) Вы действительно хотите удалить
                p( class='confirm-work' ) {{ confirm }}
                    span( class='confirm-ask' ) ?

                div( class='controls' )
                    button( class='button blue' v-bind='{ disabled }' @click='confirm = false' )
                        span Сохранить

                    button( class='button red' v-bind='{ disabled }' @click='trash' )
                        span Удалить


</template>

<script>
import Work from ':src/admin/component/Page/Work.vue'

export default {
    components: { Work },
    computed: { title, page },
    methods: { goCreate, remove, trash },
    beforeMount: check,
    mounted: start,
    data: function () {
        return {
            indexToRemove: 0,
            temp: false,
            disabled: false,
            confirm: false,
            list: this.list || []
        }
    }
}

// computed
function title () {
    for ( let p of this.$store.state.menu ) {
        if ( p.id === this.page )
            return p.title
    }
}

function page () {
    return this.$route.params.page
}

// methods
function goCreate () {
    this.$router.push(`/create/${ this.page }`)
}

function remove (index) {
    this.indexToRemove = index
    this.confirm = 'Евдокия'
}

async function trash () {
    await this.api(`/remove?id=${ this.indexToRemove }`)
    location.reload()
}

// before mount
async function check () {
    var available = 'first|second|third|fourth'.split('|')

    if ( available.includes(this.page) === false )
        this.$router.push('/not-found')

    return this.list = await this.api(`/list?parent=${ this.page }`)
}

// mounted
function start () {
    this.$watch('list', value => {
        if ( this.$refs.create.classList.contains('visible') )
            this.$refs.create.classList.remove('visible')


        if ( value.length > 0 ) {
            this.$nextTick(() => {
                this.$refs.work.forEach((work, index) => {
                    setTimeout(work.show, index * 25)
                })  
            })

            setTimeout(() => {
                this.$refs.create.classList.add('visible')
            }, this.$refs.work.length * 25)
        }

        this.$refs.create.classList.add('visible')
    })
}
</script>

<style lang='stylus'>

#page
    padding 16px 0

    .page-title
        margin 16px

    .list
        align-items flex-start
        display flex
        flex-wrap wrap
        width 100%

    .add-work
        cursor pointer
        padding 32px 0 52px 0

        .add-icon
            color #1ABC9C
            display block
            font-size 128px
            position relative
            text-align center
            top 28px

        .add-text
            color #FFF
            display block
            font-size 24px
            margin 16px 0
            opacity 0
            position relative
            text-align center
            top 32px

    .add-work:hover
        background #1ABC9C

        .add-icon
            color #FFF
            top 16px

        .add-text
            opacity 1
            top 8px

#page .confirm
    align-items center
    background RGBA(0, 0, 0, .6)
    display flex
    justify-content center
    position fixed
    z-index 5

    .confirm-box
        background #FFF
        border-radius 5px
        box-shadow 0 20px 50px #000
        padding 32px 0 16px 0
        text-align center
        width 600px

    .confirm-text
        font-size 24px

    .confirm-work
        font-size 24px
        font-weight bold
        margin 8px 0

    .confirm-ask
        font-weight normal

    .controls
        display flex
        justify-content space-around
        margin 32px auto 16px auto
        width 400px

        .button
            background #EEE
            border 1px solid #DDD
            border-radius 5px
            cursor pointer
            font-size 24px
            outline none
            padding 18px 32px
            &.blue:hover
                background #3498DB
                border-color #2980B9
                color #FFF
            &.red:hover
                background #E74C3C
                border-color #C0392B
                color #FFF

            span
                transition none
</style>