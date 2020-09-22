<template lang='pug'>
    
    div( class='label' )
        span( class='label-text' ) Год:
        input( class='input' placeholder='Введите' v-model='input' )

</template>

<script>
export default {
    props: ['value'],
    mounted: start,
    data: function () {
        console.log(this.value)
        return {
            input: this.value || ''
        }
    }
}

function start () {
    this.$watch('input', value => {
        this.$emit('input', value)
    })
}
</script>