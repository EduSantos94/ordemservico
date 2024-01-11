import companies from "@/services/companies"
import { Router } from "express"


export default new class Companies {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', companies.get)
    this.router.post('/', companies.post)
    this.router.put('/:id', companies.put)
    this.router.delete('/:id', companies.delete)
  }
}