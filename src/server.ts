import cors from 'cors'
import express from 'express'
import routes from './routes'
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3330

app.listen(port, (() => {
  console.log(`listening on port ${port}`)
}))