<template lang='pug'>
    
    div( class='work' :class='{ visible }' )
        img( class='work-poster' :src='work.poster' )
        p( class='work-title' ) {{ work.title.ru }}

        div( class='work-controls' )
            div( class='button' @click='edit' )
                img( class='button-icon' src='img/work/edit.png' )

            div( class='button' @click='remove' )
                img( class='button-icon' src='img/work/trash.png' )

</template>

<script>
export default {
    props: ['work'],
    computed: { index },
    methods: { edit, remove, show },
    data: function () {
        return {
            visible: false
        }
    }
}

// computed
function index () {
    return this.work.id
}

// methods
function edit () {
    this.$router.push(`/edit/${ this.index }`)
}

function remove () {
    this.$emit('remove', this.index)
}

function show () {
    this.visible = true
}
</script>

<style lang='stylus'>

#page .work
    border-radius 5px 5px 4px 4px
    box-shadow 0 2px 5px RGBA(100, 100, 100, .5)
    margin 16px
    opacity 0
    overflow hidden
    position relative
    top -50px
    width 250px
    &.visible
        opacity 1
        top 0

    .work-poster
        width 100%

    .work-title
        font-size 18px
        padding 16px 14px

    .work-controls
        border-top 1px solid #CCC
        display flex
        justify-content space-between

    .button
        align-items center
        cursor pointer
        display flex
        flex-direction column
        justify-content center
        padding 28px
        width 50%
        &:hover
            background #E0E0E0

    .button-icon
        height 30px
</style>