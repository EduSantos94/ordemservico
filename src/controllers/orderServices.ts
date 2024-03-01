import orderServices from "@/services/orderServices"
import { Router } from "express"


export default new class OrderServices {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', orderServices.get)
    this.router.post('/', orderServices.post)
    this.router.put('/:id', orderServices.put)
    this.router.delete('/:id', orderServices.delete)
  }
}