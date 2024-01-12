import serviceProducts from "@/services/serviceProducts"
import { Router } from "express"


export default new class ServiceProducts {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', serviceProducts.get)
    this.router.post('/', serviceProducts.post)
    this.router.put('/:id', serviceProducts.put)
    this.router.delete('/:id', serviceProducts.delete)
  }
}