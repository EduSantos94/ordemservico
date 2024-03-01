import orders from "@/services/orders"
import { Router } from "express"


export default new class Orders {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', orders.get)
    this.router.post('/', orders.post)
    this.router.put('/:id', orders.put)
    this.router.delete('/:id', orders.delete)
  }
}