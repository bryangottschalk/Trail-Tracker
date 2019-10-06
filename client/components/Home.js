import React from 'react'
import L from 'leaflet'
import {connect} from 'react-redux'
import {getKeysThunk} from '../store/keys'
import {getTrailsThunk} from '../store/trails'
import styled from 'styled-components'
import ChangeMap from './ChangeMap'
import ChangeIcon from './ChangeIcon'
import Analytics from './Analytics'

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`

const trailIconUrl = 'https://image.flaticon.com/icons/svg/1727/1727287.svg'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIcon: L.icon({
        iconUrl: trailIconUrl,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -25]
      }),
      selectedTrail: '',
      mapLoading: true
    }
  }
  async componentDidMount() {
    await this.props.getKeys()
    await this.props.getTrails(this.props.keys.HIKINGPROJECTKEY)
    this.map = await L.map('map', {
      center: [47, -120],
      zoom: 5.5,
      zoomControl: false
    })
    this.addTileLayer()
    this.addTrailsToMap(this.props.trails)
    this.setState({mapLoading: false})
  }
  addTileLayer = () => {
    this.map.on('click', this.onMapClick)
    const basemap = L.tileLayer(
      `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${
        this.props.keys.MAPBOXKEY
      }
      `,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets'
      }
    )
    basemap.addTo(this.map)
  }
  addTrailsToMap = allTrails => {
    // map over trailsArr creating a marker and popup for each
    const markers = allTrails.map(trail => {
      return L.marker([trail.latitude, trail.longitude], {
        icon: L.icon({
          iconUrl: trailIconUrl,
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -20]
        })
      })
        .on('click', e => {
          const popUpTrailData = allTrails.find(trail => {
            return trail.id === Number(e.target._icon.id)
          })
          this.setState({
            // sets state to the appropriate trail data so it can be passed to analytics component
            selectedTrail: popUpTrailData
          })
        })
        .bindPopup(`${trail.name} has a ${trail.stars} star rating.`)
        .addTo(this.map)
    })
    //map over markers to store the trailID to each one --> allows it to be accessible on popup click

    markers.map((marker, index) => {
      return (marker._icon.id = allTrails[index].id)
    })
  }

  onMapClick = e => {
    console.log('You clicked the map at ' + e.latlng)
    L.marker(e.latlng, {icon: this.state.currentIcon})
      .bindPopup(`Your custom waypoint is at ${e.latlng}`)
      .addTo(this.map)
  }

  iconChangeHandler = newIcon => {
    this.setState({
      currentIcon: newIcon
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="logo">Trail Tracker</h1>
          <p className="subtitle">plan an adventure out west</p>
        </header>
        <div>
          <div className="selectorContainer">
            <ChangeMap map={this.map} />
            <ChangeIcon iconChangeHandler={this.iconChangeHandler} />
          </div>
          <div className="map-analytics-container">
            {this.state.mapLoading && <div>map loading...</div>}
            <Wrapper id="map" className="map" />
            <Analytics
              className="analytics"
              selectedTrail={this.state.selectedTrail}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  keys: state.keys,
  trails: state.trails
})

const mapDispatchToProps = dispatch => {
  return {
    getKeys: () => dispatch(getKeysThunk()),
    getTrails: key => dispatch(getTrailsThunk(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
