<template lang='pug'>
    
    div#edit( class='block' )
        template( v-if='loaded' )
            h1( class='title' ) Редактирование {{ work.title.ru }}

            InputTitle(  v-model='work.title' )
            InputYear(  v-model='work.year' )
            InputGenre(  v-model='work.genres' )
            InputCountry(  v-model='work.country' )

            InputGallery(  v-model='work.gallery' )

            div( class='label-flex' )
                InputVideo(  v-model='work.video' )
                InputPoster(  v-model='work.poster' )

            InputMetas(  v-model='work.metas' )
            InputActors(  v-model='work.actors' )

        div( class='save-div' )
            button( v-if='disabled' class='button wait' ) Подождите...
            button( v-else class='button' @click='save' ) Сохранить

</template>

<script>

import InputTitle from ':src/admin/component/Edit/InputTitle.vue'
import InputYear from ':src/admin/component/Edit/InputYear.vue'
import InputGenre from ':src/admin/component/Edit/InputGenre.vue'
import InputCountry from ':src/admin/component/Edit/InputCountry.vue'
import InputGallery from ':src/admin/component/Edit/InputGallery.vue'
import InputVideo from ':src/admin/component/Edit/InputVideo.vue'
import InputPoster from ':src/admin/component/Edit/InputPoster.vue'
import InputMetas from ':src/admin/component/Edit/InputMetas.vue'
import InputActors from ':src/admin/component/Edit/InputActors.vue'

export default {
    beforeCreate: init,
    components: { InputTitle, InputYear, InputGenre,
        InputCountry, InputGallery, InputVideo,
        InputPoster, InputMetas, InputActors },

    methods: { save,
        uploadData, uploadVideo, uploadPoster, uploadGallery,
        pushImage, removeImage },

    data: function () {
        return {
            disabled: false,
            loaded: !(this.work === undefined),
            work: this.work || this.$store.state.default
        }
    }
}

// beforeCreate
async function init () {
    console.log(this.$route.params.index)
    var index = this.$route.params.index

    this.work = await this.api(`/get?id=${ index }`)
    this.loaded = true
}

// methods
async function save () {
    this.disabled = true

    var { metas, actors, year, genres, country, title } = this.work
    var data = { metas, actors, year, genres, country, title }

    await this.uploadData(data)

    if ( this.work.video && this.work.video.upload ) {
        console.log('uploading video')
        await this.uploadVideo(this.work.video)
    }

    if ( this.work.poster && this.work.poster.upload ) {
        console.log('uploading poster')
        await this.uploadPoster(this.work.poster)
    }

    if ( this.work.gallery && this.work.gallery.length > 0 ) {
        console.log('uploading gallery')
        await this.uploadGallery(this.work.gallery)
    }
    
    this.disabled = false
    this.$router.push(`/page/${ this.work.parent }`)
}

async function uploadData (data) {
    await this.api(`/edit?id=${ this.work.id }`, data)
}

async function uploadVideo (video) {
    await this.api.upload(`/video?id=${ this.work.id }`, video.file)
}

async function uploadPoster (poster) {
    await this.api.upload(`/poster?id=${ this.work.id }`, poster.file)
}

async function uploadGallery (gallery) {
    for ( let image of gallery ) {
        if ( image.created && image.upload )
            await this.pushImage(image.file)

        if ( !image.created && image.delete )
            await this.removeImage(image.id)
    }
}

async function pushImage (file) {
    await this.api.upload(`/push-gallery?id=${ this.work.id }`, file)
}

async function removeImage (id) {
    await this.api(`/remove-gallery?id=${ this.work.id }&img=${ id }`)
}
</script>

<style lang='stylus'>

#edit
    padding 32px 16px

    .title
        font-size 28px
        margin-bottom 20px

    .label
        border-bottom 1px solid #E0E0E0
        padding 16px 0
        width 825px
        &.long
            width 100%

        .label-text
            display block
            font-size 18px
            font-weight bold
            padding 4px 12px

        .input
            background #ecf0f1
            border 1px solid #ecf0f1
            border-radius 5px
            display inline-block
            font-size 24px
            margin-right 20px
            outline none
            padding 12px 14px
            width 400px
            &:last-child
                margin-right 0
            &:focus
                border-color lighten(#3498DB, 10)

    

    .label-flex
        align-items flex-start
        border-bottom 1px solid #E0E0E0
        display flex
        justify-content space-between

        .label
            border-bottom none
            overflow hidden
            width calc(50% - 20px)


    .button
        background #1abc9c
        border none
        border-radius 5px
        color #ecf0f1
        cursor pointer
        font-size 18px
        margin 12px 0
        outline none
        padding 12px 16px

    .save-div
        padding 16px
        text-align right

        .button
            background #3498db
            color #FFF
            font-size 24px
            padding 18px 28px
            &.wait
                background lighten(#3498db, 15)
                cursor default
</style>