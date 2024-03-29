import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-source-system-details',
  standalone: true,
  imports: [InputTextModule, ButtonModule, DropdownModule,FormsModule,CommonModule],
  templateUrl: './source-system-details.component.html',
  styleUrl: './source-system-details.component.css'
})
export class SourceSystemDetailsComponent implements OnInit {

  selectedCustomField: string = "abc";

  customFieldsDrpdwnValues:any;

  constructor() { }

  ngOnInit(): void {
    this.customFieldsDrpdwnValues = [
      {
        id: 1,
        name: "Vitara Brezza",
        val: "VITARA"
    },
    {
        id: 2,
        name: "Mahindra Thar",
        val: "THAR"
    },
    ]
  }

}
