<template lang='pug'>
    
    div( class='label long' )
        span( class='label-text' ) Мета информация:

        div( class='metas-box first' )
            div( class='side' )
                h3( class='side-text' ) На русском

            div( class='side' )
                h3( class='side-text' ) На английском

        div( v-for='(meta, index) in input' class='metas-box' )
            div( class='side' )
                input( class='meta-input' placeholder='Ключ' v-model='meta.ru.key' )
                input( class='meta-input value' placeholder='Значение' v-model='meta.ru.value' )

            div( class='side' )
                input( class='meta-input' placeholder='Ключ' v-model='meta.en.key' )
                input( class='meta-input value' placeholder='Значение' v-model='meta.en.value' )

            img( class='delete' src='img/work/trash.png' @click='remove(index)' )

        button( class='button meta-button' @click='create' ) Добавить мета-информацию

</template>

<script>
export default {
    props: ['value'],
    methods: { create, remove, update },
    data: function () {
        return {
            input: this.value || []
        }
    }
}

function create () {
    var key = ''
    var value = ''

    this.input.push({
        en: { key, value },
        ru: { key, value }
    })

    this.update()
}

function remove (index) {
    this.input.splice(index, 1)
    this.update()
}

function update () {
    this.input = [...this.input]
    this.$emit('input', this.input)
}
</script>

<style lang='stylus'>

#edit .meta-button
    display inline-block
    margin 16px 14px !important

#edit .metas-box
    align-items top
    display flex
    justify-content space-between
    padding 18px 16px
    position relative
    width 100%
    &:hover
        background RGBA(50, 50, 50, .025)
    &.first
        background #fff
        margin-top 18px
        padding 0 16px

    .side
        width calc(50% - 20px)

    .side-text
        font-size 16px

    .meta-input
        background #ecf0f1
        border 1px solid darken(#ecf0f1, 15)
        border-radius 5px
        display inline-block
        font-size 20px
        margin-right 20px
        outline none
        padding 12px 14px
        width 200px
        &.value
            margin-right 0
            width 375px
        &:focus
            border-color lighten(#3498DB, 0)

    .delete
        cursor pointer
        position absolute
        right 25px
        top calc(50% - 15px)
        width 15px
</style>