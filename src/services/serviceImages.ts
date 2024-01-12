import { Request, Response } from 'express';
import knex from '@/database';

export default new class ServiceProducts {
  public async get(request: Request, response: Response) {
    try {
      let servicePicturesData;

      if (request.params.service_id) {
        servicePicturesData = await knex('service_pictures')
          .where('service_id', request.params.service_id)
          .select('*');
      } else {
        servicePicturesData = await knex('service_pictures').select('*');
      }

      if (servicePicturesData) {
        response.json({ service_pictures: servicePicturesData });
      } else {
        response.status(404).json({ message: 'Service pictures not found' });
      }
    } catch (error) {
      console.error('Error retrieving service pictures:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { service_id, picture_url } = request.body;
    try {
      const [newServicePictureData] = await knex('service_pictures')
        .returning('*')
        .insert({
          service_id,
          picture_url,
          created_at: Math.floor(Date.now() / 1000),
        });

      response.status(201).json({ service_picture: newServicePictureData });
    } catch (error) {
      console.error('Error creating service picture:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const { service_id, picture_url } = request.body;
    try {
      const [updatedServicePictureData] = await knex('service_pictures')
        .returning('*')
        .where('service_id', service_id)
        .update({
          picture_url,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedServicePictureData) {
        response.json({ service_picture: updatedServicePictureData });
      } else {
        response.status(404).json({ message: 'Service picture not found' });
      }
    } catch (error) {
      console.error('Error updating service picture:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const { service_picture_id } = request.params;

    try {
      const deletedServicePictureData = await knex('service_pictures')
        .returning('*')
        .where('service_picture_id', service_picture_id)
        .del();

      if (deletedServicePictureData.length > 0) {
        response.json({ message: 'Service picture deleted successfully' });
      } else {
        response.status(404).json({ message: 'Service picture not found' });
      }
    } catch (error) {
      console.error('Error deleting service picture:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
