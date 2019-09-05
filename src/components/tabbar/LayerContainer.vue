<template>
    <div class="layer" :class="[ message ? 'exist' : 'not-exist' ]">
        <!--  头部区域 -->
        <handle-header title="图层"></handle-header>

        <!-- 树型组件 -->
        <Tree :data="data2" @on-check-change="checkchange" show-checkbox disabled></Tree>

        <!--<Row class="layer-header">-->
        <!---->
        <!--<Col span="12"> <h1>图层管理</h1></Col>-->
        <!--<Col span="12"><Button type="text">X</Button></Col>-->
        <!--</Row>-->


    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import handleHeader from "../subcomponents/HandleHeader.vue"

    export default {
        data() {
            return {

                data2: [
                    {
                        title: '基础影像',
                        expand: false,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '地形',
                        expand: false,
                        children: []
                    },
                    {
                        title: '叠加图层',
                        expand: false,
                        children: [],
						//如何添加节点事件呢???
						on:{
							"on-check-change":data=>{alert('ok');}
						}
						
                    },
                    {
                        title: '标注图层',
                        expand: false,
                        children: []
                    }
                ]


            };
        },
        created() {
            // 选择显示
            this.$store.commit("setIsHandleShow", true);
        },
        methods: {
            async getlunbotu() {
                // 获取轮播图的方法
                const {data} = await this.$http.get("/getlunbo");
                if (data.status === 200) this.lunbotu = data.result;
            },
			checkchange:function(sels,cursel){
                debugger;
                if (cursel.title == '标注图层' && cursel.checked) {
                    
					var viewer = g_viewer;
					var url = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0/query?where=1+%3D+1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=';
					
					Cesium.GeoJsonDataSource.load(url).then(function(dataSource){
						var entities = dataSource.entities.values; 
						debugger;
						for (var i = 0; i < entities.length; i++) { 
							var entity = entities[i]; 
							var abc = entity.position.getValue(); 
							
							var font_size = [16,14,12,10,8,6,4,2,1];
							var dist_con_ar = [ new Cesium.DistanceDisplayCondition(0, 1000),
								new Cesium.DistanceDisplayCondition(1000, 3000),
								new Cesium.DistanceDisplayCondition(3000, 5000),
								new Cesium.DistanceDisplayCondition(5000, 6000),
								new Cesium.DistanceDisplayCondition(6000, 9000),
								new Cesium.DistanceDisplayCondition(9000, 13000),
								new Cesium.DistanceDisplayCondition(13000, Number.Max)
							];
							
							// 2. Now, push each entity that's a label to our 'labels' array
							viewer.entities.add({ 
								position: new Cesium.Cartesian3(abc.x,abc.y,abc.z), 
								label: { 
									text: entity.properties.CITY_NAME, 
									font: font_size[ entity.properties.POP_RANK - 1] + 'px Helvetica', 
									distanceDisplayCondition:dist_con_ar[ 7 - entity.properties.POP_RANK],
									fillColor: Cesium.Color.WHITE, 
									outlineColor: Cesium.Color.BLACK, 
									outlineWidth: 5, 
									//pixelOffset : new Cartesian3(50.0, -50.0), 
									style: Cesium.LabelStyle.FILL_AND_OUTLINE, 
									translucencyByDistance: new Cesium.NearFarScalar(2.5e6, 1.0, 2.5e7, 0.0) 
								} 
							});
						}											
					});
					
					//g_viewer.dataSources.add(dataSource);
					//g_viewer.zoomTo(dataSource);
				}
			}
        },
        components: {
            // 注册子组件
            handleHeader

        },
        computed: {
            message() {
                return this.$store.state.isHandleShow
            }
        }
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
