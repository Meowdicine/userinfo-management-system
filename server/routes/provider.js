module.exports = app => {
  const {
    create,
    findAll,
    update,
    deleteProvider
  } = require('../controllers/provider.js')

  var router = require('express').Router()

  // Create a new Provider
  router.post('/', create)

  // Retrieve all Providers
  router.get('/', findAll)

  // Update a Provider with id
  router.put('/:id', update)

  // Delete a Provider with id
  router.delete('/:id', deleteProvider)

  app.use('/api/providers', router)
}
