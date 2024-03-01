import { Request, Response } from 'express';
import knex from '@/database';

export default new class OrderImages {
  public async get(request: Request, response: Response) {
    try {
      let OrderImagesData;

      if (request.params.order_id) {
        OrderImagesData = await knex('order_images')
          .where('order_id', request.params.order_id)
          .select('*');
      } else {
        OrderImagesData = await knex('order_images').select('*');
      }

      if (OrderImagesData) {
        response.json({ order_images: OrderImagesData });
      } else {
        response.status(404).json({ message: 'Order pictures not found' });
      }
    } catch (error) {
      console.error('Error retrieving order pictures:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { order_id, picture_url } = request.body;
    try {
      const [newOrderPictureData] = await knex('order_images')
        .returning('*')
        .insert({
          order_id,
          picture_url,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ order_images: newOrderPictureData });
    } catch (error) {
      console.error('Error creating order picture:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const { order_id, picture_url } = request.body;
    try {
      const [updatedOrderPictureData] = await knex('order_images')
        .returning('*')
        .where('order_id', order_id)
        .update({
          picture_url,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedOrderPictureData) {
        response.json({ order_pictures: updatedOrderPictureData });
      } else {
        response.status(404).json({ message: 'Order picture not found' });
      }
    } catch (error) {
      console.error('Error updating order picture:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const { order_picture_id } = request.params;

    try {
      const deletedOrderPictureData = await knex('order_images')
        .returning('*')
        .where('order_picture_id', order_picture_id)
        .del();

      if (deletedOrderPictureData.length > 0) {
        response.json({ message: 'Order picture deleted successfully' });
      } else {
        response.status(404).json({ message: 'Order picture not found' });
      }
    } catch (error) {
      console.error('Error deleting order picture:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
