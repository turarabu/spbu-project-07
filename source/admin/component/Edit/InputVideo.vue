<template lang='pug'>
    
    div( class='label' )
        span( class='label-text' ) Видео:

        button( class='upload-video' @click='upload' ) Загрузить видео

        div( class='video-div' )
            video( class='video' :src='video' controls )
        

</template>

<script>
export default {
    props: ['value'],
    computed: { video },
    methods: { upload },
    data: function () {
        return {
            input: {
                upload: false,
                file: false,
                src: ""
            }
        }
    }
}

// computed
function video () {
    if ( this.input.upload )
        return this.input.src

    return this.value
}

// methods
function upload () {
    var input = createInput()

    input.click()
    input.addEventListener('change', () => {
        var file = input.files[0]
        var src = URL.createObjectURL(file)

        this.input = {
            file: file,
            src: src,
            upload: true
        }

        return this.$emit('input', this.input)
    })
}

// helper functions
function createInput () {
    var input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'video/*')

    return input
}
</script>

<style lang='stylus'>

#edit

    .upload-video
        background #1abc9c
        border none
        border-radius 5px
        color #ecf0f1
        cursor pointer
        font-size 18px
        margin 12px 0
        outline none
        padding 12px 16px

    .video-div
        overflow hidden
        height 420px
        max-width 100%

        .video
            background #000
            border-radius 5px
            height 100%
            max-width 100%
</style>