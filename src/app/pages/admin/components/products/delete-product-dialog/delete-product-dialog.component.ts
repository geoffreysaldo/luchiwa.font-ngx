import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {  } from 'events';

@Component({
  selector: 'ngx-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss']
})
export class DeleteProductDialogComponent implements OnInit {
  @Input() public name: string;
  @Output() public cancelEventEmitter = new EventEmitter();
  @Output() public deleteEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.cancelEventEmitter.emit();
  }

  delete() {
    this.deleteEventEmitter.emit();
  }

}
