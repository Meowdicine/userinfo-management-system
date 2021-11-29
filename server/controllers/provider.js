const {Provider, User} = require('../models')

// Create and Save a new Provider
exports.create = (req, res) => {
  // Create a Provider
  const provider = new Provider({
    name: req.body.name
  })

  // Save Provider in the database
  provider
    .save(provider)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      let errorMessages
      if (err.code === 11000) {
        errorMessages = {
          providerName: {message: 'provider name must be unique'}
        }
      } else {
        errorMessages = err.errors
      }

      res.status(422).json({
        errors:
          errorMessages || 'Some error occurred while creating the Provider.'
      })
    })
}

// Retrieve all Providers from the database.
exports.findAll = (req, res) => {
  Provider.find()
    .sort({createdAt: -1})
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        message:
          err.message || 'Some error occurred while retrieving tutorials.'
      })
    })
}

// Update a Provider by the id in the request
exports.update = (req, res) => {
  const {id} = req.params
  let update = {name: req.body.name}

  Provider.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    useFindAndModify: true
  })
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Provider with id=${id}. Maybe Provider was not found!`
        })
      } else res.json(data)
    })
    .catch(err => {
      console.log(err)
      let errorMessages
      if (err.code === 11000) {
        errorMessages = {
          providerName: {message: 'provider name must be unique'}
        }
      } else {
        errorMessages = err.errors
      }

      res.status(422).json({
        errors:
          errorMessages || 'Some error occurred while creating the Provider.'
      })
    })
}

// Delete a Provider with the specified id in the request
exports.deleteProvider = (req, res) => {
  const {id} = req.params

  Provider.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Provider with id=${id}. Maybe Provider was not found!`
        })
      } else {
        res.json({
          message: 'Provider was deleted successfully!'
        })
      }
    })
    .catch(err => {
      res.status(422).json({
        message: 'Could not delete Provider with id=' + id
      })
    })
}
