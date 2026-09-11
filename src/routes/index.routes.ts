import { Router } from 'express';
import { clientsRoutes } from './clients.routes.js';

const routes = Router();

routes.use('/clients', clientsRoutes);

export { routes };
