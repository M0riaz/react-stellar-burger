export interface IUpdateUser {
email: string;
name: string;
password: string;
}

export interface IUpdateUserData {
    success?: boolean;
    user: {
        email: string;
        name: string;
        password?: string;
    }
}