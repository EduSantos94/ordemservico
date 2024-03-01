import { Request, Response } from 'express';
import knex from '@/database';

export default new class OrderServices {
  public async get(request: Request, response: Response) {
    try {
      let orderServiceData;

      if (request.params.order_service_id) {
        orderServiceData = await knex('order_services')
          .where('order_service_id', request.params.order_service_id)
          .first()
          .select('*')
          .join('orders', 'order_services.order_id', '=', 'orders.order_id')
          .join('services', 'order_services.service_id', '=', 'services.service_id');
      } else {
        orderServiceData = await knex('order_services')
          .select('*')
          .join('orders', 'order_services.order_id', '=', 'orders.order_id')
          .join('services', 'order_services.service_id', '=', 'services.service_id');
      }

      if (orderServiceData) {
        response.json({ order_service: orderServiceData });
      } else {
        response.status(404).json({ message: 'Order service not found' });
      }
    } catch (error) {
      console.error('Error retrieving order service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { order_id, service_id } = request.body;
    try {
      const [newOrderServiceData] = await knex('order_services')
        .returning('*')
        .insert({
          order_id,
          service_id,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ order_service: newOrderServiceData });
    } catch (error) {
      console.error('Error creating order service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.order_service_id;
    const { order_id, service_id } = request.body;
    try {
      const [updatedOrderServiceData] = await knex('order_services')
        .returning('*')
        .where('order_service_id', id)
        .update({
          order_id,
          service_id,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedOrderServiceData) {
        response.json({ order_service: updatedOrderServiceData });
      } else {
        response.status(404).json({ message: 'Order service not found' });
      }
    } catch (error) {
      console.error('Error updating order service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.order_service_id;

    try {
      const deletedOrderServiceData = await knex('order_services')
        .returning('*')
        .where('order_service_id', id)
        .del();

      if (deletedOrderServiceData.length > 0) {
        response.json({ message: 'Order service deleted successfully' });
      } else {
        response.status(404).json({ message: 'Order service not found' });
      }
    } catch (error) {
      console.error('Error deleting order service:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
