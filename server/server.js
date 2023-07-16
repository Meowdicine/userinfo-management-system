import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoutes from './routes/user.js'
import providersRoutes from './routes/provider.js'

const app = express()

const { json, urlencoded } = bodyParser

const DATABASE_URL = 'mongodb://localhost:27017/crud_db'

var corsOptions = { origin: 'http://localhost:8081' }

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

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

// Serve the Vue.js app as static files
app.use(express.static('../dist'))

// api routes
app.use('/api/users', userRoutes)
app.use('/api/providers', providersRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
