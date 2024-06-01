import { Component , OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment } from 'moment';

// const momentInstance = _rollupMoment || _moment;



@Component({
  selector: 'app-material-table-form',
  templateUrl: './material-table-form.component.html',
  styleUrls: ['./material-table-form.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None
})
export class MaterialTableFormComponent implements OnInit {
  myForm!: FormGroup;
  materials = [
    { name: 'Material 1', requiredQty: 10, enterQty: 0 },
    { name: 'Material 2', requiredQty: 15, enterQty: 0 },
  
  ];
  dataSource = new MatTableDataSource(this.materials);

  date = new FormControl(moment([2017, 0, 1]));

  // Filters
  nameFilter: string = '';
  requiredQtyFilter: string = '';
  enterQtyFilter: string = '';

  

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      date: ['', [Validators.required]],
    });
  }

  formatDateInput() {
    let dateInput = this.myForm.get('date')?.value;

    // Remove any non-numeric characters
    dateInput = dateInput.replace(/[^0-9]/g, '');

    // Apply the date mask as the user types
    if (dateInput.length > 2) {
      dateInput = `${dateInput.slice(0, 2)}/${dateInput.slice(2, 4)}/${dateInput.slice(4, 8)}`;
    }

    this.myForm.get('date')?.setValue(dateInput, { emitEvent: false });
  }

  addSlashes() {
    let dateInput = this.myForm.get('date')?.value;

    // Add slashes if they are not already present
    if (dateInput.length === 8) {
      dateInput = `${dateInput.slice(0, 2)}/${dateInput.slice(2, 4)}/${dateInput.slice(4, 8)}`;
    }

    this.myForm.get('date')?.setValue(dateInput, { emitEvent: false });
  }

  // Filtered materials array
  get filteredMaterials() {
    return this.materials.filter(material =>
      material.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      material.requiredQty.toString().includes(this.requiredQtyFilter) &&
      material.enterQty.toString().includes(this.enterQtyFilter)
    );
  }
  

  


  addedFields: any[] = [{ enterQty: 0 }]; 
  addedScrapFields: any[] = [{ num: '', qty: '', kgs: '' }];

  
  

  addField() {
    this.addedFields.push({ enterQty: 0 }); 
  }

  removeField(index: number) {
    this.addedFields.splice(index, 1); 
  }

  addScrapField() {
    this.addedScrapFields.push({ num: '', qty: '', kgs: '' });
  }

  removeScrapField(index: number) {
    this.addedScrapFields.splice(index, 1);
  }

  // filter functions for each column
  applyFilterName(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterRequiredQty(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEnterQty(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  
  
}
