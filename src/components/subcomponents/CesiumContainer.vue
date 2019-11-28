<template>
    <!-- Cesium容器 -->
    <div class="viewer">
        <!-- -->
        <cesium-viewer
                @ready="ready"
                :animation="animation"
                :timeline="timeline"
                :baseLayerPicker="baseLayerPicker"
                :fullscreenButton="fullscreenButton"
                :infoBox="infoBox"
                :vrButton="vrButton"
                :geocoder="geocoder"
                :homeButton="homeButton"
                :automaticallyTrackDataSourceClocks="automaticallyTrackDataSourceClocks"
                ref="cesium"
        > </cesium-viewer>
    </div>

</template>

<script>
    // 导入自己封装的子组件

    export default {
        data() {
            return {
                camera: {
                    position: {
                        lng: 104.06,
                        lat: 30.67,
                        height: 2000
                    },
                    heading: 360,
                    pitch: -90,
                    roll: 0
                },
                animation: true,
                timeline: true,
                baseLayerPicker: true,
                fullscreenButton: true,
                infoBox: true,
                vrButton: true,
                geocoder: true,
                homeButton: true,
                automaticallyTrackDataSourceClocks: true
            };
        },
        created() {

        },
        methods: {
            /**
             * viewer 组件渲染完毕时触发，返回一个 Cesium 的核心类和 viewer 实例。该项目组件是异步加载，
             * 请不要尝试在组件的生命周期中访问 Cesium 核心类和 viewer 实例，如有需要，请在所需组件的 ready 事件回调函数的参数中获取。
             * @param cesiumInstance
             */
            ready (cesiumInstance) {
//                console.log(this);

                const { Cesium, viewer } = cesiumInstance;
                // 在这儿获取Cesium和viewer实例，再执行相关逻辑代码
//                this.camera.position.lng = 116.46
//                this.camera.position.lat = 39.92
//                this.camera.position.height = 50
//                this.animation = true


                this.$store.state.myMap.viewer = viewer;

                this.$store.state.myMap.Cesium = Cesium;
//                初始位置

                viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000000.0)
                });

//                viewer.scene.camera = this.camera;

                console.log('cesium------');
                console.log(this.$refs.cesium)
//                console.log(this.$refs.cesium.Cesium.version)
//
                var camera = this.$refs.cesium.camera;
                console.log(camera);
//                var camera = this.$refs.cesium.camera;
//                console.log(camera);
//                camera.position.longitude = 116.46;
//                camera.position.latitude = 39.92;
//                camera.position.height = 10000000
////            const { Cesium, viewer } = cesiumInstance
//                // 在这儿获取Cesium和viewer实例，再执行相关逻辑代码
//                this.camera.position.lng = 116.46
//                this.camera.position.lat = 39.92
//                this.camera.position.height = 500
//                this.animation = true
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
        background: #4488bb;
    }
</style>
