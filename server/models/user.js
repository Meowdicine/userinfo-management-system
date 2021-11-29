module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, `{PATH} is required`],
        maxLength: [30, '{PATH} must be less than 30 character']
      },
      email: {
        type: String,
        unique: true,
        required: [true, '{PATH} is required'],
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
          },
          message: 'Please enter a valid {PATH}'
        }
      },
      phone: {
        type: String,
        required: [true, '{PATH} number is required'],
        validate: {
          validator: function (v) {
            return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
              v
            )
          },
          message: 'Please enter a valid {PATH} number'
        }
      },
      providers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Provider'
        }
      ]
    },
    {timestamps: true}
  )

  schema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret, opt) {
      return ret
    }
  })

  const User = mongoose.model('User', schema)

  User.count({}, function (err, count) {
    if (count < 50) {
      for (let i = 0; i < 50; i++) {
        const user = new User({
          name: Math.random().toString(36).substr(2, 8),
          email: `${Math.random().toString(36).substr(2, 15)}@example.com`,
          phone: `+${Math.ceil(Math.random() * 254584548545)}`
        })
        user.save(user)
      }
    }
  })

  return User
}
