<template lang='pug'>
    
    div( class='label long' )
        span( class='label-text' ) Актёрский состав:

        div( class='metas-box first' )
            div( class='side' )
                h3( class='side-text' ) На русском

            div( class='side' )
                h3( class='side-text' ) На английском

        div( v-for='(meta, index) in input' class='metas-box' )
            div( class='side' )
                input( class='meta-input actor' placeholder='Имя актёра' v-model='meta.ru' )

            div( class='side' )
                input( class='meta-input actor' placeholder='Имя актёра' v-model='meta.en' )

            img( class='delete' src='img/work/trash.png' @click='remove(index)' )

        button( class='button meta-button' @click='create' ) Добавить актёра

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
    this.input.push({
        en: '',
        ru: ''
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

#edit .meta-input.actor
    width 92%
</style>