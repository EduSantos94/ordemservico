import serviceImages from "@/services/serviceImages"
import { Router } from "express"


export default new class ServiceImages {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', serviceImages.get)
    this.router.post('/', serviceImages.post)
    this.router.put('/:id', serviceImages.put)
    this.router.delete('/:id', serviceImages.delete)
  }
}