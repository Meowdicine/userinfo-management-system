import mongoose from 'mongoose'

export const connect = () => {
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to the database!')
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err)
      process.exit()
    })
}

export default { connect }
