export interface IUserData {
    success?: boolean;
    user: {
        email: string;
        name: string;
        password?: string;
    }
}