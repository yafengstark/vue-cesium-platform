<template>
    <div class="header-container">
        <div class="layer-header">
            <span class="title">&nbsp;&nbsp;{{ title }}</span>
            <span><Button type="text" @click="close"><Icon type="ios-close" /></Button></span>
        </div>
        <hr>
    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件



    export default {
        data() {
            return {

            };
        },
        props: ["title"],
        methods: {
            close(){
                // 点击了关闭
                this.$store.commit("setIsHandleShow", false);
                //
                this.$router.push("/");

            }
        },
        computed: {
        }
    };
</script>

<style lang="scss" scoped>

    .layer-header {
        width: 200px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        text-align: center;
        vertical-align:50%;
        button {
            padding: 3px;
            font-size: 15px;
        }
        .title {
            padding: 5px;
        }

    }



</style>
