import express from 'express'
import companies from '@/controllers/companies'
import plans from '@/controllers/plans'
import products from '@/controllers/products'
import users from '@/controllers/users'
import services from '@/controllers/services'
import serviceProducts from '@/controllers/serviceProducts'
import serviceImages from '@/controllers/serviceImages'
import login from '@/controllers/login'
import { verifyJWT } from './utils'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({"API": "API NODE"})
})

routes.use('/companies', companies.router)
routes.use('/login', login.router)
routes.use('/plans', plans.router)
routes.use('/products', products.router)
routes.use('/users', verifyJWT, users.router)
routes.use('/services', services.router)
routes.use('/serviceProducts', serviceProducts.router)
routes.use('/serviceImages', serviceImages.router)

export default routes