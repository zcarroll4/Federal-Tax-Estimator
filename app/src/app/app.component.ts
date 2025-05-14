import { Component } from '@angular/core';
import { stat } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  income: number | undefined;
  taxesPaid: number | undefined;
  separateFiling: boolean | undefined = true;
  jointFiling: boolean | undefined;
  projectedTaxes: number | undefined;
  projectedResult: number | undefined;
  standardDeduction: number | undefined;
  standardDeduction_Single_2025: number | undefined = -15000;
  standardDeduction_Jointly_2025: number | undefined = -30000;
  taxableIncome: number | undefined;
  taxesDue: number | undefined;
  isLoading = false;
  changeFilingStatus(status: string) {
    if (status == "separate") {
      if (this.separateFiling) {
        this.separateFiling = undefined;
      } else {
        this.separateFiling = true;
      }
    }
    if (status == "joint") {
      if (this.jointFiling) {
        this.jointFiling = undefined;
      } else {
        this.jointFiling = true;
      }
    }

    this.calcTaxes()
  }
  calcTaxes() {
    this.isLoading = true;
    if (!this.income || !this.taxesPaid) {
      if (!this.separateFiling && !this.jointFiling) {
        return;
      }
      this.projectedTaxes = undefined;
      this.projectedResult = undefined;
      return;
    }
    if (this.separateFiling) {
      this.standardDeduction = this.standardDeduction_Single_2025;
    } else if (this.jointFiling) {
      this.standardDeduction = this.standardDeduction_Jointly_2025;
    }
    if (!this.standardDeduction) {
      this.standardDeduction = undefined;
      return;
    }
    if (this.income && this.income < this.standardDeduction && this.taxesPaid) {
      alert('If you make less than the standard deduction, you likely don\'t need to file a return.');
      return;
    }
    this.taxableIncome = this.income + this.standardDeduction;
    this.taxesDue = this.calcFilingSeparately2024(this.taxableIncome);
    this.taxesDue = this.calcFilingSeparately2025(this.taxableIncome);

    this.projectedTaxes = this.income * .15;
    this.projectedResult = this.taxesPaid - this.taxesDue;
    this.isLoading = false;
  }

  calcFilingSeparately2024(income: number): number {
    let taxBill = 0;
    let bracket1MinRange = 0;
    let bracket1MaxRange = 11600;
    let bracket2MinRange = 11601;
    let bracket2MaxRange = 47150;
    let bracket3MinRange = 47151;
    let bracket3MaxRange = 100525;
    let bracket4MinRange = 100526;
    let bracket4MaxRange = 191950;
    let bracket5MinRange = 191951;
    let bracket5MaxRange = 243725;
    let bracket6MinRange = 243726;
    let bracket6MaxRange = 609350;
    let bracket7MinRange = 609351;
    // let bracket7MaxRange = 47151;
    let bracket1Percent = 0.10;
    let bracket2Percent = 0.12;
    let bracket3Percent = 0.22;
    let bracket4Percent = 0.24;
    let bracket5Percent = 0.32;
    let bracket6Percent = 0.35;
    let bracket7Percent = 0.37;
    if (income > bracket1MaxRange) {
      taxBill += (bracket1MaxRange * bracket1Percent);
    } else {
      taxBill += Math.round(income * bracket1Percent);
      return taxBill;
    }
    if (income > bracket2MaxRange) {
      taxBill += ((bracket2MaxRange - bracket2MinRange) * bracket2Percent);
    } else {
      taxBill += Math.round((income - bracket2MinRange) * bracket2Percent);
      return taxBill;
    }
    if (income > bracket3MaxRange) {
      taxBill += ((bracket3MaxRange - bracket3MinRange) * bracket3Percent);
    } else {
      taxBill += Math.round((income - bracket3MinRange) * bracket3Percent);
      return taxBill;
    }
    if (income > bracket4MaxRange) {
      taxBill += ((bracket4MaxRange - bracket4MinRange) * bracket4Percent);
    } else {
      taxBill += Math.round((income - bracket4MinRange) * bracket4Percent);
      return taxBill;
    }
    if (income > bracket5MaxRange) {
      taxBill += ((bracket5MaxRange - bracket5MinRange) * bracket5Percent);
    } else {
      taxBill += Math.round((income - bracket5MinRange) * bracket5Percent);
      return taxBill;
    }
    if (income > bracket6MaxRange) {
      taxBill += ((bracket6MaxRange - bracket6MinRange) * bracket6Percent);
    } else {
      taxBill += Math.round((income - bracket6MinRange) * bracket6Percent);
      return taxBill;
    }
    if (income > bracket7MinRange) {
      taxBill += Math.round((income - bracket7MinRange) * bracket7Percent);
      return taxBill;
    }
    return taxBill;
  }
  calcFilingSeparately2025(income: number): number {
    let taxBill = 0;
    let bracket1MinRange = 0;
    let bracket1MaxRange = 11925;
    let bracket2MinRange = 11926;
    let bracket2MaxRange = 48475;
    let bracket3MinRange = 48476;
    let bracket3MaxRange = 103350;
    let bracket4MinRange = 103351;
    let bracket4MaxRange = 197300;
    let bracket5MinRange = 197301;
    let bracket5MaxRange = 250525;
    let bracket6MinRange = 250526;
    let bracket6MaxRange = 626350;
    let bracket7MinRange = 626351;
    // let bracket7MaxRange = 47151;
    let bracket1Percent = 0.10;
    let bracket2Percent = 0.12;
    let bracket3Percent = 0.22;
    let bracket4Percent = 0.24;
    let bracket5Percent = 0.32;
    let bracket6Percent = 0.35;
    let bracket7Percent = 0.37;
    if (income > bracket1MaxRange) {
      taxBill += (bracket1MaxRange * bracket1Percent);
    } else {
      taxBill += Math.round(income * bracket1Percent);
      return taxBill;
    }
    if (income > bracket2MaxRange) {
      taxBill += ((bracket2MaxRange - bracket2MinRange) * bracket2Percent);
    } else {
      taxBill += Math.round((income - bracket2MinRange) * bracket2Percent);
      return taxBill;
    }
    if (income > bracket3MaxRange) {
      taxBill += ((bracket3MaxRange - bracket3MinRange) * bracket3Percent);
    } else {
      taxBill += Math.round((income - bracket3MinRange) * bracket3Percent);
      return taxBill;
    }
    if (income > bracket4MaxRange) {
      taxBill += ((bracket4MaxRange - bracket4MinRange) * bracket4Percent);
    } else {
      taxBill += Math.round((income - bracket4MinRange) * bracket4Percent);
      return taxBill;
    }
    if (income > bracket5MaxRange) {
      taxBill += ((bracket5MaxRange - bracket5MinRange) * bracket5Percent);
    } else {
      taxBill += Math.round((income - bracket5MinRange) * bracket5Percent);
      return taxBill;
    }
    if (income > bracket6MaxRange) {
      taxBill += ((bracket6MaxRange - bracket6MinRange) * bracket6Percent);
    } else {
      taxBill += Math.round((income - bracket6MinRange) * bracket6Percent);
      return taxBill;
    }
    if (income > bracket7MinRange) {
      taxBill += Math.round((income - bracket7MinRange) * bracket7Percent);
      return taxBill;
    }
    return taxBill;
  }

  calcFilingJointly2024() {

  }

}
function delay(arg0: number) {
  throw new Error('Function not implemented.');
}

