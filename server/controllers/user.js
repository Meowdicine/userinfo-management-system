const {User} = require('../models')

// Create and Save a new User
exports.create = (req, res) => {
  const {name, email, phone, providers} = req.body
  const user = new User({
    name,
    email,
    phone,
    providers
  })

  // Save User in the database
  user
    .save(user)
    .then(data => {
      data.populate('providers', function () {
        res.json(data)
      })
    })
    .catch(err => {
      console.log(err)

      let errorMessages
      if (err.code === 11000) {
        errorMessages = {email: {message: 'Email must be unique'}}
      } else {
        errorMessages = err.errors
      }

      res.status(422).json({
        errors: errorMessages || 'Some error occurred while creating the User.'
      })
    })
}
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  let {page, name, sorting} = req.query

  let query = {}
  if (name) {
    query.name = {$regex: `${name}`, $options: 'sxi'}
  } else {
    query = {}
  }

  const userCount = total => {
    let limit = 5,
      skip = limit * parseInt(page - 1),
      last_page = Math.ceil(total / limit)

    if (total % limit != 0) {
      if (page == last_page) {
        limit = total % limit
      }
    }

    let defaultObj = {orderBy: 'createdAt', orderType: -1}

    // console.log(sorting)
    if (sorting) {
      sorting = JSON.parse(sorting)

      if (Object.keys(sorting).length) {
        if ('orderBy' in sorting && 'orderType' in sorting) {
          sorting.orderType = sorting.orderType === 'desc' ? -1 : 1
        } else {
          sorting = defaultObj
        }
      } else {
        sorting = defaultObj
      }
    } else {
      sorting = defaultObj
    }

    // console.log(typeof JSON.parse(sorting))
    User.find(query)
      .populate('providers')
      .sort({[sorting.orderBy]: sorting.orderType})
      .skip(skip)
      .limit(limit)
      .then(data => {
        res.json({
          data,
          pagination: {
            total,
            last_page,
            from: skip + 1,
            to: skip + limit,
            current_page: +page
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          message: err.message || {
            errors: {message: 'Some error occurred while retrive the Users.'}
          }
        })
      })
  }

  User.count({...query}, function (err, total) {
    userCount(total)
  })
}

// Update a User by the id in the request
exports.update = (req, res) => {
  const {id} = req.params
  const {name, email, phone, providers} = req.body
  let update = {
    name,
    email,
    phone,
    providers
  }

  User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    useFindAndModify: true
  })
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        })
      } else
        data.populate('providers', function () {
          res.json(data)
        })
    })
    .catch(err => {
      console.log(err)
      let errorMessages
      if (err.code === 11000) {
        errorMessages = {
          userName: {message: 'email must be unique'}
        }
      } else {
        errorMessages = err.errors
      }

      res.status(422).json({
        errors: errorMessages || {
          errors: {message: 'Some error occurred while updating the User.'}
        }
      })
    })
}
// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const {id} = req.params

  User.findByIdAndRemove(id)
    .then(data => {
      console.log(data)
      if (!data) {
        res.status(404).json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        })
      } else {
        res.json({
          message: 'User was deleted successfully!'
        })
      }
    })
    .catch(err => {
      res.status(422).json({
        message: 'Could not delete User with id=' + id
      })
    })
}
