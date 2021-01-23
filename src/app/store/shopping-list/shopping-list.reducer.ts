import { Action } from '@ngrx/store';
import * as shoppingListActions from './shopping-list.actions';
const initialState = {
    shoppingList: []
};


export function shoppingListReducer(state = initialState, action: shoppingListActions.ShoppingListActions) {
    console.log(action)
    switch(action.type) {
        case shoppingListActions.ADD_PRODUCT:
            if(state.shoppingList.find((shoppingListItem) => shoppingListItem.id === action.payload.id)) {
                return {
                    ...state,
                    shoppingList: state.shoppingList.map((shoppingListItem) => shoppingListItem.id === action.payload.id ? {id:shoppingListItem.id, product: shoppingListItem.product, quantity: shoppingListItem.quantity + action.payload.quantity} : shoppingListItem)
                }
            } 
            return {
                ...state,
                shoppingList: [...state.shoppingList, action.payload],
            }
        case shoppingListActions.SUBSTRACT_PRODUCT:
            const item = state.shoppingList.find((shoppingListItem) => shoppingListItem.id === action.payload.id);
            console.log(item)
            if(item.quantity === 1) {
                return {
                    ...state,
                shoppingList: state.shoppingList.filter((shoppingListItem) => shoppingListItem.id !== action.payload.id)
                }
            }
            return {
                ...state,
                shoppingList: state.shoppingList.map((shoppingListItem) => shoppingListItem.id === action.payload.id ? {id:shoppingListItem.id, product: shoppingListItem.product, quantity: shoppingListItem.quantity - action.payload.quantity} : shoppingListItem)
            }    
        default:
            return state;
    }
}