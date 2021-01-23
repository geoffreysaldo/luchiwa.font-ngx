import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Product } from 'app/models/product.interface';
import { ProductsService } from 'app/services/products.service';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';

@Component({
  selector: 'ngx-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public productIndex: string;
  public product: Product;
  public categories;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private productsService: ProductsService,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { product: Product}) => {
      this.productIndex = data.product[0]._id;
      this.product = data.product[0]._source;
      console.log(this.product)
    });
    this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    }, (err) => {
      // TODO GESTION D'ERREURS
    })
  }

deleteProduct(){
  const dialogRef = this.dialogService.open(DeleteProductDialogComponent, {
    context: {
      name: this.product.name,
    },
  });

  dialogRef.componentRef.instance.cancelEventEmitter.subscribe(() => {
    dialogRef.close();
  })

  dialogRef.componentRef.instance.deleteEventEmitter.subscribe(() => {
    this.productsService.deleteProduct(this.productIndex).subscribe(
      (res) => {
        dialogRef.close();
        this.router.navigate(['/admin/produits/', this.product.type],  {state: { id: this.productIndex }}); // navigate to same route
        this.toastrService.success('Le produit ' + this.product.name + ' a été supprimé avec succès','Succès')
        },
      (err) => {
        dialogRef.close();
        this.toastrService.danger('Une erreur s\'est produite, le produit n\'a pas été supprimé');
      }
    )
  })
}

updateProduct(){
  const dialogRef = this.dialogService.open(UpdateProductDialogComponent, {
    hasBackdrop: false,
    context: {
      product: this.product, categories: this.categories,
    },
  });

  dialogRef.componentRef.instance.cancelEventEmitter.subscribe(() => {
    dialogRef.close();
  })

  dialogRef.componentRef.instance.updateEventEmitter.subscribe((product) => {
    product.id = this.productIndex;
    if(!product.imageUrl) {
      product.imageUrl = this.product.imageUrl;
    }
    this.productsService.updateProduct(product).subscribe((result) => {
      this.product = product;
      this.toastrService.success('Le produit ' + this.product.name + ' a été modifié avec succès', 'Succès')
      },
      (err) => {
        this.toastrService.danger('Une erreur s\'est produite, le produit n\'a pas été modifié', 'Échec');
      });    
    dialogRef.close();
  })
}

}
