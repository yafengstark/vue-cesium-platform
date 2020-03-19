<template>
    <div>

        <!--在线标注-->
      <Button @click="hideIt">隐藏</Button>
        在线标注

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {mapActions, mapState} from 'vuex'


    import ISwitch from "../../../node_modules/iview/src/components/switch/switch.vue";

    export default {
        data() {
            return {
                layerList: [
                    {name: '必应地图', show: false,}
                ]

            };
        },
        computed: {
            ...mapState(['isGraphicsWorkspaceShow']),

        },
        created() {
            // 选择显示

        },
        methods: {
            async getlunbotu() {
                // 获取轮播图的方法
                const {data} = await this.$http.get("/getlunbo");
                if (data.status === 200) this.lunbotu = data.result;
            },
            changeShow(layer){
                console.log(layer);
            },
            hideIt(){

                console.log('点击了隐藏')

                this.$store.commit('setGraphicsWorkspaceViz', {show: false});


            }
        },
        components: {
            ISwitch
            // 注册子组件


        },

    };
</script>

<style lang="scss" scoped>
    .layer {
        background-color: #f6f6f6;
        border-width: 0.001px;
        border-color: #e2e2e2;
        /*border: solid;*/
    }

    .exist {

    }

    .not-exist {
        display: none;
    }


</style>
