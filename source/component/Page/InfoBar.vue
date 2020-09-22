<template lang='pug'>
    
    div( v-if='work !== false' class='infobar' )
        h3( class='info-title' ) {{ work.title[lang] }}
        div( class='decorator' )

        div( class='infos-div' )

            div( class='left-info' )
                p( v-if='lang === "ru"' class='meta white' ) Год производства: {{ work.year }}
                p( v-if='lang === "en"' class='meta white' ) Production year: {{ work.year }}

                p( v-if='lang === "ru"' class='meta white' ) Страна: {{ work.country[lang] }}
                p( v-if='lang === "en"' class='meta white' ) Country: {{ work.country[lang] }}

                p( v-if='lang === "ru"' class='meta white' ) Жанр: {{ work.genres[lang] }}
                p( v-if='lang === "en"' class='meta white' ) Genre: {{ work.genres[lang] }}

                div( class='dashes' )

                p( class='meta' )
                    template( v-for='meta in work.metas' )
                        span( class='meta-key' ) {{ meta[lang].key }}:
                        span( class='meta-value' ) {{ meta[lang].value }}

            div( class='right-info' )
                p( v-if='lang === "ru"' class='meta-key-actors' ) В главных ролях:
                p( v-if='lang === "en"' class='meta-key-actors' ) Starring:

                template( v-for='actor in work.actors' )
                    p( class='meta-value' ) {{ actor[lang] }}



</template>

<script>
export default {
    props: ['list', 'openedId'],
    computed: { lang, work, basic },
    mounted: function () {
        this.$watch('openedId', console.log)
    }
}

function lang () {
    return this.$store.state.lang
}

function work () {
    if ( isNaN(parseInt(this.openedId)) )
        return false
    
    console.log('qwe', this.list[this.openedId/5|0][this.openedId%5])
    return this.list[this.openedId/5|0][this.openedId%5]
}

function basic () {

}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#page .infobar
    background $dark
    padding 95px 0 0 70px
    opacity 0
    overflow hidden
    position absolute
    bottom 0
    top 0
    right 0
    width 0

    .info-title
        color $default
        font-family 'Nocturne Serif', serif
        font-size 48px
        font-weight normal

    .infos-div
        align-items top
        display flex
        justify-content space-between

    .left-info, .right-info
        display inline-block
        width 340px

    .right-info
        font-size 24px

    .decorator
        background url('~src/assets/img/page/decorator.png')
        height 20px
        margin 64px 0 72px 0

    .dashes
        border-top 1px dashed $default
        margin 24px 0

    .meta
        color $default
        font-size 22px
        font-weight 500
        margin 2px 0

        &.white
            color #FFF

    .meta-key
        color $default
        display inline-block
        margin-right 6px

    .meta-key-actors
        color $default
        font-size 24px
        font-weight 500
        margin 2px 0

    .meta-value
        color $default
        font-size inherit
        font-weight 300
        margin 2px 0


#page .infobar.show
    opacity 1
    width 800px

#body.hide-blocks .infobar
    opacity 0
</style>