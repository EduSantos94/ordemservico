import express from 'express'
import companies from '@/controllers/companies'
import plans from '@/controllers/plans'
import products from '@/controllers/plans'

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({"API": "API NODE"})
})

routes.use('/companies', companies.router)
routes.use('/plans', plans.router)
routes.use('/products', products.router)

export default routes