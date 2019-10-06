import axios from 'axios'

const GET_KEYS = 'GET_KEYS'

const getKeys = keys => ({
  type: GET_KEYS,
  keys
})

export const getKeysThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/keys`)
      dispatch(getKeys(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  keys: null
}

const keysReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_KEYS:
      return action.keys

    default:
      return state
  }
}

export default keysReducer
