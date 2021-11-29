module.exports = app => {
  const {
    create,
    findAll,
    update,
    deleteUser
  } = require('../controllers/user.js')

  var router = require('express').Router()

  // Create a new User
  router.post('/', create)

  // Retrieve all Users
  router.get('/', findAll)

  // Update a User with id
  router.put('/:id', update)

  // Delete a User with id
  router.delete('/:id', deleteUser)

  app.use('/api/users', router)
}
