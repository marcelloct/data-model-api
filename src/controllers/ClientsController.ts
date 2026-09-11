import { knx } from '@/database/knex.js';
import { AppError } from '@/utils/AppError.js';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

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

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        email: z.email().trim(),
        cpf: z.string().trim().min(11).max(11),
        phone_number: z.string().trim().min(8).max(12),
        street: z.string().trim(),
        address_number: z.string().trim(),
        cep: z.string().trim().min(8).max(8),
        district: z.string().trim(),
      });

      const {
        name,
        email,
        cpf,
        phone_number,
        street,
        address_number,
        cep,
        district,
      } = bodySchema.parse(request.body);

      await knx.transaction(async (trx) => {
        const [clientId] = await trx<ClientsRepository>('clients').insert({
          name,
          email,
          cpf,
        });

        await trx('clients_addresses').insert({
          client_id: clientId,
          street,
          address_number,
          cep,
          district,
        });

        await trx('clients_phones').insert({
          client_id: clientId,
          phone_number,
        });
      });
      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const client_id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'id must be a number' })
        .parse(request.params.client_id); // validate and garantee that id is a number

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        email: z.email().trim(),
        cpf: z.string().trim().min(11).max(11),
        phone_number: z.string().trim().min(8).max(12),
        street: z.string().trim(),
        address_number: z.string().trim(),
        cep: z.string().trim().min(8).max(8),
        district: z.string().trim(),
      });

      const {
        name,
        email,
        cpf,
        phone_number,
        street,
        address_number,
        cep,
        district,
      } = bodySchema.parse(request.body);

      const client = await knx('clients').select().where({ client_id }).first();

      if (!client) throw new AppError('Client not found');

      await knx.transaction(async (trx) => {
        await trx<ClientsRepository>('clients')
          .update({
            name,
            email,
            cpf,
            updated_at: knx.fn.now(),
          })
          .where({ client_id });

        await trx('clients_addresses')
          .update({
            street,
            address_number,
            cep,
            district,
          })
          .where({ client_id });

        await trx('clients_phones')
          .update({
            phone_number,
          })
          .where({ client_id });
      });

      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const client_id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'id must be a number' })
        .parse(request.params.client_id); // validate and garantee that id is a number

      const client = await knx('clients').where({ client_id }).first();

      if (!client) throw new AppError('Client not found');

      await knx('clients').delete().where({ client_id });
      return response.json();
    } catch (error) {
      next(error);
    }
  }
}
