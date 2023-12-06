export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    user_level: string;
    status: string;
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
    start_date: string,
    end_date: string,
    transaction_amount: number,
    transaction_status: string,
    payment_method: string,
    status: string,
}

export interface ICustomers{
    id: number,
    fullName: string,
    email: string,
    phone_number: string,
    status: string,
    created_at: string,
    updated_at: string,
}

export interface IVenues{
    id: number,
    venue_name: string,
    description: string,
    price: string,
    limit: number,
    place_name: string,
    theme_name: string,
}

export interface ICategories{
    id: number,
    name: string,
    updated_at: string,
    created_at: string
}


export interface PullUsersArr extends Array<PullUsers>{}
export interface TransactionArr extends Array<ITransaction>{}
export interface CustomersArr extends Array<ICustomers>{}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    session: any,
    transactions: TransactionArr, 
    users:PullUsersArr;
    
};
