import axios from 'axios'

const GET_TRAILS = 'GET_TRAILS'

const getTrails = trails => ({
  type: GET_TRAILS,
  trails
})

export const getTrailsThunk = key => {
  return async dispatch => {
    try {
      const {data: oregonData} = await axios.get(
        // 50 trails in Oregon
        `https://www.hikingproject.com/data/get-trails?lat=44.0274&lon=-120.2519&maxDistance=150&maxResults=50&key=${key}`
      )
      const {data: washingtonData} = await axios.get(
        `https://www.hikingproject.com/data/get-trails?lat=47.7511&lon=-120.7401&maxDistance=200&maxResults=50&key=${key}`
      )

      const {data: vancouverData} = await axios.get(
        `https://www.hikingproject.com/data/get-trails?lat=49.2827&lon=-123.1207&maxDistance=100&maxResults=50&key=${key}`
      )

      const allTrails = [
        ...oregonData.trails,
        ...washingtonData.trails,
        ...vancouverData.trails
      ]

      dispatch(getTrails(allTrails))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  trails: []
}

const trailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAILS:
      return action.trails

    default:
      return state
  }
}

export default trailsReducer
