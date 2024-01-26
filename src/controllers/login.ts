import login from "@/services/login"
import { Router } from "express"


export default new class Login {
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/', login.post)
  }
}