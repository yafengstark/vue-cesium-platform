define([
    'echarts'
], function(
    echarts
) {
    return echarts.extendComponentModel({
        type: 'GLMap',

        getBMap: function() {
            // __bmap is injected when creating BMapCoordSys
            return this.__GLMap;
        },

        defaultOption: {
            roam: false
        }
    });
});