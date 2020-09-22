<template lang='pug'>
    
    div#main( class='full' )
        template( v-for='link in menu' )
            router-link( tag='div' class='link' :to='link.url' )
                p( class='link-title' ) {{ link.title }}

</template>

<script>
export default {
    computed: { menu }
}

function menu () {
    return this.$store.state.menu
}
</script>

<style lang='stylus'>
#main
    align-items center
    display flex
    justify-content center

    .link
        background #DDD
        border-radius 5px
        box-shadow 0 2px 5px RGBA(75, 75, 75, .4)
        cursor pointer
        margin 0 16px
        padding 24px
        text-align center
        width 210px
        &:hover
            background #C0C0C0


    .link-title
        font-size 20px

</style>