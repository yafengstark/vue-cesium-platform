define([
    'echarts',
    'cesiumLib'
], function(
    echarts
) {
    function CompositeCoordinateSystem(GLMap, api) {
        this._GLMap = GLMap;
        this.dimensions = ['lng', 'lat'];
        this._mapOffset = [0, 0];

        this._api = api;
    }

    CompositeCoordinateSystem.prototype.dimensions = ['lng', 'lat']

    CompositeCoordinateSystem.prototype.setMapOffset = function(mapOffset) {
        this._mapOffset = mapOffset
    }

    CompositeCoordinateSystem.prototype.getBMap = function() {
        return this._GLMap
    }

    CompositeCoordinateSystem.prototype.dataToPoint = function(data) {
        //var px = this._GLMap.project(data)
        var position = Cesium.Cartesian3.fromDegrees(data[0], data[1]);
        if (!position) {
            return [0, 0];
        }
        var px = this._GLMap.cartesianToCanvasCoordinates(position);
        if (!px) {
            return [0, 0];
        }
        var mapOffset = this._mapOffset;

        return [px.x - mapOffset[0], px.y - mapOffset[1]];
    }

    CompositeCoordinateSystem.prototype.pointToData = function(pt) {
        var mapOffset = this._mapOffset;
        var pt = this._bmap.project(
            [
                pt[0] + mapOffset[0],
                pt[1] + mapOffset[1]
            ]
        );
        return [pt.lng, pt.lat];
    }

    CompositeCoordinateSystem.prototype.getViewRect = function() {
        var api = this._api;
        return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
    }

    CompositeCoordinateSystem.prototype.getRoamTransform = function() {
        return echarts.matrix.create();
    }


    // For deciding which dimensions to use when creating list data
    CompositeCoordinateSystem.dimensions = CompositeCoordinateSystem.prototype.dimensions;

    CompositeCoordinateSystem.create = function(ecModel, api) {
        var coordSys;

        ecModel.eachComponent('GLMap', function(GLMapModel) {
            var viewportRoot = api.getZr().painter.getViewportRoot()
            var GLMap = echarts.glMap;
            coordSys = new CompositeCoordinateSystem(GLMap, api)
            coordSys.setMapOffset(GLMapModel.__mapOffset || [0, 0])
            GLMapModel.coordinateSystem = coordSys
        });

        ecModel.eachSeries(function(seriesModel) {
            if (seriesModel.get('coordinateSystem') === 'GLMap') {
                seriesModel.coordinateSystem = coordSys;
            }
        });
    }

    return CompositeCoordinateSystem;
});