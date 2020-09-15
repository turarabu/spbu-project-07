<template lang='pug'>
    
    div( class='infobar' )
        h3( class='info-title' ) Евдокия
        div( class='decorator' )

        div( class='infos-div' )

            div( class='left-info' )
                p( class='meta white' ) Год производства: 1961
                p( class='meta white' ) Страна: СССР
                p( class='meta white' ) Жанр: Драма

                div( class='dashes' )

                p( class='meta' )
                    span( class='meta-key' ) Режисёр:
                    span( class='meta-value' ) Татьяна Лиознова

                p( class='meta' )
                    span( class='meta-key' ) Сценарий:
                    span( class='meta-value' ) Вера Панова

                p( class='meta' )
                    span( class='meta-key' ) Директор фильма:
                    span( class='meta-value' ) Борис Краковский

                p( class='meta' )
                    span( class='meta-key' ) Оператор: 
                    span( class='meta-value' ) Петр Катаев, Жозеф Мартов

                p( class='meta' )
                    span( class='meta-key' ) Композитор: 
                    span( class='meta-value' ) Леонил Афансьев

                p( class='meta' )
                    span( class='meta-key' ) Художник: 
                    span( class='meta-value' ) Борис Дуленков, Александр Вагичев, Л. Душина

                p( class='meta' )
                    span( class='meta-key' ) Монтаж: 
                    span( class='meta-value' ) Евгения Абдиркина, Вера Васильева

            div( class='right-info' )
                p( class='meta-key-actors' ) В главных ролях:
                p( class='meta-value' ) Людмила Хитяева
                p( class='meta-value' ) Николай Лебедев
                p( class='meta-value' ) Юрий Ахмадулин
                p( class='meta-value' ) Вера Алтайская
                p( class='meta-value' ) Евгений Ануфриев
                p( class='meta-value' ) Айрат Арсланов
                p( class='meta-value' ) Александр Барсов
                p( class='meta-value' ) Люба Басова
                p( class='meta-value' ) Валентина Беляева
                p( class='meta-value' ) Леонид Давыдов-Субоч



</template>

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