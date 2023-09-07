export interface IOneOrder {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}

export interface IFeedOrders{
    orders: IOneOrder[],
    success:boolean,
    total : number,
    totalToday: number
}
