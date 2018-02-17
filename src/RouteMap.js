import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import mapboxgl from 'mapbox-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';

const ACCESS_TOKEN =
    'pk.eyJ1IjoiamR1bmNhbiIsImEiOiJjaXd2djM1dmQwMDJ6Mm9reW5uZmpiYnJpIn0.gS22bVHYiIogTCaWMFyZhg';
const MAP_STYLE = 'mapbox://styles/jduncan/ciy46z08o000u2rru0f7fg1yb';

const mapConf = (config) => ({
    style: MAP_STYLE,
    center: [0, 0],
    pitch: 0,
    zoom: 1,
    maxZoom: 8,
    interactive: false,
    animated: false,
    ...config
});

const emptyLines = {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: []
    }
};

const lineLayer = {
    id: 'lines',
    type: 'line',
    source: 'route',
    layout: {
        'line-cap': 'round'
    },
    paint: {
        'line-width': 3,
        'line-color': '#f03a47',
        'line-opacity': 1,
        'line-dasharray': [-0.01, 2.0],
        'line-width': 3
    }
};

export default class RouteMap extends Component {
    map = null;
    step = 0;
    frame = null;

    componentDidMount() {
        const { mapConfig, name: container } = this.props;
        mapboxgl.accessToken = ACCESS_TOKEN;
        this.map = new mapboxgl.Map(
            mapConf({
                container,
                ...mapConfig
            })
        );
        this.map.on('load', this.onLoad);
    }

    onLoad = async () => {
        this.map.addSource('route', emptyLines);
        this.map.addLayer(lineLayer);
    };

    componentDidUpdate(nextProps) {
        this.map.resize();
        this.fitBounds(
            this.props.routeGeoJson.data.features[0].geometry.coordinates
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.paused) {
            requestAnimationFrame(this.animateLine);
        }
    }

    animateLine = () => {
        const coords = this.props.routeGeoJson.data.features[0].geometry
            .coordinates;
        const json = R.assocPath(
            ['geometry', 'coordinates'],
            coords.slice(0, this.step),
            this.props.routeGeoJson.data.features[0]
        );

        this.map.getSource('route').setData(json);
        this.step += 0.2;

        if (!this.props.paused) {
            requestAnimationFrame(this.animateLine);
        }
    };

    fitBounds = (coords, fitBoundsPadding) => {
        const extendBounds = (b, coord) => b.extend(coord);
        if (coords.length) {
            const bounds = coords.reduce(
                extendBounds,
                new mapboxgl.LngLatBounds(coords[0], coords[0])
            );

            this.map.fitBounds(bounds, {
                padding: 100,
                duration: 0
            });
        }
    };

    render = () => <div id={this.props.name} className="map-wrapper" />;
}

RouteMap.propTypes = {
    routeGeoJson: PropTypes.object
};

RouteMap.defaultProps = {
    name: 'the-map'
};
