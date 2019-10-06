import React from 'react'
import L from 'leaflet'
import {Button} from '../styled-elements/'

const trailIconUrl = 'https://image.flaticon.com/icons/svg/1727/1727287.svg'

class ChangeIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  changeIcon = e => {
    switch (e.target.value) {
      default:
        return this.props.iconChangeHandler(
          L.icon({
            iconUrl: `${trailIconUrl}`,
            iconSize: [24, 24],
            iconAnchor: [12, 24], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
          })
        )
      case 'Hiking':
        return this.props.iconChangeHandler(
          L.icon({
            iconUrl: `${trailIconUrl}`,
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -20]
          })
        )
      case 'Green Pointer':
        return this.props.iconChangeHandler(
          L.icon({
            iconUrl:
              'https://cdn.pixabay.com/photo/2015/12/14/20/29/tracker-1093167_960_720.png',
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            popupAnchor: [0, -40]
          })
        )
    }
  }
  render() {
    return (
      <div>
        <h1>Select icon:</h1>
        <Button value="Hiking" onClick={this.changeIcon}>
          Hiking
        </Button>
        <Button value="Green Pointer" onClick={this.changeIcon}>
          Green Pointer
        </Button>
      </div>
    )
  }
}

export default ChangeIcon
