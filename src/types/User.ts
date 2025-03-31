export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    created_at?: Date;
}

export interface UserAdmins {
    id?: number;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
}
