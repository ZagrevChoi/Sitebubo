import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sdatatable',
  templateUrl: './sdatatable.component.html',
  styleUrls: ['./sdatatable.component.scss'],
})
export class SdatatableComponent implements OnInit {
  @Input() type: number;
  constructor() { }

  ngOnInit() {}

  arrayNumber(n: number): number[] {
    return Array(n);
  }
}
