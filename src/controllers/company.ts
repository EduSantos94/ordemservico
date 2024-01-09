import company from "@/services/company"
import { Router } from "express"


export default new class Company {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id', company.get)
    this.router.post('/update', company.getExampleError)
  }
}