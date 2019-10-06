const router = require('express').Router()

module.exports = router

router.get('/', async (req, res, next) => {
  const api_keys = {
    HIKINGPROJECTKEY: process.env.HIKINGPROJECTKEY,
    MAPBOXKEY: process.env.MAPBOXKEY,
    THUNDERFORESTKEY: process.env.THUNDERFORESTKEY
  }
  res.json(api_keys)
})
