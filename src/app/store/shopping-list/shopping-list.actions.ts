import { Action } from '@ngrx/store';
import { Product } from 'app/models/product.interface';


export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SUBSTRACT_PRODUCT = 'SUBSTRACT_PRODUCT';
export type ShoppingListActions = AddProduct | SubstractProduct ;

export interface ShoppingListPayload {
    id: string;
    product: Product;
    quantity: number;
}

export class AddProduct implements Action {
    readonly type = ADD_PRODUCT;
    constructor(public payload: ShoppingListPayload){
    }
}

export class SubstractProduct implements Action {
    readonly type = SUBSTRACT_PRODUCT;
    constructor(public payload: ShoppingListPayload){
    }
}
