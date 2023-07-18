import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import userRoutes from './routes/user.js'
import database from './database/config.js'
import providersRoutes from './routes/provider.js'

dotenv.config()

database.connect()

const ENVIRONMENT = process.env.ENVIRONMENT

const app = express()

const { json, urlencoded } = bodyParser

// define the absolute path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// parse requests of content-type - application/json
app.use(json())

const origin = {
  LOCAL: ['http://localhost:8081'],
  PRODUCTION: ['https://crud-mevn-project.onrender.com']
}

const corsOptions = { origin: origin[ENVIRONMENT] }

app.use(cors(corsOptions))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

// api routes
app.use('/api/users', userRoutes)
app.use('/api/providers', providersRoutes)

// Serve the Vue.js app as static files
app.use(express.static('dist'))

// Handle all routes by serving the index.html file
app.get('*', (_, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

// set port, listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
