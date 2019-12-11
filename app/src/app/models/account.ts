import { User } from './user';
import { Operation } from './operations';

export class Account {
         user = new User();
         balance = 0;
         operations: Array<Operation> = [];
         pappers: Array<Operation> = [];
    
         canUserRemoveValueOfAccount(value: number) {
           return this.balance >= value;
         }
       }