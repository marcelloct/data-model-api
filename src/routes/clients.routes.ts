import { ClientsController } from '@/controllers/ClientsController.js';
import { Router } from 'express';

const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.get('/', clientsController.index);
clientsRoutes.get('/:client_id', clientsController.show);
clientsRoutes.post('/', clientsController.create);
clientsRoutes.patch('/:client_id', clientsController.update);
clientsRoutes.delete('/:client_id', clientsController.remove);

export { clientsRoutes };
