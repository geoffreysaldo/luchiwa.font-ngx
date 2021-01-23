import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  public categories;
  public dishesLinks = [];
  public menu: NbMenuItem[] = [];
  constructor(private route: ActivatedRoute){
  }

  ngOnInit() {
    this.route.data.subscribe((data: { categories: string[]}) => {
      this.categories = data.categories;
      this.categories.map((category) => {
        this.dishesLinks.push({
          title: category.categoryName,
          link: 'produits/plats/' + category.categoryUrl,
        })
      })
    });
    this.buildMenu();
  }

  buildMenu() {
    this.menu.push({
      title: 'Produit',
      icon: 'shopping-cart-outline',
      children:[
        {
          title: 'Entrées',
          link: 'produits/entrees',
        },
        {
          title: 'Plats',
          children:this.dishesLinks,
        }
      ]
    });
  }
}
