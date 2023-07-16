import Provider from '../models/provider.js'
import handleErrors from '../helpers/index.js'

// Create and Save a new Provider
export const create = (req, res) => {
  // Create a Provider
  const provider = new Provider({ name: req.body.name })

  // Save Provider in the database
  provider
    .save(provider)
    .then((data) => res.json(data))
    .catch((err) => handleErrors(err, res, 422))
}

// Retrieve all Providers from the database.
export const findAll = async (_, res) => {
  Provider.find()
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((err) => handleErrors(err, res))
}

// Update a Provider by the id in the request
export const update = (req, res) => {
  const { id } = req.params
  const data = { name: req.body.name }

  Provider.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: true
  })
    .then((data) => res.json(data))
    .catch((err) => handleErrors(err, res, 422))
}

// Delete a Provider with the specified id in the request
export function deleteProvider(req, res) {
  const { id } = req.params

  Provider.findByIdAndRemove(id)
    .then(() => res.json({ message: 'Provider was deleted successfully!' }))
    .catch((err) => handleErrors(err, res, 422))
}
