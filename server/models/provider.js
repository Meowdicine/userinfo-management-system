module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        unique: true,
        required: [true, `provider {PATH} is required`],
        maxLength: [30, 'provider {PATH} must be less than 30 character']
      },
      users: [{type: mongoose.Types.ObjectId, ref: 'User', select: false}]
    },
    {timestamps: true}
  )

  schema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret, opt) {
      delete ret['users']
      return ret
    }
  })

  const Provider = mongoose.model('Provider', schema)

  Provider.count({}, function (err, count) {
    if (count < 50) {
      for (let i = 0; i < 50; i++) {
        const provider = new Provider({
          name: Math.random().toString(36).substr(2, 8)
        })
        provider.save(provider)
      }
    }
  })

  return Provider
}
