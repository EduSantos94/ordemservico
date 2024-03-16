import { Request, Response } from 'express';
import knex from '@/database';

export default new class Products {
  public async get(request: Request, response: Response) {
    let productData;
    try {
      if (request.params.id) {
        productData = await knex('products').where('product_id', request.params.id).first();
      } else {
        productData = await knex('products').select();
      }
      if (productData) {
        response.json({ product: productData });
      } else {
        response.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error retrieving product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { name, gtin, price } = request.body;
    try {
      const [newProductData] = await knex('products')
        .returning('*')
        .insert({
          name,
          gtin,
          price,
          created_at: Math.floor(Date.now() / 1000),
        });
      response.status(201).json({ product: newProductData });
    } catch (error) {
      console.error('Error creating product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.id;
    const { name, gtin } = request.body;
    try {
      const [updatedProductData] = await knex('products')
        .returning('*')
        .where('product_id', id)
        .update({
          name,
          gtin,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedProductData) {
        response.json({ product: updatedProductData });
      } else {
        response.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deletedProductData = await knex('products')
        .returning('*')
        .where('product_id', id)
        .del();

      if (deletedProductData.length > 0) {
        response.json({ message: 'Product deleted successfully' });
      } else {
        response.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
