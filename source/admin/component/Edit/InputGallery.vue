<template lang='pug'>
    
    div( class='label' )
        span( class='label-text' ) Кадры из фильма:

        div( class='gallery' )
            template( v-for='image in files' )
                div( class='image-div' :class='{ delete: image.delete }' )
                    img( class='image' :src='image.src' )

                    div( class='icon-div' @click='toggle(image)' )
                        img( v-if='image.delete' class='icon' src='img/work/restore.png' title='Вернуть' )
                        img( v-else class='icon' src='img/work/trash.png' title='Удалить' )

            div( class='add-image' @click='upload' ) +

</template>

<script>
export default {
    props: ['value'],
    methods: { update, upload, toggle },
    data: function () {
        return {
            files: this.value || [],
        }
    }
}

// methods
function update () {
    this.files = [...this.files]
    this.$emit('input', this.files)
}

function upload (event) {
    var input = createInput()
    
    input.click()
    input.addEventListener('change', () => {
        for ( let i = 0; i != input.files.length; ++i ) {
            let file = input.files[i]
            let url = URL.createObjectURL(file)
            
            this.files.push({
                id: Date.now().toString(36),
                created: true,
                upload: true,
                src: url,
                file: file
            })
        }

        return this.update()
    })
}

function toggle (image) {
    for ( let item of this.files ) {
        if ( item.id === image.id ) {
            if ( image.created )
                item.upload = !item.upload

            item.delete = !item.delete
            return this.update()
        }
    }
}

// helper functions
function createInput () {
    var input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('multiple', true)

    return input

}
</script>

<style lang='stylus'>

#edit .gallery
    align-items center
    display flex
    flex-wrap wrap
    margin-top 6px
    width 120%

    .image-div
        border-radius 5px
        display block
        margin-bottom 12px
        margin-right 12px
        overflow hidden
        position relative
        height 120px
        &.delete .image
            opacity .5
        &:hover .icon-div
            opacity 1 !important

    .icon-div
        align-items center
        background RGBA(255, 255, 255, .85)
        cursor pointer
        display flex
        justify-content center
        opacity 0
        position absolute
        top 0
        right 0
        height 30px
        width 30px

        .icon
            width 15px

    .image
        height 100%

    .add-image
        align-items center
        border 2px dashed #DDD
        border-radius 5px
        color #CCC
        cursor pointer
        display flex
        font-size 52px
        justify-content center
        margin-bottom 12px
        margin-right 12px
        height 120px
        width 180px
        &:hover
            border-color #AAA
            color #777
</style>