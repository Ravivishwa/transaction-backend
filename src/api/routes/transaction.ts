import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { mongo } from 'mongoose';
import AuthService from '../../services/auth';
import TransactionService from '../../services/transaction';
import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { ITransactionDTO } from '../../interfaces/ITransaction';

const route = Router();

export default (app: Router) => {
  app.use('/transaction', route);
  const transactionInstance = Container.get(TransactionService);

  route.get('/all', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling transactions endpoint with body: %o', req.body );
    try {      
      const transactions = await transactionInstance.GetAllTransactions(req.currentUser);
      return res.status(200).json(transactions);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.post('/add', 
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().required(),
        type: Joi.string().required(),
      }),
    }),
    middlewares.isAuth, 
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling transaction add endpoint with body: %o', req.body );
      try {
        const newTransaction = await transactionInstance.CreateTransaction(req.body as ITransactionDTO, req.currentUser);
        return res.status(200).json(newTransaction);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.put('/:id', 
  celebrate({
    body: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      amount: Joi.number(),
      type: Joi.string(),
    }),
  }),
  middlewares.isAuth, 
  middlewares.attachCurrentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling transaction update endpoint with body: %o', req.body );
    try {
      const updatedTransaction = await transactionInstance.updateTransaction(req.body as ITransactionDTO, req.params.id);
      return res.status(200).json(updatedTransaction);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
);

  route.delete('/:id', 
    middlewares.isAuth, 
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling transaction delete endpoint with body: %o', req.body );
      try {
        await transactionInstance.deleteTransaction(req.params.id);
        return res.status(200).json({success:true});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

};
