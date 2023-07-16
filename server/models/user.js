import mongoose from 'mongoose'

const schema = new mongoose.Schema(
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
        message: 'Please enter a valid {PATH}',
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        }
      }
    },
    phone: {
      type: String,
      required: [true, '{PATH} number is required'],
      validate: {
        message: 'Please enter a valid {PATH} number',
        validator: function (v) {
          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            v
          )
        }
      }
    },
    providers: [
      {
        ref: 'Provider',
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  { timestamps: true }
)

schema.set('toJSON', {
  versionKey: false,
  transform: (_, ret, __) => ret
})

const User = mongoose.model('User', schema)

const createMockData = async () => {
  try {
    const users = await User.find({})

    if (users.length === 0) {
      const mockData = Array.from({ length: 50 }, () => ({
        name: Math.random().toString(36).substr(2, 8),
        email: `${Math.random().toString(36).substr(2, 15)}@example.com`,
        phone: `+${Math.ceil(Math.random() * 254584548545)}`
      }))

      await User.insertMany(mockData)

      console.log('Users mock data created successfully')
    }
  } catch (err) {
    console.error(err)
  }
}

createMockData()

export default User
