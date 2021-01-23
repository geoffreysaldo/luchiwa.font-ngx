import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as shoppingListActions from 'app/store/shopping-list/shopping-list.actions';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() id;
  public quantityForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{shoppingList: {shoppingList: shoppingListActions.ShoppingListPayload[]}}>) {
    this.quantityForm = this.formBuilder.group({
      quantity: [{value:0, disabled:false},[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  public minus() {
    if(this.quantity.value > 0){
      this.quantityForm.controls.quantity.setValue(this.quantity.value - 1)
    }
  }

  public plus() {
    this.quantityForm.controls.quantity.setValue(this.quantity.value + 1)
  }

  public get quantity() {
    return this.quantityForm.controls.quantity as FormControl;
  }

  public add(){
    if(this.quantity.value === 0 || isNaN(parseInt(this.quantity.value))) {
      return;
    }
    this.store.dispatch(new shoppingListActions.AddProduct({id: this.id, product: this.product, quantity: parseInt(this.quantity.value)}))
  }

}
