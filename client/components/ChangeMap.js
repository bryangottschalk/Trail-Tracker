import React from 'react'
import L from 'leaflet'
import {connect} from 'react-redux'
import {Button} from '../styled-elements/'

class ChangeMap extends React.Component {
  handleClick = e => {
    switch (e.target.value) {
      default:
        return L.tileLayer(
          `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${
            this.props.keys.MAPBOXKEY
          }`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
          }
        ).addTo(this.props.map)
      case 'Default (Street View)':
        return L.tileLayer(
          `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${
            this.props.keys.MAPBOXKEY
          }`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
          }
        ).addTo(this.props.map)
      case 'Satellite View':
        return L.tileLayer(
          `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${
            this.props.keys.MAPBOXKEY
          }`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.satellite'
          }
        ).addTo(this.props.map)
      case 'Precipitation View':
        return L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(this.props.map)
      case 'Black and White View':
        return L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }
        ).addTo(this.props.map)
      case 'Fire World View':
        L.tileLayer(
          `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${
            this.props.keys.THUNDERFORESTKEY
          }`,
          {
            attribution:
              '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

            maxZoom: 22
          }
        ).addTo(this.props.map)
    }
  }

  render() {
    return (
      <div>
        <h1>Select map scheme:</h1>
        <Button value="Default (Street View)" onClick={this.handleClick}>
          Default (Street View)
        </Button>
        <Button value="Satellite View" onClick={this.handleClick}>
          Satellite View
        </Button>
        <Button value="Precipitation View" onClick={this.handleClick}>
          Precipitation
        </Button>
        <Button value="Black and White View" onClick={this.handleClick}>
          Black and White
        </Button>
        <Button
          className="fireWorld"
          value="Fire World View"
          onClick={this.handleClick}
        >
          Fire World
          <img
            alt="skull"
            className="skull"
            src="https://cdn.pixabay.com/photo/2012/04/12/19/37/skull-and-crossbones-30325_960_720.png"
          />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keys: state.keys
})

export default connect(mapStateToProps, null)(ChangeMap)
