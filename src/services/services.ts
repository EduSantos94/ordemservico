import { Request, Response } from 'express';
import knex from '@/database';

export default new class Services {
  public async get(request: Request, response: Response) {
    try {
      let serviceData;

      if (request.params.service_id) {
        serviceData = await knex('services')
          .where('service_id', request.params.service_id)
          .first()
          .select('*');
      } else {
        serviceData = await knex('services').select('*');
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
    const { name, price } = request.body;
    try {
      const [newServiceData] = await knex('services')
        .returning('*')
        .insert({
          name,
          price,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ service: newServiceData });
    } catch (error) {
      console.error('Error creating service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.service_id;
    const { name, price } = request.body;
    try {
      const [updatedServiceData] = await knex('services')
        .returning('*')
        .where('service_id', id)
        .update({
          name,
          price,
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
    const id = request.params.service_id;

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
