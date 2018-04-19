<template>
    <div>
        <h1>{{app.app}}</h1>
        <button @click="changeTitle">修改标签</button>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "app",
        data(){
            return {

            }
        },
        computed: mapState({
            app:state=>state.app,
        }),
        methods:{...mapActions([
            "appChange",
            ]),
            changeTitle(){
                this.appChange(`你要叫我来呀，哪个犊子不愿意来啊`);
            }
        },
        created: function () {
            // `this` 指向 vm 实例
            let spead = {a:1,b:2,c:3};
            let newSpead = {...spead};
            console.log(this)
        }
    }
</script>

<style>

</style>