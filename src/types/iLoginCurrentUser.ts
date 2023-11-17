export interface ILoginCurrentUser {
    email: string;
    password: string;
}

export interface ILoginCurrentUserData {
    accessToken: string;
    refreshToken: string;
    success?: boolean;
    user: {
        email: string;
        name: string;
        password?: string;
    }
}