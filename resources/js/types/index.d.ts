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
export interface PullUsersArr extends Array<PullUsers>{}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

    users:PullUsersArr;
    
};
