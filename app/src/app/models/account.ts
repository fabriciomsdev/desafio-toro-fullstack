import { User } from './user';
import { Transaction } from './transactions';

export class Account {
         user = new User();
         balance = 0;
         transactions: Array<Transaction> = [];
         pappers: Array<Transaction> = [];
    
         canUserRemoveValueOfAccount(value: number) {
           return this.balance >= value;
         }
       }