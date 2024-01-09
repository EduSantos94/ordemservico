import express from 'express'
import exampleController from '@/controllers/exampleController'
import company from '@/controllers/company'

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({"API": "API NODE"})
})

routes.use('/example', exampleController.router)
routes.use('/company', company.router)

export default routes