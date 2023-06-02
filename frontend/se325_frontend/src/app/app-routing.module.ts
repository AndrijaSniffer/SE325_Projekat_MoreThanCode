import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpenseTableComponent} from "./expense-table/expense-table.component";
import {IncomeTableComponent} from "./income-table/income-table.component";
import {ExpenseFormComponent} from "./expense-form/expense-form.component";
import {IncomeFormComponent} from "./income-form/income-form.component";
import {StatByPropertyComponent} from "./stat-by-property/stat-by-property.component";
import {StatByYearComponent} from "./stat-by-year/stat-by-year.component";
import {StatByMonthComponent} from "./stat-by-month/stat-by-month.component";
import {LoginRegisterComponent} from "./login-register/login-register.component";
import {UserGuard} from "./user.guard";

const routes: Routes = [
  {
    path: "",
    component: ExpenseTableComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "incomes",
    component: IncomeTableComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "add-expense",
    component: ExpenseFormComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "add-income",
    component: IncomeFormComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "stat-shop",
    component: StatByPropertyComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "stat-year",
    component: StatByYearComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "stat-month",
    component: StatByMonthComponent,
    children: [],
    canActivate: [UserGuard]
  },
  {
    path: "login",
    component: LoginRegisterComponent,
    children: []
  },
  {
    path: "**",
    component: LoginRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
