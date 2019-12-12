import { User } from "./user";

export class Transaction{
    user: User;
    value: number;
    type: string;
    created_at;
}