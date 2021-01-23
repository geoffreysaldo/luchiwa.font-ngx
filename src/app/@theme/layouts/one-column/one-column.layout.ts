import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: 'one-column.layout.html',
})
export class OneColumnLayoutComponent{
  @Input() admin;
  /*public shoppingListSideBar: boolean = false;
  
  toggleSideBar($event){
    this.shoppingListSideBar = $event
  }*/
}
