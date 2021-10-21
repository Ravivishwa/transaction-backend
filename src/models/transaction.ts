import { ITransaction } from '../interfaces/ITransaction';
import mongoose from 'mongoose';

const Transaction = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
    },
		description: {
      type: String,
      required: true,
    },
		amount: {
      type: String,
      required: true,
    },
		type: {
      type: String,
      required: true,
    },
    user :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  }
  },
  { timestamps: true },
);

export default mongoose.model<ITransaction & mongoose.Document>('Transaction', Transaction);
