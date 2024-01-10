import express from 'express'
import company from '@/controllers/company'

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({"API": "API NODE"})
})

routes.use('/company', company.router)

export default routes