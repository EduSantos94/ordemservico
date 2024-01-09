import exampleService from "@/services/exampleService"
import { Router } from "express"


class ExampleController{
  router = Router()

  constructor(){
    this.initRoutes()
  }

  initRoutes(){
    this.router.get('/ok', exampleService.getExample)
    this.router.post('/error', exampleService.getExampleError)
    this.router.post('/database', exampleService.getExampleDatabase)
  }
}

export default new ExampleController()