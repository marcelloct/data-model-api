import { knx } from '@/database/knex.js';
import { AppError } from '@/utils/AppError.js';
import { NextFunction, Request, Response } from 'express';

export class ClientsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const clients = await knx('clients').orderBy('created_at', 'desc');
      return response.json(clients);
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { client_id } = request.params;

      const client = await knx('clients AS c')
        .select('c.client_id', 'c.name', 'c.email', 'c.cpf')
        .where({ client_id })
        .first();

      if (!client) throw new AppError('Client not found');

      const phones = await knx('clients_phones AS p')
        .select('p.phone_number')
        .where({ client_id });

      const addresses = await knx('clients_addresses AS a')
        .select('a.street', 'a.address_number', 'a.district', 'a.cep')
        .where({ client_id });

      return response.json({
        info: { ...client },
        phone: { ...phones },
        address: { ...addresses },
      });
    } catch (error) {
      next(error);
    }
  }
}
