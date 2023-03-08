import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errorComponent',
  templateUrl: './errorComponent.component.html',
  styleUrls: ['./errorComponent.component.css'],
})
export class ErrorComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = 'Pagina no encontrada';
  }

  ngOnInit() {}
}
