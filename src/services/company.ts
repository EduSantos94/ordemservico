import { Request, Response } from 'express';
import knex from '@/database';

export default new class Company {
  public async get(request: Request, response: Response) {
    const id = request.params.id;
    try {
      const companyData = await knex('companies').where('company_id', id).first();

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

  public async getExampleError(request: Request, response: Response) {
    response.status(400).json({ message: 'Example Route Error' });
  }
}
