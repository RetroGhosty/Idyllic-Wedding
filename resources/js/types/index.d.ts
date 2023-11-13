export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    user_level: string;
}

export interface PullUsers{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    user_level: string;
}

export interface ITransaction{
    id: string,
    customer_id: number,
    venue_id: number,
    event_date: string,
    transaction_amount: number,
    transaction_status: string,
    payment_method: string,
    status: string,
}


export interface PullUsersArr extends Array<PullUsers>{}
export interface TransactionArr extends Array<ITransaction>{}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    session: any,
    transactions: TransactionArr, 
    users:PullUsersArr;
    
};
