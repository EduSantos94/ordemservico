import { Request, Response } from 'express';
import knex from '@/database';

export default new class Services {
  public async get(request: Request, response: Response) {
    try {
      let serviceData;

      if (request.params.id) {
        serviceData = await knex('services')
          .where('service_id', request.params.id)
          .first()
          .select('*')
          .join('users as providers', 'services.provider_id', '=', 'providers.user_id')
          .join('users as clients', 'services.client_id', '=', 'clients.user_id');
      } else {
        serviceData = await knex('services')
          .select('*')
          .join('users as providers', 'services.provider_id', '=', 'providers.user_id')
          .join('users as clients', 'services.client_id', '=', 'clients.user_id');
      }

      if (serviceData) {
        response.json({ service: serviceData });
      } else {
        response.status(404).json({ message: 'Service not found' });
      }
    } catch (error) {
      console.error('Error retrieving service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { name, provider_id, client_id, price, is_done, is_paid, context } = request.body;
    try {
      const [newServiceData] = await knex('services')
        .returning('*')
        .insert({
          name,
          provider_id,
          client_id,
          price,
          is_done: is_done || false,
          is_paid: is_paid || false,
          context,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ service: newServiceData });
    } catch (error) {
      console.error('Error creating service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.id;
    const { name, provider_id, client_id, price, is_done, is_paid, context } = request.body;
    try {
      const [updatedServiceData] = await knex('services')
        .returning('*')
        .where('service_id', id)
        .update({
          name,
          provider_id,
          client_id,
          price,
          is_done: is_done || false,
          is_paid: is_paid || false,
          context,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedServiceData) {
        response.json({ service: updatedServiceData });
      } else {
        response.status(404).json({ message: 'Service not found' });
      }
    } catch (error) {
      console.error('Error updating service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deletedServiceData = await knex('services')
        .returning('*')
        .where('service_id', id)
        .del();

      if (deletedServiceData.length > 0) {
        response.json({ message: 'Service deleted successfully' });
      } else {
        response.status(404).json({ message: 'Service not found' });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
