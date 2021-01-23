import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';



@Component({
  selector: 'ngx-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})



export class AdminPageComponent implements OnInit {
  public items : NbMenuItem[] = [
    {
      title: 'Se connecter',
      icon: 'person-outline',
      link: 'connexion',
      home: true,
    },
    {
      title: 'Les produits',
      icon: 'music-outline',
      children:[
        {
          title: 'Liste de produits',
          children:[
            {
            title: 'Entrées',
            link: 'produits/entrees',
            },
            {
              title: 'Plats',
              link: 'produits/plats',
            }
          ]
        },
        {
          title: 'Ajouter un produit',
          link: 'produits/nouveau',
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
