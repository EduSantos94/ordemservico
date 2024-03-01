import orderProducts from "@/services/orderProducts"
import { Router } from "express"


export default new class ServiceProducts {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', orderProducts.get)
    this.router.post('/', orderProducts.post)
    this.router.put('/:id', orderProducts.put)
    this.router.delete('/:id', orderProducts.delete)
  }
}