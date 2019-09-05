<template>
    <!-- Cesium容器 -->
    <div class="viewer">
        <cesium-viewer @ready="ready" ref="cesium"> </cesium-viewer>
        <!--地球容器（开发阶段一注释掉）-->
    </div>



    </template>

    <script>
        
        export default {
            data() {
                return {};
            },
            created() {

            },
            methods: {
                ready (param) {
                    //                console.log(this);
					//获取Vue-Cesuim传过来的对象
					//param.Cesium; 
					//param.viewer;
					window.g_viewer = param.viewer;
                    console.log('cesium'); //debugger;
                    
                    var cesium = this.$refs.cesium;
                    var camera = this.$refs.cesium.camera;
                    console.log(camera);
                    camera.position.longitude = 116.46;
                    camera.position.latitude = 39.92;
                    camera.position.height = 10000000
    //                cesium.viewer.imageryProvider = Cesium.createTileMapServiceImageryProvider({
    //                    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    //                })
					//vue-cesuim已经包含了该功能，不需要
                    //cesium.viewer = new Cesium.Viewer('cesiumContainer', {
                    //    imageryProvider: Cesium.createTileMapServiceImageryProvider({
                    //        url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')

                     //   }),
    //                    baseLayerPicker: false
                    //});
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
