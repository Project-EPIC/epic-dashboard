import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { styles } from "./styles";
import { connect } from 'react-redux';
import firebase from "firebase";
import 'react-image-lightbox/style.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
 
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoicnlsbzU2ODgiLCJhIjoiY2tucDV6N2J1MWQ0bzJ3cGQxdGpqZTRmdSJ9.IYF4w8oMSqCH8sdYL8JSTA';

const Map = () => {
};

class GeoTagMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
        lng: -5.852,
        lat: 38.511,
        zoom: 2,
        options: {
          minZoom: 1.35,
          maxZoom: 10
        }
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom, options} = this.state;
    const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [lng, lat],
        zoom,
        ...options
    });

    map.on('load', async () => {
      const zoom = map.getZoom()
      const bounds = map.getBounds()
      const data = await this.getGeoTagData(bounds._ne.lat, bounds._sw.lng, bounds._sw.lat, bounds._ne.lng, zoom)
      map.addSource('geo-tags', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': data
        }
      })
      map.addLayer({
        'id': 'geo-tags',
        'type': 'circle',
        'source': 'geo-tags',
        'paint': {
          'circle-color': '#FF0000',
          'circle-radius': 3,
          'circle-opacity': 0.2
        }
      });
    })

    map.on('moveend', async () => {
      // get new center coordinates
      const zoom = map.getZoom()
      const bounds = map.getBounds()
      const data = await this.getGeoTagData(bounds._ne.lat, bounds._sw.lng, bounds._sw.lat, bounds._ne.lng, zoom)

      // fetch new data
      const results = {
        "type": "FeatureCollection",
        "features": data
      }

      map.getSource('geo-tags').setData(results);
    });
  }

  getGeoTagData(NWLat, NWLon, SELat, SELon, zoom) {
    const { eventId } = this.props;
    const resolution = zoom >= 3 ? 3 : parseInt(zoom);
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
      return fetch(`https://epicapi.gerard.space/geotag/${eventId}/${NWLat}/${NWLon}/${SELat}/${SELon}?resolution=${resolution}`,{
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
      })
      .then(response => response.json())
      .then(({ tweets }) => tweets.map(({ coordinates, tweet }) => ({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          coordinates
        },
        "properties": {
          ...tweet
        }
      })));
    });
  }

  render() {
    const { classes } = this.props;
    return (
        <Grid container spacing={24} align="center" justify="center">
            <Card>
                <div ref={this.mapContainer} className={classes.mapContainer}/>
            </Card>
        </Grid>
    );
  }
}

GeoTagMap.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(null, null)(withStyles(styles)(GeoTagMap));
