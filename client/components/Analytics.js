import React from 'react'
import Rating from '@material-ui/lab/Rating'
import styled from 'styled-components'

const TrailImage = styled.img`
  border-radius: 5px;
`

class Analytics extends React.Component {
  normalizeStr = str => {
    let lower = str.toLowerCase()
    const normalized = lower.charAt(0).toUpperCase() + lower.substring(1)
    return normalized
  }

  render() {
    return (
      <div>
        <h1 className="statsHeading">Trail Info</h1>
        {!this.props.selectedTrail && (
          <h2>(select a trail for more information!)</h2>
        )}
        {this.props.selectedTrail && (
          <div>
            <h2>{this.props.selectedTrail.name}</h2>
            {this.props.selectedTrail.imgSmallMed ? (
              <TrailImage
                alt="trailimage"
                src={this.props.selectedTrail.imgSmallMed}
              />
            ) : (
              'this trail has no images :('
            )}
            <p>Location: {this.props.selectedTrail.name}</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div>
                Difficulty:{' '}
                {this.normalizeStr(this.props.selectedTrail.difficulty)}
              </div>
              <div
                style={{marginLeft: 5}}
                className={this.normalizeStr(
                  this.props.selectedTrail.difficulty
                )}
              />
            </div>

            <p>
              Average rating: {this.props.selectedTrail.stars} (
              {this.props.selectedTrail.starVotes}{' '}
              {this.props.selectedTrail.starVotes > 1 ? 'reviews' : 'review'})
            </p>
            <Rating
              name="half-rating"
              precision={0.1}
              value={this.props.selectedTrail.stars}
              readOnly
            />
          </div>
        )}
      </div>
    )
  }
}

export default Analytics
