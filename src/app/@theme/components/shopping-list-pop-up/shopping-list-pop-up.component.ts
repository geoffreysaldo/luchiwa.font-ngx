import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as shoppingListActions from 'app/store/shopping-list/shopping-list.actions';


@Component({
  selector: 'shopping-list-pop-up',
  templateUrl: './shopping-list-pop-up.component.html',
  styleUrls: ['./shopping-list-pop-up.component.scss']
})
export class ShoppingListPopUpComponent implements OnInit {
  public _articleNumber: number;
  public price: number = 0
  shoppingList: shoppingListActions.ShoppingListPayload[];
  @Input() set articleNumber(value: number){
    this._articleNumber = value
  };
  constructor(private store: Store<{shoppingList: {shoppingList: shoppingListActions.ShoppingListPayload[]}}>) { }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((shoppingList) => {
      this.shoppingList = shoppingList.shoppingList;
      if(this.shoppingList.length > 0) {
      this.price = this.shoppingList
        .map((shoppingListItem) => shoppingListItem.product.totalTaxInclusive * shoppingListItem.quantity)
        .reduce((x,y) => x + y)
      }
    })
  }

  add(id, product) {
    this.store.dispatch(new shoppingListActions.AddProduct({id: id, product: product, quantity: 1}))
  }

  substract(id, product) {
    this.store.dispatch(new shoppingListActions.SubstractProduct({id: id, product: product, quantity: 1}))

  }

}
