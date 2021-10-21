import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ITransaction } from '../../interfaces/ITransaction';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type TransactionModel = Model<ITransaction & Document>;
  }
}
