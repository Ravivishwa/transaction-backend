export interface ITransaction {
  _id: string;
  name: string;
  description: string;
  amount: number;
  type: string;
}

export interface ITransactionDTO {
  name: string;
  description: string;
  amount: number;
  type: string;
}
