import users from "@/services/users"
import { Router } from "express"


export default new class Companies {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/:id?', users.get)
    this.router.post('/', users.post)
    this.router.put('/:id', users.put)
    this.router.delete('/:id', users.delete)
  }
}