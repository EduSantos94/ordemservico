import orderImages from "@/services/orderImages"
import { Router } from "express"


export default new class OrderImages {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', orderImages.get)
    this.router.post('/', orderImages.post)
    this.router.put('/:id', orderImages.put)
    this.router.delete('/:id', orderImages.delete)
  }
}