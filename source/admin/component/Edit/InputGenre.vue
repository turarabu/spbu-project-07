<template lang='pug'>
    
    div( class='label' )
        span( class='label-text' ) Жанр:
        
        input( class='input' placeholder='На русском' v-model='input.ru' )
        input( class='input' placeholder='На английском' v-model='input.en' )

</template>

<script>
export default {
    props: ['value'],
    mounted: start,
    data: function () {
        return {
            input: this.value || {
                en: '',
                ru: ''
            }
        }
    }
}

function start () {
    this.$watch('input', value => {
        this.$emit('input', value)
    })
}
</script>