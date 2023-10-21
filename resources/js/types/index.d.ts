export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    user_level: number;
}

export interface PullUsers{
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    user_level: number;
}
export interface PullUsersArr extends Array<PullUsers>{}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

    users:PullUsersArr;
    
};
