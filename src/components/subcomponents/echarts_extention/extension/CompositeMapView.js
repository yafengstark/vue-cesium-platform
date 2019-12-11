define([
    'echarts'
], function(
    echarts
) {
    'use strict'
    return echarts.extendComponentView({
        type: 'GLMap',
        init: function(ecModel, api) {
            var glMap = echarts.glMap;
            var moveHandler = function(type, target) {
                api.dispatchAction({
                    type: 'GLMapRoam'
                })
            }
            var handler = new Cesium.ScreenSpaceEventHandler(glMap.canvas);
            handler.setInputAction(function(movement) {
                moveHandler();
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.setInputAction(function(movement) {
                console.log('mouse wheel');
                moveHandler();
            }, Cesium.ScreenSpaceEventType.WHEEL);
            //Cesium.ScreenSpaceEventType.WHEEL
            //Cesium.ScreenSpaceEventType.MOUSE_MOVE
            glMap.camera.moveStart.addEventListener(moveHandler);
            glMap.camera.moveEnd.addEventListener(moveHandler);
        },
        render: function(GLMapModel, ecModel, api) {}
    })
});