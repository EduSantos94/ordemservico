import services from "@/services/services"
import { Router } from "express"


export default new class Services {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', services.get)
    this.router.post('/', services.post)
    this.router.put('/:id', services.put)
    this.router.delete('/:id', services.delete)
  }
}