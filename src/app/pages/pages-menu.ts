import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Produit',
    icon: 'shopping-cart-outline',
    children:[
      {
        title: 'Entrées',
        link: 'produits/entrees',
      },
      {
        title: 'Plats',
        children:[
          
        ]
      }
    ]
  },
];
