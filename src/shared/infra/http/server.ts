import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import swaggerDocs from '../../swagger.json';

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Active 😡');
});
