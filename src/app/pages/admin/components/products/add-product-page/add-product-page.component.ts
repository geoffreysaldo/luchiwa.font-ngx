import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'ngx-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.scss']
})
export class AddProductPageComponent implements OnInit {
  public productForm: FormGroup;
  public filteredCategories;
  public categories;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastrService: NbToastrService) {
    this.productForm = this.formBuilder.group({
      name: [{value:'', disabled: false}, [Validators.required]],
      type: [{value:'', disabled: false}, [Validators.required]],
      category: [{value:'', disabled: false}, [Validators.required]],
      taxRate: [{value:'', disabled: false}, [Validators.required]],
      total: [{value:'', disabled: false}, [Validators.required]],
      totalTaxInclusive: [{value:'', disabled: false}, [Validators.required]],
      keywords: [{value:'', disabled: false}, [Validators.required]],
      description: [{value:'', disabled: false}, [Validators.required]],
      imageUrl: [{value: '', disabled: false}, [Validators.required]]
    })
    this.productForm.controls.total.disable();
   }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    }, (err) => {
      // TODO GESTION D'ERREURS
    })
    this.productForm.controls.category.valueChanges.subscribe((value) => {
      this.filteredCategories = this.categories.filter((category) => category.key.includes(value))
    });
  }

  add() {
    if(this.productForm.invalid){
      this.toastrService.danger('Veuillez remplir les champs obligatoires', 'Échec');
      return;
    }
    this.setKeywordsArray()
    this.productsService.addProduct(this.productForm.value).subscribe((result) => {
      console.log(result)
      this.toastrService.success(`Le produit ${this.productForm.value.name} a été ajouté !`, 'Succès');
    }, (err) => {
      this.toastrService.danger('Une erreur s\'est produite, le produit n\'a pas été ajouté', 'Échec');
    });
  }

  setKeywordsArray() {
    this.productForm.controls.keywords.setValue(this.productForm.value.keywords.split(','));
  }
}
