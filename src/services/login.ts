import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import crypto from 'crypto';
import knex from '@/database';

export default new class Login {
  public async post(request: Request, response: Response) {
    let user;
    let _user_token = {};
    try {
      user = await knex('users')
      .where('email', request.body.email)
      .andWhere('password', crypto.createHash('sha512').update(request.body.password).digest('hex'))
      .first()
      .select('*');
      if (user) {
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
          expiresIn: 86400
        });
        _user_token = {
          token,
          user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            type: user.type
          },
        };
      }
      response.status(201).json({ token: _user_token });
    } catch (error) {
      console.error('Error creating user:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
    return _user_token;
  }
}
