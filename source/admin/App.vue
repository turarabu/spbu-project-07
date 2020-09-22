<template lang='pug'>
    
    body#body( class='full' )
        div#content

            div#back( v-if='showBack' @click='back' )
                img( class='back-icon' src='img/back.png' )
                span( class='back-text' ) Назад

            router-view

            div#footer
                p( class='footer-text block' )
                    span Created by
                    a( class='link' target='_blank' href='https://t.me/iamtaru' ) Taru
</template>

<script>

export default {
    computed: { showBack },
    methods: { back },
    data: function () {
        window.body.addEventListener('touchstart', console.log)
        window.body.addEventListener('touchmove', console.log)
        window.body.addEventListener('touchend', console.log)

        return {
            
        }
    }
}

//computed
function showBack () {
    return !(this.$route.name === 'Main')
}

// methods
function back () {
    if ( this.$route.name === 'Page' )
        this.$router.push('/')

    else this.$router.back()
}

</script>

<style lang='stylus'>
@import '~src/admin/style/base'

#body
    overflow auto

#content
    padding-bottom 120px
    position relative
    min-height 100%
    min-width 100%

#back
    cursor pointer
    padding 24px 0
    position fixed
    text-align center
    top 0
    left 0
    height 150px
    width 125px
    &:hover
        background #EEE
        

    .back-icon
        margin 12px 0
        position relative
        transform scale(-1, 1)
        width 50px
        z-index 2

    .back-text
        display block
        font-size 16px
        letter-spacing 1px
        position relative
        z-index 2


#footer
    background #2C3E50
    padding 20px 0 16px 0
    position absolute
    bottom 0
    width 100%
    z-index 3

    .footer-text
        color #ECF0F1
        font-size 18px
        text-align right

        .link
            color #3498DB
            cursor pointer
            display inline-block
            margin 0 6px
            text-decoration none
            &:hover
                text-decoration underline
</style>