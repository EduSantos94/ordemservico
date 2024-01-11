import products from "@/services/products"
import { Router } from "express"


export default new class Plans {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', products.get)
    this.router.post('/', products.post)
    this.router.put('/:id', products.put)
    this.router.delete('/:id', products.delete)
  }
}