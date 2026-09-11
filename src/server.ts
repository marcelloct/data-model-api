import express from 'express';
import { errorHandling } from './middlewares/errorHandling.js';
import { routes } from './routes/index.routes.js';
const PORT = 3333;

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandling);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
