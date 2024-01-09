import {Request,Response} from 'express'
import { getClient } from '@/database'

let client = getClient()
client.connect()

export default new class Company {
  public async get(request: Request, response: Response){
    const id = request.params.id
    try {
      const result = await client.query('SELECT * FROM companies WHERE company_id = $1', [id]);
      const companyData = result.rows[0];

      if (companyData) {
        response.json({ company: companyData });
      } else {
        response.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      console.error('Error retrieving company:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getExampleError(request: Request, response: Response){
    response.status(400).json({message: 'Example Route Error'})
  }
}