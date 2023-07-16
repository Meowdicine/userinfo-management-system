import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, `provider {PATH} is required`],
      maxLength: [30, 'provider {PATH} must be less than 30 character']
    },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User', select: false }]
  },
  { timestamps: true }
)

schema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret, __) {
    delete ret['users']
    return ret
  }
})

const Provider = mongoose.model('Provider', schema)

const createMockData = async () => {
  try {
    const providers = await Provider.find()

    if (providers.length === 0) {
      const mockData = Array.from({ length: 50 }, () => ({
        name: Math.random().toString(36).substr(2, 8)
      }))

      await Provider.insertMany(mockData)

      console.log('Providers mock data created successfully')
    }
  } catch (err) {
    console.error(err)
  }
}

createMockData()

export default Provider
