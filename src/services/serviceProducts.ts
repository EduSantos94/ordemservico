import { Request, Response } from 'express';
import knex from '@/database';

export default new class ServiceProducts {
  public async get(request: Request, response: Response) {
    try {
      let serviceProductsData;

      if (request.params.service_id) {
        serviceProductsData = await knex('service_products')
          .where('service_id', request.params.service_id)
          .select('*');
      } else {
        serviceProductsData = await knex('service_products').select('*');
      }

      if (serviceProductsData) {
        response.json({ service_products: serviceProductsData });
      } else {
        response.status(404).json({ message: 'Service products not found' });
      }
    } catch (error) {
      console.error('Error retrieving service products:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { service_id, product_id, price } = request.body;
    try {
      const [newServiceProductData] = await knex('service_products')
        .returning('*')
        .insert({
          service_id,
          product_id,
          price,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ service_product: newServiceProductData });
    } catch (error) {
      console.error('Error creating service product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const { service_id, product_id, price } = request.body;
    try {
      const [updatedServiceProductData] = await knex('service_products')
        .returning('*')
        .where('service_id', service_id)
        .andWhere('product_id', product_id)
        .update({
          price,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedServiceProductData) {
        response.json({ service_product: updatedServiceProductData });
      } else {
        response.status(404).json({ message: 'Service product not found' });
      }
    } catch (error) {
      console.error('Error updating service product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const { service_id, product_id } = request.params;

    try {
      const deletedServiceProductData = await knex('service_products')
        .returning('*')
        .where('service_id', service_id)
        .andWhere('product_id', product_id)
        .del();

      if (deletedServiceProductData.length > 0) {
        response.json({ message: 'Service product deleted successfully' });
      } else {
        response.status(404).json({ message: 'Service product not found' });
      }
    } catch (error) {
      console.error('Error deleting service product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
