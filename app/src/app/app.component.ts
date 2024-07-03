import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  income: number | undefined;
  taxes: number | undefined;
  projectedTaxes: number | undefined;
  projectedResult: number | undefined;

  calcTaxes() {
    if (!this.income || !this.taxes) {
      this.projectedTaxes = undefined;
      this.projectedResult = undefined;
      return;
    }
    this.projectedTaxes = this.income * .15;
    this.projectedResult = 300;
  }
}
