import {
  create,
  findAll,
  update,
  deleteProvider,
} from '../controllers/provider.js'
import express from 'express'

const router = express.Router()

// Create a new Provider
router.post('/', create)

// Retrieve all Providers
router.get('/', findAll)

// Update a Provider with id
router.put('/:id', update)

// Delete a Provider with id
router.delete('/:id', deleteProvider)

export default router
