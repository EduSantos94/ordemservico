import {Request,Response} from 'express'
const {Client, QueryResult} = require('pg')
const dotenv = require("dotenv");
dotenv.config();

class ExampleService {
  public async getExample(request: Request, response: Response){
    response.json({message: 'Example Route Ok'})
  }

  public async getExampleError(request: Request, response: Response){
    response.status(400).json({message: 'Example Route Error'})
  }

  public async getExampleDatabase(request: Request, response: Response){
    response.json({message: 'Example Route Ok'})
  }
}

export default new ExampleService()