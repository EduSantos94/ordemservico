import plans from "@/services/plans"
import { Router } from "express"


export default new class Plans {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', plans.get)
    this.router.post('/', plans.post)
    this.router.put('/:id', plans.put)
    this.router.delete('/:id', plans.delete)
  }
}