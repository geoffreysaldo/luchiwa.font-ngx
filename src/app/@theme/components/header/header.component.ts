import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils/layout.service';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/pages/auth/models/user.model';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthAdminService } from 'app/pages/admin/services/auth-admin.service';
import { Store } from '@ngrx/store';
import * as shoppingListActions from 'app/store/shopping-list/shopping-list.actions';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() public admin;
  //@Output() toogleSideBarStateEmitter = new EventEmitter();
  //public toogleSideBarState: boolean = false;
  public isAuthenticated = false;
  public fullname: string;
  public articleNumber: number = 0;
  public userSub: Subscription;
  public adminSub: Subscription;
  private destroy$: Subject<void> = new Subject<void>();
  public userPictureOnly: boolean = false;
  public user: any;
  public userMenu;
  public adminMenu;
  public currentTheme = 'default';
  public isHide: boolean= false;


  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private layoutService: LayoutService,
              private authService: AuthService,
              private authAdminService: AuthAdminService,
              private router: Router,
              private store: Store<{shoppingList: {shoppingList: shoppingListActions.ShoppingListPayload[]}}>
              ) {
  }

  ngOnInit() {
    if(!this.admin) {
    this.userMenu = [ { title: 'Mon profile' }, { title: 'Mes commandes'}, { title: 'Se déconnecter' },];
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated){
        this.fullname = user.lastname + " " + user.firstname + " ";
        this.menuService.onItemClick()
      .pipe(
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        switch(title) {
          case "Mon profile":
            this.router.navigate(['/auth/profile']);
            break;
          case "Mes commandes":
            //
            break;
          case "Se déconnecter":
            this.authService.logout();
        }
      });
      } else {
        this.fullname = null;
      }
    })
    this.store.select('shoppingList').subscribe((shoppingList) => {
      this.articleNumber = 0;
      shoppingList.shoppingList.map((shoppingListItem) => {
        this.articleNumber += shoppingListItem.quantity;
      })
    })
  } 
  if(this.admin){
    this.adminMenu = [ { title: 'Mon profile' }, { title: 'Mes produits'}, { title: 'Se déconnecter' },];
    this.adminSub = this.authAdminService.admin.subscribe(admin => {
      this.isAuthenticated = !!admin;
      if(this.isAuthenticated){
        this.menuService.onItemClick()
        .pipe(
          map(({ item: { title } }) => title),
        )
        .subscribe(title => {
          switch(title) {
            case "Mon profile":
              this.router.navigate(['/admin/profile']);
              break;
            case "Mes Produits":
              this.router.navigate(['/admin/produits'])  
            case "Se déconnecter":
              this.authAdminService.logout();
          }
        });
      }
    })
  }
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

/*toggleShoppingListSideBar(): boolean {
    this.toogleSideBarState = !this.toogleSideBarState;
    this.sidebarService.toggle(true, 'shopping-list-sidebar');
    this.toogleSideBarStateEmitter.emit(this.toogleSideBarState);
    this.layoutService.changeLayoutSize();

    return false;
  }*/

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  toggleHideShoppingList() {
    this.isHide = !this.isHide; 
  }
}
