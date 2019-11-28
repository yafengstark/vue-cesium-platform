<template>
    <div class="container">


        <a @click="value3 = true">
            <Icon type="ios-locate" size="36"/>
            <br>加载动态线</a>

        <Drawer
                title="加载"
                v-model="value3"
                width="200"
                :styles="styles"
        >
            <Form>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="选择模型位置" label-position="top">
                        <br>
                        <Input class="input" v-model="location"
                               placeholder="120 31 15000" style="width: 300px"/>


                    </FormItem>
                    </Col>

                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="cancel">取消</Button>
                <Button type="primary" @click="submit">加载</Button>
            </div>
        </Drawer>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件

    import {mapActions, mapState} from 'vuex'


    export default {
        data() {
            return {
                value3: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                location: '',


            };
        },
        computed: {
            ...mapState(['myMap']),
        },
        created() {


        },
        methods: {
            async getlunbotu() {

            },
            submit() {
                this.$Message.info('加载');
                var viewer = this.myMap.viewer;
                var Cesium = this.myMap.Cesium;

                var startLatitude = 35;
                var startLongitude = -120;
                var endLongitude;
                var startTime = Cesium.JulianDate.now();

// Add a polyline to the scene. Positions are dynamic.
                var isConstant = false;
                var redLine =  viewer.entities.add({
                    polyline : {
                        // This callback updates positions each frame.
                        positions : new Cesium.CallbackProperty(function(time, result) {
                            time  = Cesium.JulianDate.now();
//                            console.log(time);
                            endLongitude = startLongitude + 0.001 * Cesium.JulianDate.secondsDifference(time, startTime);
                            return Cesium.Cartesian3.fromDegreesArray([startLongitude, startLatitude, endLongitude, startLatitude], Cesium.Ellipsoid.WGS84, result);
                        }, isConstant),
                        width : 5,
                        material : Cesium.Color.RED
                    }
                });

                var startCartographic = Cesium.Cartographic.fromDegrees(startLongitude, startLatitude);

// use scratch object to avoid new allocations per frame.
                var endCartographic = new Cesium.Cartographic();
                var scratch = new Cesium.Cartographic();
                // 椭球测地线
                var geodesic = new Cesium.EllipsoidGeodesic();

// Calculate the length of the line
                function getLength(time, result) {
                    // Get the end position from the polyLine's callback.
                    var endPoint = redLine.polyline.positions.getValue(time, result)[1];
                    endCartographic = Cesium.Cartographic.fromCartesian(endPoint);

                    geodesic.setEndPoints(startCartographic, endCartographic);
                    var lengthInMeters = Math.round(geodesic.surfaceDistance);
                    return (lengthInMeters / 1000).toFixed(1) + " km";
                }

                function getMidpoint(time, result) {
                    // Get the end position from the polyLine's callback.
                    var endPoint = redLine.polyline.positions.getValue(time, result)[1];
                    endCartographic = Cesium.Cartographic.fromCartesian(endPoint);

                    geodesic.setEndPoints(startCartographic, endCartographic);
                    var midpointCartographic = geodesic.interpolateUsingFraction(0.5, scratch);
                    return Cesium.Cartesian3.fromRadians(midpointCartographic.longitude, midpointCartographic.latitude);
                }

// Label the polyline with calculated length.
                /**
                 * 重点在这个回调上
                 */
                var label = viewer.entities.add({
                    position : new Cesium.CallbackProperty(getMidpoint, isConstant),
                    label : {
                        // This callback updates the length to print each frame.
                        text: new Cesium.CallbackProperty(getLength, isConstant),
                        font : '20px sans-serif',
                        pixelOffset : new Cesium.Cartesian2(0.0, 20)
                    }
                });

// Keep the view centered.
                viewer.trackedEntity = label;



            },


            cancel() {
                this.value3 = false;
            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .container {
        display: flex;
        flex-direction: column;

        /*label {*/
        /*display: inline;*/
        /*}*/
        /*input {*/
        /*display: inline;*/
        /*}*/
    }

</style>
