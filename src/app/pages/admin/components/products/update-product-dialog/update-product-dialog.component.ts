import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent implements OnInit {
  public selectedTaxRate;
  public selectedType: string;
  public categories;
  public filteredCategories;
  @Input() product;
  @Input() productForm: FormGroup;
  @Output() cancelEventEmitter = new EventEmitter();
  @Output() updateEventEmitter = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: [{value:'', disabled: false}, [Validators.required]],
      type: [{value:'', disabled: false}, [Validators.required]],
      categoryName: [{value:'', disabled: false}, [Validators.required]],
      taxRate: [{value:'', disabled: false}, [Validators.required]],
      total: [{value:'', disabled: false}, [Validators.required]],
      totalTaxInclusive: [{value:'', disabled: false}, [Validators.required]],
      keywords: [{value:'', disabled: false}, [Validators.required]],
      description: [{value:'', disabled: false}, [Validators.required]],
      imageUrl: [{value: '', disabled: false}, [Validators.required]]
    })
   }

  ngOnInit(): void {
    delete this.product.imageUrl;
    this.productForm.patchValue(this.product);
    this.selectedTaxRate = this.productForm.value.taxRate;
    this.selectedType = this.productForm.value.type;
    this.productForm.controls.name.disable();
    this.productForm.controls.total.disable();

    this.productForm.controls.totalTaxInclusive.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.productForm.controls.total.enable();
      this.productForm.controls.total.setValue(Number((value/(1 + this.productForm.value.taxRate / 100)).toFixed(2)));
      this.productForm.controls.total.disable();
    })

    this.productForm.controls.taxRate.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.productForm.controls.total.enable();
      this.productForm.controls.total.setValue(Number((this.productForm.value.totalTaxInclusive/(1 + value / 100)).toFixed(2)));
      this.productForm.controls.total.disable()
    })

    this.productForm.controls.categoryName.valueChanges.subscribe((value) => {
      this.filteredCategories = this.categories.filter((category) => category.key.includes(value))
    });
  }


  cancel() {
    this.cancelEventEmitter.emit();
  }

  update() {
    this.productForm.controls.name.enable();
    this.productForm.controls.total.enable();
    if(typeof(this.productForm.value.keywords) === 'string'){
      this.productForm.controls.keywords.setValue(this.productForm.value.keywords.split(','))
    };
    console.log(this.productForm.value);
    this.updateEventEmitter.emit(this.productForm.value);
  }

}
