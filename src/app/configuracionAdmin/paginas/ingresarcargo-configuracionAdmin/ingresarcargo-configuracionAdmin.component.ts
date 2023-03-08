import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresarcargo-configuracionAdmin',
  templateUrl: './ingresarcargo-configuracionAdmin.component.html',
  styleUrls: ['./ingresarcargo-configuracionAdmin.component.css'],
})
export class IngresarcargoConfiguracionAdminComponent implements OnInit {
  get isHorizontal(): boolean {
    return true;
  }
  constructor() {}

  ngOnInit() {}
}
