import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpenseTableComponent} from "./expense-table/expense-table.component";
import {IncomeTableComponent} from "./income-table/income-table.component";
import {ExpenseFormComponent} from "./expense-form/expense-form.component";
import {IncomeFormComponent} from "./income-form/income-form.component";
import {StatByPropertyComponent} from "./stat-by-property/stat-by-property.component";
import {StatByYearComponent} from "./stat-by-year/stat-by-year.component";
import {StatByMonthComponent} from "./stat-by-month/stat-by-month.component";

const routes: Routes = [
  {
    path: "",
    component: ExpenseTableComponent,
    children: []
  },
  {
    path: "incomes",
    component: IncomeTableComponent,
    children: []
  },
  {
    path: "add-expense",
    component: ExpenseFormComponent,
    children: []
  },
  {
    path: "add-income",
    component: IncomeFormComponent,
    children: []
  },
  {
    path: "stat-shop",
    component: StatByPropertyComponent,
    children: []
  },
  {
    path: "stat-year",
    component: StatByYearComponent,
    children: []
  },
  {
    path: "stat-month",
    component: StatByMonthComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
