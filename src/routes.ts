import express from 'express'
import companies from '@/controllers/companies'
import plans from '@/controllers/plans'
import products from '@/controllers/products'
import users from '@/controllers/users'
import orders from '@/controllers/orders'
import orderProducts from '@/controllers/orderProducts'
import orderImages from '@/controllers/orderImages'
import orderServices from '@/controllers/orderServices'
import login from '@/controllers/login'
import services from '@/controllers/services'
import { verifyJWT } from './utils'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({"API": "API NODE"})
})

routes.use('/companies', verifyJWT,companies.router)
routes.use('/login', login.router)
routes.use('/plans', plans.router)
routes.use('/products', verifyJWT,products.router)
routes.use('/users', verifyJWT, users.router)
routes.use('/orders', verifyJWT,orders.router)
routes.use('/orderProducts', verifyJWT,orderProducts.router)
routes.use('/ordemImages', verifyJWT,orderImages.router)
routes.use('/services', verifyJWT,services.router)

export default routes