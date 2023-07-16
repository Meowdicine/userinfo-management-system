import express from 'express'
import {create, findAll, update, deleteUser} from '../controllers/user.js'

const router = express.Router()

// Create a new User
router.post('/', create)

// Retrieve all Users
router.get('/', findAll)

// Update a User with id
router.put('/:id', update)

// Delete a User with id
router.delete('/:id', deleteUser)

export default router
