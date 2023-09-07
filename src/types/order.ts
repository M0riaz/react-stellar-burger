import {IIngredient} from "./ingridient";

export interface IOrder {
    createdAt: string;
    ingredients: IIngredient[];
    name: string;
    number: number;
    owner: IOwner;
    price: number;
    updatedAt: string;
    _id: string;
}


export interface IOrderRequest {
    name: string;
    order: IOrder;
    success: boolean;
}

export interface IOwner {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string
}
export interface IOrderFromList {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}