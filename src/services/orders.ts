import { Request, Response } from 'express';
import knex from '@/database';

export default new class Orders {
  public async get(request: Request, response: Response) {
    try {
      let orderData;

      if (request.params.id) {
        orderData = await knex('orders')
          .where('order_id', request.params.id)
          .first()
          .select('*')
          .join('users as providers', 'orders.provider_id', '=', 'providers.user_id')
          .join('users as clients', 'orders.client_id', '=', 'clients.user_id');
      } else {
        orderData = await knex('orders')
          .select('*')
          .join('users as providers', 'orders.provider_id', '=', 'providers.user_id')
          .join('users as clients', 'orders.client_id', '=', 'clients.user_id');
      }

      if (orderData) {
        response.json({ order: orderData });
      } else {
        response.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.error('Error retrieving order:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { name, provider_id, client_id, price, is_done, is_paid, context } = request.body;
    try {
      const [newOrderData] = await knex('orders')
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

      response.status(201).json({ order: newOrderData });
    } catch (error) {
      console.error('Error creating order:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.id;
    const { name, provider_id, client_id, price, is_done, is_paid, context } = request.body;
    try {
      const [updatedOrderData] = await knex('orders')
        .returning('*')
        .where('order_id', id)
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

      if (updatedOrderData) {
        response.json({ order: updatedOrderData });
      } else {
        response.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deletedOrderData = await knex('orders')
        .returning('*')
        .where('order_id', id)
        .del();

      if (deletedOrderData.length > 0) {
        response.json({ message: 'Order deleted successfully' });
      } else {
        response.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
