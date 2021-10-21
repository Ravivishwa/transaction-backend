import { Service, Inject } from 'typedi';
import { IUser} from '../interfaces/IUser';
import { ITransaction, ITransactionDTO } from '../interfaces/ITransaction';

@Service()
export default class TrsansactionService {
  constructor(
    @Inject('transactionModel') private transactionModel: Models.TransactionModel,
  ) {
  }

	public async GetAllTransactions(user: IUser):Promise< ITransaction[] >{		
		return this.transactionModel.find({user:user._id});
	}

	public async CreateTransaction(newTransaction: ITransactionDTO, user: IUser ):Promise<{}>{
		return this.transactionModel.create({
			...newTransaction,
			user:user._id
		});
	}

	public async deleteTransaction(id: string ):Promise<{}>{
		const record = this.transactionModel.findById({_id:id});
    if (!record) {
      throw new Error('Transaction not found');
    }
		return this.transactionModel.findByIdAndDelete({_id:id});
	}

	public async updateTransaction(payload:object, id:string ):Promise<{}>{
		const record = this.transactionModel.findById({_id:id});
    if (!record) {
      throw new Error('Transaction not found');
    }
		return  this.transactionModel.findByIdAndUpdate({_id:id}, payload, {new:true});
	}

 
}
