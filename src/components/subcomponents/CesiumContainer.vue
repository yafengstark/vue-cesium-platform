

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
            <!--

    <vc-layer-imagery>
        <vc-provider-imagery-arcgis-mapserver :url="url"></vc-provider-imagery-arcgis-mapserver>
    </vc-layer-imagery>

    <vc-layer-imagery>
        <vc-provider-imagery-arcgis-mapserver :url="url_city"></vc-provider-imagery-arcgis-mapserver>
    </vc-layer-imagery>-->
            <!--<vc-layer-imagery>
        <vc-provider-imagery-arcgis-mapserver :url="url_city_label"></vc-provider-imagery-arcgis-mapserver>
    </vc-layer-imagery>-->
            <!--加载geojson作为标注-->
            <!--<vc-datasource-geojson data="https://gis.zjgisdev.com/hserver/rest/services/ZJ_RES_CIT_PT/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=fname&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&having=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&sqlFormat=none&resultType=&featureEncoding=esriDefault&f=geojson"
                           @ready="labelLoaded"
                           :show="show"
                           :options="labelOptions">

    </vc-datasource-geojson>-->
            <!--地名点-->
            <!--<vc-datasource-geojson data="/public/zj_pn_2000.geojson"
                   :show="showPn"
                   :options="pnOptions">

    </vc-datasource-geojson>-->
            <!--<vc-layer-imagery>
        <vc-provider-imagery-arcgis-mapserver :url="url_zj_img"></vc-provider-imagery-arcgis-mapserver>
    </vc-layer-imagery>-->
            <!--<vc-layer-imagery>
        <vc-provider-imagery-tianditu mapStyle="cva_c" :token="tk"></vc-provider-imagery-tianditu>
    </vc-layer-imagery>-->
            <!--加载地形 有地形后底部坐标信息就会显示高度-->
            <vc-provider-terrain-cesium ref="terrain"></vc-provider-terrain-cesium>
        </vc-viewer>

    </div>



</template>

<script>
    //检测两个矩形是否碰撞
    function hitTest(x1,y1,w1,h1, x2,y2,w2,h2) {
        
        if (x1 > (x2 + w2) || (x1 + w1) < x2) return false;
        if (y1 > (y2 + h2) || (y1 + h1) < y2) return false;

        return true;
    }
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
                //url:'/public/zj_pn.geojson',
                url_city: 'https://gis.zjgisdev.com/hserver/rest/services/ZJ_BOU_CIT_LN/MapServer',
                url_zj_img: 'https://gis.zjgisdev.com/hserver/rest/services//ZJ_IMG_FULL/MapServer',
                url_city_label: 'https://gis.zjgisdev.com/hserver/rest/services/ZJ_RES_CIT_PT/MapServer',
                url_pn_label:'https://gis.zjgisdev.com/hserver/rest/services/ZJ_RES_CIT_PT/MapServer',
                show: false,

                labelOptions: {
                    markerSymbol: '',
                    markerSize:1
                },

                showPn: false,
                pnOptions: {
                    markerSymbol: ''
                    
                }
                
                
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
                
                console.log('pitch:' + g_viewer.camera.pitch);

                //这个椭球形就是地球了
                var ellipsoid = g_viewer.scene.globe.ellipsoid;

                // 镜头移动的速率基于镜头离地球的高度
                var cameraHeight = ellipsoid.cartesianToCartographic(g_viewer.camera.position).height;


                this.showPlaceNames(g_viewer, cameraHeight);
                console.log('height:' + cameraHeight / 1000 );


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

            },

            //11个地市注记加载
            labelLoaded(cesiumInstance) {
                //debugger;
                //cesiumInstance.viewer.zoomTo(cesiumInstance.cesiumObject);

                var entities = cesiumInstance.cesiumObject.entities; 
                var values = entities.values;
                var condition = new Cesium.DistanceDisplayCondition(1500, 700000);
                var scaldistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0);
                values.forEach(function (item, index) {
                    //debugger;
                    var id = item.id;

                    entities.getById(id).label = new Cesium.LabelGraphics({
                        show: true,
                        text: item.name,
                        //fontSize:'12pt',
                        font: '14pt yahei',
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(0, -9),
                        translucencyByDistanc: scaldistance,
                        scaleByDistance: scaldistance,
                        distanceDisplayCondition: condition
                    });
                });

                this.show = true;
				
            },

            //动态显示地名数据
            showPlaceNames(view, cameraHeight) {
                //debugger;
                
                console.log('显示地名');
                var url = 'https://gis.zjgisdev.com/hserver/rest/services/zj_pn/FeatureServer/0/query?where=fcode%3D+%273101040106%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=objectid%2Cname&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&having=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&sqlFormat=none&resultType=&featureEncoding=esriDefault&f=geojson';
                var url = '/public/zj_pn_2000.geojson';
               
                var pn_object = null;
                
                if (view.dataSources.getByName('zj_pn').length < 1) {

                    var ds = new Cesium.GeoJsonDataSource('zj_pn');
                    view.dataSources.add(ds);

                    Cesium.Resource.fetchJson({
                        url: url,
                        queryParameters: ''
                    }).then(function (jsondata) {

                        //var linq = require('linq');

                        //地市
                        //jsondata = linq.from(jsondata.features).where(p => p.properties.fcode == '3101040106').toArray();
                        jsondata = jsondata.features;
                
                        // Create a label collection with two labels

                        var labels = new Cesium.LabelCollection({
                            debugShowBoundingVolume: false,
                            //blendOption: BlendOption.OPAQUE
                        });

                        window.mylabels = labels;

                        
                        var text = '', id = '', coords = [];
                        var dist_cond = new Cesium.DistanceDisplayCondition(6000, 9000);
                        var trans_cond = new Cesium.NearFarScalar(2.5e6, 1.0, 2.5e7, 0.0);
                        for (var i = 0; i < jsondata.length; i++) {
                            text = jsondata[i].properties['name'];
                            id = jsondata[i].properties['gnid'];
                            console.log(id);
                            coords = jsondata[i].geometry.coordinates;
                            labels.add({
                                id: id,
                                position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1]), 
							    text: text, 
							    font: '10px Helvetica', 
							    //distanceDisplayCondition:dist_cond,
                                fillColor: Cesium.Color.RED,
                                backgroundColor: Cesium.Color.BLUE,
							    outlineColor: Cesium.Color.BLACK, 
							    outlineWidth: 5, 
							    //pixelOffset : new Cartesian3(50.0, -50.0), 
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                //translucencyByDistance: trans_cond
						    }); 
                        }

                        view.scene.primitives.add(labels);
                        

                        console.log('缓存所有的地名信息');

                        ds.jsondata = jsondata;

                        pn_object = jsondata;

                        //debugger;
                    }).otherwise(function (error) {
                        // an error occurred
                        debugger;
                    });

                } else {
                    pn_object = view.dataSources.getByName('zj_pn')[0].jsondata;
                }

                //debugger;
                var test = window.mylabels;
                if (window.mylabels && window.mylabels.length > 0) {
                    this.processLabels(view, window.mylabels);
                    

                }




                if (cameraHeight < 1700000) {
                    //地市级  1700公里以内时显示地级市
                    
                    Cesium.Resource.fetchJson({
                        //url: 'https://gis.zjgisdev.com/hserver/rest/services/zj_pn/FeatureServer/0/query?where=fcode%3D+%273101040106%27&spatialRel=esriSpatialRelIntersects&distance=&outFields=name%2Cgnid&returnGeometry=true&featureEncoding=esriDefault&f=geojson',
                        url: 'https://gis.zjgisdev.com/hserver/rest/services/zj_pn/FeatureServer/0/query',
                        queryParameters: {
                            'where': "fcode='3101040106'",
                            'outFields': 'name,gnid',
                            'f': 'geojson'
                        }
                    }).then(function (jsondata) {
                        debugger;
                    });
                }

                if (cameraHeight < 200000) {
                    //县区  景点公园  湖泊 水系
                }

                if (cameraHeight < 100000) {
                    //镇
                }

                
                
                
                

            },

            hitTest(label1, label2,scene) {
                var w1 = 0;
                var h1 = 0;
                var pos1 = label1.computeScreenSpacePosition(scene);
                var x1 = pos1.x;
                var y1 = pos1.y;

                //一个字一个glyph
                for (var i = 0; i < label1._glyphs.length; i++) {
                    w1 += label1._glyphs[i].dimensions.width;
                    //h1 += label1._glyphs[i].dimensions.height;
                    h1 = label1._glyphs[i].dimensions.height > h1 ? label1._glyphs[i].dimensions.height : h1;
                }

                w1 *= label1.totalScale;
                h1 *= label1.totalScale;

                var w2 = 0;
                var h2 = 0;

                for (var i = 0; i < label2._glyphs.length; i++) {
                    w2 += label2._glyphs[i].dimensions.width;
                    h2 = label2._glyphs[i].dimensions.height > h2 ? label2._glyphs[i].dimensions.height : h2;
                }

                w2 *= label2.totalScale;
                h2 *= label2.totalScale;

                var pos2 = label2.computeScreenSpacePosition(scene);
                var x2 = pos2.x;
                var y2 = pos2.y;

                console.log(label1.text + ' ' + x1 + ' ' + y1 + 'w:' + w1 + '  h:' + h1);

                return hitTest(x1, y1, w1, h1, x2, y2, w2, h2);


            },

            //标注避让处理，将有重叠的标注隐藏
            processLabels(view, labels) {

                //先全部重置为显示
                for (var i = 0; i < labels.length; i++) {
                    labels.get(i).show = true;
                }

                var lbl1, lbl2;
                for (var i = 0; i < labels.length; i++) {

                    lbl1 = labels.get(i);

                    if (!lbl1.show) continue;

                    for (var j = i + 1; j < labels.length; j++) {
                        lbl2 = labels.get(j);
                        if (this.hitTest(lbl1, lbl2, view.scene)) {
                            lbl2.show = false; //隐藏
                            //break;
                        }
                    }

                    

                }
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
