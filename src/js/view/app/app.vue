<template>
    <h1>{{app}}</h1>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "app",
        data(){
            return {
                app:"hello world"
            }
        },
        computed: mapState({
        }),
    }
</script>

<style>

</style>