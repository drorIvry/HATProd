import { Router } from 'express';
import path from 'path';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'build','index.html'));
});

export default routes;
