import User from '../models/user.js'
import handleErrors, { getPagination } from '../helpers/index.js'

// Create and Save a new User
export const create = (req, res) => {
  const { name, email, phone, providers } = req.body

  const user = new User({
    name,
    email,
    phone,
    providers
  })

  // Save User in the database
  user
    .save(user)
    .then((data) =>
      data.populate('providers', () => {
        res.json(data)
      })
    )
    .catch((err) => handleErrors(err, res, 422))
}

// Retrieve all Users from the database.
export const findAll = async (req, res) => {
  try {
    const { page, name, sorting } = req.query

    const query = {}

    if (name) {
      query.name = { $regex: `${name}`, $options: 'sxi' }
    }

    const total = await User.countDocuments(query)

    const { orderBy = 'createdAt', orderType } = sorting
      ? JSON.parse(sorting)
      : {}

    const sortQuery = { orderBy, orderType: orderType === 'asc' ? 1 : -1 }

    const { skip, limit, ...pagination } = getPagination({ total, page })

    const data = await User.find(query)
      .skip(skip)
      .limit(limit)
      .populate('providers')
      .sort({ [sortQuery.orderBy]: sortQuery.orderType })

    res.json({ data, pagination })
  } catch (err) {
    handleErrors(err, res)
  }
}

// Update a User by the id in the request
export const update = (req, res) => {
  const { id } = req.params
  const { name, email, phone, providers } = req.body

  const data = {
    name,
    email,
    phone,
    providers
  }

  User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: true
  })
    .then((data) =>
      data.populate('providers', () => {
        res.json(data)
      })
    )
    .catch((err) => handleErrors(err, res, 422))
}
// Delete a User with the specified id in the request
export const deleteUser = (req, res) => {
  const { id } = req.params

  User.findByIdAndRemove(id)
    .then(() => res.json({ message: 'User deleted successfully!' }))
    .catch((err) => handleErrors(err, res, 422))
}
