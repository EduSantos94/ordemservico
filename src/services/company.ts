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

  public async post(request: Request, response: Response) {
    const { name, plan_id } = request.body;
    try {
      const [newCompanyData] = await knex('companies')
        .returning('*')
        .insert({
          name,
          plan_id,
          created_at: Math.floor(Date.now() / 1000),
        });
      response.status(201).json({ company: newCompanyData });
    } catch (error) {
      console.error('Error creating company:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.id;
    const { name, plan_id } = request.body;
    try {
      const [updatedCompanyData] = await knex('companies')
        .returning('*')
        .where('company_id', id)
        .update({
          name,
          plan_id,
          updated_at: Math.floor(Date.now() / 1000),
        });
  
      if (updatedCompanyData) {
        response.json({ company: updatedCompanyData });
      } else {
        response.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      console.error('Error updating company:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deletedCompanyData = await knex('companies')
        .returning('*')
        .where('company_id', id)
        .del();

      if (deletedCompanyData.length > 0) {
        response.json({ message: 'Company deleted successfully' });
      } else {
        response.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
