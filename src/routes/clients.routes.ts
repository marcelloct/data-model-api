import { ClientsController } from '@/controllers/ClientsController.js';
import { Router } from 'express';

const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.get('/', clientsController.index);
clientsRoutes.get('/:client_id', clientsController.show);

export { clientsRoutes };
