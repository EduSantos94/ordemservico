import { Request, Response } from 'express';
import knex from '@/database';

export default new class OrderProducts {
  public async get(request: Request, response: Response) {
    try {
      let orderProductsData;

      if (request.params.order_id) {
        orderProductsData = await knex('order_products')
          .where('order_id', request.params.order_id)
          .select('*');
      } else {
        orderProductsData = await knex('order_products').select('*');
      }

      if (orderProductsData) {
        response.json({ order_products: orderProductsData });
      } else {
        response.status(404).json({ message: 'Order products not found' });
      }
    } catch (error) {
      console.error('Error retrieving order products:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { order_id, product_id, price } = request.body;
    try {
      const [newOrderProductData] = await knex('order_products')
        .returning('*')
        .insert({
          order_id,
          product_id,
          price,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ order_product: newOrderProductData });
    } catch (error) {
      console.error('Error creating order product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const { order_id, product_id, price } = request.body;
    try {
      const [updatedOrderProductData] = await knex('order_products')
        .returning('*')
        .where('order_id', order_id)
        .andWhere('product_id', product_id)
        .update({
          price,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedOrderProductData) {
        response.json({ order_product: updatedOrderProductData });
      } else {
        response.status(404).json({ message: 'Order product not found' });
      }
    } catch (error) {
      console.error('Error updating order product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const { order_id, product_id } = request.params;

    try {
      const deletedOrderProductData = await knex('order_products')
        .returning('*')
        .where('order_id', order_id)
        .andWhere('product_id', product_id)
        .del();

      if (deletedOrderProductData.length > 0) {
        response.json({ message: 'Order product deleted successfully' });
      } else {
        response.status(404).json({ message: 'Order product not found' });
      }
    } catch (error) {
      console.error('Error deleting order product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
