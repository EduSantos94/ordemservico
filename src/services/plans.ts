import { Request, Response } from 'express';
import knex from '@/database';

export default new class Plans {
  public async get(request: Request, response: Response) {
    let planData;
    try {
      if (request.params.id) {
        planData = await knex('plans').where('plan_id', request.params.id).first();
      } else {
        planData = await knex('plans').select();
      }
      if (planData) {
        response.json({ plan: planData });
      } else {
        response.status(404).json({ message: 'Plan not found' });
      }
    } catch (error) {
      console.error('Error retrieving plan:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async post(request: Request, response: Response) {
    const { name, duration_type, price } = request.body;
    try {
      const [newPlanData] = await knex('plans')
        .returning('*')
        .insert({
          name,
          duration_type,
          price,
          created_at: Math.floor(Date.now() / 1000),
        });
      response.status(201).json({ plan: newPlanData });
    } catch (error) {
      console.error('Error creating plan:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async put(request: Request, response: Response) {
    const id = request.params.id;
    const { name, duration_type, price } = request.body;
    try {
      const [updatedPlanData] = await knex('plans')
        .returning('*')
        .where('plan_id', id)
        .update({
          name,
          duration_type,
          price,
          updated_at: Math.floor(Date.now() / 1000),
        });

      if (updatedPlanData) {
        response.json({ plan: updatedPlanData });
      } else {
        response.status(404).json({ message: 'Plan not found' });
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const deletedPlanData = await knex('plans')
        .returning('*')
        .where('plan_id', id)
        .del();

      if (deletedPlanData.length > 0) {
        response.json({ message: 'Plan deleted successfully' });
      } else {
        response.status(404).json({ message: 'Plan not found' });
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
