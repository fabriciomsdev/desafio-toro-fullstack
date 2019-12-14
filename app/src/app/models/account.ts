import { User } from './user';
import { Operation } from './operations';
import { Order } from './order';

export class OrdersGroup {
         sells: Array<Order> = [];
         boughts: Array<Order> = [];
       }

export class OperationsGroup {
         draws: Array<Operation> = [];
         deposits: Array<Operation> = [];
       }

export class Account {
         user = new User();
         balance = 0;
         operations: OperationsGroup = new OperationsGroup();
         orders: OrdersGroup = new OrdersGroup();

         setOrders(orders: OrdersGroup) {
           this.orders = orders;
           this.calculateBalance();
           return this;
         }

         setOperations(operations: OperationsGroup) {
           this.operations = operations;
           this.calculateBalance();
           return this;
         }

         canUserRemoveValueOfAccount(value: number) {
           return this.balance >= value;
         }

         calculateBalance() {
           this.balance = 0;
           
           this.operations.deposits.map(deposit => {
             this.balance = this.balance + deposit.value;
           });

           this.operations.draws.map(draw => {
             this.balance = this.balance - draw.value;
           });

           return this.balance;
         }

         clearValues() {
           this.setOrders(new OrdersGroup);
           this.setOperations(new OperationsGroup);
         }
       }