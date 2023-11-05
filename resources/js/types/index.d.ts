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

export interface IReservation{
    id: string,
    customer_id: number,
    venue_id: number,
    total_price: number,
    event_date: string,
    payment_method: string,
    payment_proof: string,
    status: string,
}


export interface PullUsersArr extends Array<PullUsers>{}
export interface ReservationArr extends Array<IReservation>{}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

    reservations: ReservationArr, 
    users:PullUsersArr;
    
};
