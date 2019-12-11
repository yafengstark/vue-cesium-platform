define([
    'echarts',
    './CompositeCoordinateSystem',
    './CompositeMapModel',
    './CompositeMapView'
], function(
    echarts,
    CompositeCoordinateSystem,
    CompositeMapModel,
    CompositeMapView
) {
    'use strict'
    echarts.registerCoordinateSystem('GLMap', CompositeCoordinateSystem);
    echarts.registerAction({
        type: 'GLMapRoam',
        event: 'GLMapRoam',
        update: 'updateLayout'
    }, function(payload, ecModel) {})

    return {
        version: '1.0.0'
    };
});