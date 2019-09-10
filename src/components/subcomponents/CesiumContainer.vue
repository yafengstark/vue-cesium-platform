<template>
    <!-- Cesium容器 参见https://zouyaoji.top/vue-cesium/#/zh/start/usage -->
    <div class="viewer">
        <cesium-viewer @ready="ready" @changed="changed" :animation="animation" :camera="camera" > </cesium-viewer>
        <!--地球容器（开发阶段一注释掉）-->
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
					height: 2000
				  },
				  heading: 360,
				  pitch: -90,
				  roll: 0
				},
				animation: false
			  }
			},
            created() {

            },
            methods: {
                ready (cesiumInstance) {
                    
					//获取Vue-Cesuim传过来的对象
					//param.Cesium; 
					//param.viewer;
					
					debugger;
					const { Cesium, viewer } = cesiumInstance;
					
					window.g_viewer = viewer;
                    console.log('cesium'); //debugger;
					
					// 在这儿获取Cesium和viewer实例，再执行相关逻辑代码
					this.camera.position.longitude = 116.46;
					this.camera.position.latitude = 39.92;
					this.camera.position.height = 50000;
					this.animation = false;
					
					//this.camera.changed.addEventListener(function(percentage){
					//	console.log(percentage);
					//});
                    
                    
					//vue-cesuim已经包含了该功能，不需要
                    //cesium.viewer = new Cesium.Viewer('cesiumContainer', {
                    //    imageryProvider: Cesium.createTileMapServiceImageryProvider({
                    //        url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')

                     //   }),
    //                    baseLayerPicker: false
                    //});
                },
				changed(a,b,c){
					//debugger;
					
					console.log(this.camera.position.height);
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
