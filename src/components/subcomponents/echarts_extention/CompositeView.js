define([
    'echarts',
    'jquery',
    'echarts-gl',
    './extension/CompositeMap',
    '../../../lib/Cesium/Cesium'
], function(
    echarts
) {
    'use strict'




    function CompositeView(id, option) {
        this._id = id;
        this._mapContainer = _createMap(id);
        this._overlay = _createChartOverlay(this._mapContainer, option);
        this._overlay.setOption(option);
    }

    function _createChartOverlay(container, option) {
        var chartContainer = document.createElement('div');
        var scene = container.scene;
        scene.canvas.setAttribute('tabIndex', 0);
        chartContainer.style.position = 'absolute';
        chartContainer.style.top = '0px';
        chartContainer.style.left = '0px';
        chartContainer.style.width = scene.canvas.width + 'px';
        chartContainer.style.height = scene.canvas.height + 'px';
        chartContainer.style.pointerEvents = 'none';
        chartContainer.setAttribute('id', 'echarts');
        chartContainer.setAttribute('class', 'echartMap');
        container.container.appendChild(chartContainer);
        echarts.glMap = scene;
        return echarts.init(chartContainer);
    }

    function _createMap(id) {
        return new Cesium.CesiumWidget(id, {
            sceneMode: Cesium.SceneMode.SCENE3D,
        });
    }

    CompositeView.prototype.updateOverlay = function(option) {
        if (this._overlay) {
            this._overlay.setOption(option);
        }
    };

    CompositeView.prototype.getMap = function() {
        return this._mapContainer;
    };

    CompositeView.prototype.getOverlay = function() {
        return this._overlay;
    };

    CompositeView.prototype.show = function() {
        var container = document.getElementById(this._id);
        container.style.visibility = "visible";
    };

    CompositeView.prototype.hide = function() {
        var container = document.getElementById(this._id);
        container.style.visibility = "hidden";
    };

    return CompositeView;

});