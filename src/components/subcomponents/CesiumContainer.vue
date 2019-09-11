<template>
    <!-- Cesium容器 参见https://zouyaoji.top/vue-cesium/#/zh/start/usage -->
    <div class="viewer">
	
		<!--地球容器（开发阶段一注释掉）-->
        <cesium-viewer @ready="ready" @changed="changed" :animation="animation" :camera="camera" >
			<cesium-navigation></cesium-navigation>
		</cesium-viewer>
        
		
		
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
				animation: true
			  }
			},
            created() {

            },
            methods: {
                ready (cesiumInstance) {
                    
					//获取Vue-Cesuim传过来的对象
					//param.Cesium; 
					//param.viewer;
					
					
					const { Cesium, viewer } = cesiumInstance;
					
					window.g_viewer = viewer;
                    console.log('cesium'); //debugger;
					
					// 在这儿获取Cesium和viewer实例，再执行相关逻辑代码
					//this.camera.position.longitude = 116.46;
					//this.camera.position.latitude = 39.92;
					//this.camera.position.height = 50000;
					this.animation = false;
					
					this.$store.dispatch('setCesiumInstance',cesiumInstance);
					
					
                },
				changed(percentage){
					//debugger;
					
					console.log(g_viewer.camera.position.z);
					
					//这个椭球形就是地球了
					var ellipsoid = g_viewer.scene.globe.ellipsoid;
					
					// 镜头移动的速率基于镜头离地球的高度
					var cameraHeight = ellipsoid.cartesianToCartographic(g_viewer.camera.position).height;
					
					var labels = this.$store.getters.labels;
					var label ;
					for(var i = 0; i < labels.length; i++){
						label = labels.get(i);
						//debugger;
						if(label.POPRANK.getValue() == 1 && label.show){
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
