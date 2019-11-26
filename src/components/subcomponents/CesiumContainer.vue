<template>
    <!-- Cesium容器 -->
    <div class="viewer">
        <cesium-viewer @ready="ready" ref="cesium"> </cesium-viewer>
    </div>

</template>

<script>
    // 导入自己封装的子组件

    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {
            ready (param) {
//                console.log(this);
                console.log('cesium');
                console.log(this.$refs.cesium)
                console.log(this.$refs.cesium.Cesium.version)
//
                var cesium = this.$refs.cesium;
                var camera = this.$refs.cesium.camera;
                console.log(camera);
                camera.position.longitude = 116.46;
                camera.position.latitude = 39.92;
                camera.position.height = 10000000
//                cesium.viewer.imageryProvider = Cesium.createTileMapServiceImageryProvider({
//                    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
//                })

//                cesium.viewer = new Cesium.Viewer('cesiumContainer', {
//                    imageryProvider: Cesium.createTileMapServiceImageryProvider({
//                        url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
//
//                    }),
////                    baseLayerPicker: false
//                });
            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .viewer {
        width: 100%;
        height: 100%;
    }
</style>
