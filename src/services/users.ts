import { Request, Response } from 'express';
import knex from '@/database';

export default new class Users {
  public async get(request: Request, response: Response) {
    try {
      let userData;
  
      if (request.params.id) {
        userData = await knex('users')
          .where('user_id', request.params.id)
          .first()
          .select(
            'users.*',
            'companies.name as company',
            'plans.name as plan'
          )
          .join('companies', 'users.company_id', '=', 'companies.company_id')
          .join('plans', 'companies.plan_id', '=', 'plans.plan_id');
      } else {
        userData = await knex('users')
          .select(
            'users.*',
            'companies.name as company_name',
            'plans.name as plan_name'
          )
          .join('companies', 'users.company_id', '=', 'companies.company_id')
          .join('plans', 'companies.plan_id', '=', 'plans.plan_id');
      }
  
      if (userData) {
        response.json({ user: userData });
      } else {
        response.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { company_id, name, email, password, phone, type } = request.body;
    try {
      const [newUserData] = await knex('users')
        .returning('*')
        .insert({
          company_id,
          name,
          email,
          password,
          phone,
          type,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ user: newUserData });
    } catch (error) {
      console.error('Error creating user:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.id;
    const { company_id, name, email, password, phone, type } = request.body;
    try {
      const [updatedUserData] = await knex('users')
        .returning('*')
        .where('user_id', id)
        .update({
          company_id,
          name,
          email,
          password,
          phone,
          type,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedUserData) {
        response.json({ user: updatedUserData });
      } else {
        response.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deletedUserData = await knex('users')
        .returning('*')
        .where('user_id', id)
        .del();

      if (deletedUserData.length > 0) {
        response.json({ message: 'User deleted successfully' });
      } else {
        response.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
