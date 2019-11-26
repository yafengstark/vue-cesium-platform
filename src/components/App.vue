<template>
    <div class="app-container">


        <div class="menu">
            <Menu mode="horizontal" class="app-menu" >
                <!--<MenuItem name="0">-->

                    <!--<router-link tag="span" to="/">-->
                        <!--<Icon type="ios-paper"/>-->
                        <!--数字地球平台-->
                    <!--</router-link>-->
                <!--</MenuItem>-->

                <MenuItem name="1">



                    <router-link tag="span" to="/start">
                        <Icon type="ios-paper"/>
                        开始
                    </router-link>


                </MenuItem>
                <MenuItem name="2">


                    <router-link tag="span" to="/view">
                        <Icon type="ios-paper"/>
                        视角
                    </router-link>

                </MenuItem>
                <MenuItem name="3">


                    <router-link tag="span" to="/meature">
                        <Icon type="ios-paper"/>
                        量测
                    </router-link>


                </MenuItem>
                <MenuItem name="11">

                    <router-link tag="span" to="/terrain">
                        <Icon type="ios-paper"/>
                        地形
                    </router-link>


                </MenuItem>
                <MenuItem name="4">


                    <router-link tag="span" to="/model">
                        <Icon type="ios-paper"/>
                        三维
                    </router-link>

                </MenuItem>
                <MenuItem name="5">


                    <router-link tag="span" to="/mark">
                        <Icon type="ios-paper"/>
                        标注
                    </router-link>


                </MenuItem>
                <MenuItem name="7">


                    <router-link tag="span" to="/setting">
                        <Icon type="ios-settings-outline"/>
                        设置
                    </router-link>

                </MenuItem>
            </Menu>
        </div>
        <div class="ribbon">
            <!-- 路由的容器 -->
            <transition class="app-view">
                <router-view></router-view>
            </transition>
        </div>
        <!-- left-->
        <div class="center">

                <div slot="left" class="left">
                    <tabs></tabs>
                </div>
                <div slot="right" class="right">
                    <!-- 地球容器 -->
                    <cesium-container></cesium-container>
                </div>

        </div>
<!-- right-->


    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    import VueCesium from 'vue-cesium'

    import CesiumContainer from './subcomponents/CesiumContainer.vue'

    import Tabs from './Tabs.vue'

    export default {
        data() {
            return {
                flag: true, // 默认显示返回按钮
                split1: 0.4
            };
        },
        methods: {
            goBack() {
                // 点击返回按钮，向后跳转
                this.$router.go(-1);
                console.log(this);
            },

        },
        created() {
            if (this.$route.path === "/home") {
                this.flag = false;
            } else {
                this.flag = true;
            }
//            console.log(this.$store.state);
//            this.$store.dispatch('setCesiumInstance');
//            console.log(this.$store.state.cesiumInstance);
            console.log('version' + VueCesium.version)
        },
        watch: {
            // 当页面刷新的时候，不会触发 watch 中监听的 路由地址的变化
            "$route.path": function (newVal, oldVal) {
                if (newVal === "/home") {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            }
        },
        computed: {
            ...mapGetters(["totalcount"])
        },
        components: {
            CesiumContainer,
            Tabs
        }
    };
</script>

// 这里写的样式，要符合 scss 语法，并且，样式是 当前组件私有的，不会成为全局的样式，也不会应用给子组件
// 取消scope
<style lang="scss">

    html, body {
        width: 100%;
        height: 100%;
    }

    .app-container {
        width: 100%;
        height: 100%;

        .menu {
            .app-menu{
                display: flex;
                li {
                    flex-grow: 1;
                }
            }

        }
        .ribbon{
            height: 80px;
        }
        .center {
            display: flex;
            flex-direction: row;
            height: 100%;
            .left{
                flex-grow: 0;
                width: 300px;

            }
            .right{
                flex-grow: 1;
            }
        }
    }

    // 动画效果相关的类样式
    .v-enter {
        opacity: 0;
        // 让即将进入的页面，向右偏移 100% 屏幕的宽度
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        // 让即将进入的页面，向右偏移 100% 屏幕的宽度
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.4s ease;
    }


</style>
