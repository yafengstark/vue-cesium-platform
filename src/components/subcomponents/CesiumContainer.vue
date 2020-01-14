

<template>
    <!--地球容器（开发阶段一注释掉）-->
    <div class="viewer" ref="viewerContainer">
        <vc-viewer ref="vcViewer"
                   @ready="ready" @changed="changed"
                   :timeline="timeline"
                   :animation="animation">
            <vc-navigation :options="options"></vc-navigation>

            <vc-layer-imagery>
                <vc-provider-imagery-tianditu mapStyle="img_c" :token="tk"></vc-provider-imagery-tianditu>
            </vc-layer-imagery>

            <vc-layer-imagery>
                <vc-provider-imagery-arcgis-mapserver :url="url"></vc-provider-imagery-arcgis-mapserver>
            </vc-layer-imagery>

            <vc-layer-imagery>
                <vc-provider-imagery-arcgis-mapserver :url="url_city"></vc-provider-imagery-arcgis-mapserver>
            </vc-layer-imagery>

            <vc-layer-imagery>
                <vc-provider-imagery-arcgis-mapserver :url="url_city_label"></vc-provider-imagery-arcgis-mapserver>
            </vc-layer-imagery>

            <vc-layer-imagery>
                <vc-provider-imagery-arcgis-mapserver :url="url_zj_img"></vc-provider-imagery-arcgis-mapserver>
            </vc-layer-imagery>


            <!--<vc-layer-imagery>
        <vc-provider-imagery-tianditu mapStyle="cva_c" :token="tk"></vc-provider-imagery-tianditu>
    </vc-layer-imagery>-->

        </vc-viewer>

    </div>



</template>

<script>

    export default {
        data() {
            return {
                camera: {
                    position: {
                        longitude: 104.06,
                        latitude: 30.67,
                        height: 11560000
                    },
                    heading: 360,
                    pitch: -90,
                    roll: 0
                },
                animation: false,
                timeline: false,
                tk: '436ce7e50d27eede2f2929307e6b33c0',

                options: {
                  enableCompass: true,
                  enableZoomControl: true,
                  // enableZoomControl: {
                  //   // 缩放比例
                  //   zoomAmount: 2,
                  //   // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是经纬度{lng: number, lat: number, height: number}或者 rectangle{west: number,south: number,east: number,north: number}
                  //   defaultResetView: {
                  //     lng: 105, lat: 29.999999999999993, height: 19059568.497290563
                  //   }
                  // },
                  enableDistanceLegend: true,
                  enableLocationBar: true,
                  // enableLocationBar: {
                  //   // 获取更精确的高程
                  //   gridFileUrl: 'https://zouyaoji.top/vue-cesium/statics/SampleData/WW15MGH.DAC'
                  // },
                  enableCompassOuterRing: true,
                  enablePrintView: true,
                  // enablePrintView: {
                  //   // 是否添加 Credit
                  //   showCredit: true,
                  //   // 是否自动打印
                  //   printAutomatically: false
                  // },
                  enableMyLocation: true
                },
                url: 'https://gis.zjgisdev.com/hserver/rest/services//ZJ_BOU_PRO_LN/MapServer', //arcgis 服务
                url_city: 'https://gis.zjgisdev.com/hserver/rest/services/ZJ_BOU_CIT_LN/MapServer',
                url_zj_img: 'https://gis.zjgisdev.com/hserver/rest/services//ZJ_IMG_FULL/MapServer',
                url_city_label:'https://gis.zjgisdev.com/hserver/rest/services/ZJ_RES_CIT_PT/MapServer'
            }
        },

        methods: {
            ready(cesiumInstance) {

                //获取Vue-Cesuim传过来的对象
                //param.Cesium;
                //param.viewer;

                //return;
                const { Cesium, viewer } = cesiumInstance;

                window.g_viewer = viewer;
                console.log('cesium'); //debugger;

                // 在这儿获取Cesium和viewer实例，再执行相关逻辑代码
                //this.camera.position.longitude = 116.46;
                //this.camera.position.latitude = 39.92;
                //this.camera.position.height = 50000;
                this.animation = false;

                //this.$store.dispatch('setCesiumInstance',cesiumInstance);


                //控制倾角范围，大于-0.2时则不倾角
                viewer.scene.screenSpaceCameraController.minimumZoomDistance=100; //距离地形的距离？这个值可以多测试几个值，，我这不太好描述
                var minPitch = -Cesium.Math.PI_OVER_TWO;
                console.log('minPitch:' + minPitch);
                var maxPitch = -0.2;
                var minHeight = 200;

                viewer.camera.changed.addEventListener(
                    function() {
                        if (viewer.camera._suspendTerrainAdjustment && viewer.scene.mode === Cesium.SceneMode.SCENE3D) {
                            viewer.camera._suspendTerrainAdjustment = false;
                            viewer.camera._adjustHeightForTerrain();
                        }
        
                        // Keep camera in a reasonable pitch range
                        var pitch = viewer.camera.pitch;

                        if (pitch > maxPitch || pitch < minPitch) {
                            viewer.scene.screenSpaceCameraController.enableTilt = false;

                            // clamp the pitch
                            if(pitch > maxPitch ) { 
                                pitch = maxPitch; 
                            } else if(pitch < minPitch) {
                                pitch = minPitch;
                            }

                            var destination = Cesium.Cartesian3.fromRadians(
                                viewer.camera.positionCartographic.longitude,
                                viewer.camera.positionCartographic.latitude,
                                Math.max(viewer.camera.positionCartographic.height, minHeight));

                            viewer.camera.setView({
                                destination: destination,
                                orientation: { pitch: pitch }
                            });
                            viewer.scene.screenSpaceCameraController.enableTilt = true;
                        }
                    }
                );
                ///////////////////////////////////////////////控制倾角范围//////////////////////////////////////////////


            },
            changed(percentage) {
                //debugger;
                //return;
                console.log(g_viewer.camera.pitch);

                //这个椭球形就是地球了
                var ellipsoid = g_viewer.scene.globe.ellipsoid;

                // 镜头移动的速率基于镜头离地球的高度
                var cameraHeight = ellipsoid.cartesianToCartographic(g_viewer.camera.position).height;


                return;
                var labels = this.$store.getters.labels;
                var label;
                for (var i = 0; i < labels.length; i++) {
                    label = labels.get(i);
                    //debugger;
                    if (label.POPRANK.getValue() == 1 && label.show) {
                        label.show = false;
                        console.log(label.text);
                    }
                }
                /* if(cameraHeight > 10000000){
                    for(var i = 0 ; i < labels.length; i++){
                        labels.get
                    }
                } */

                console.log(cameraHeight);

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
