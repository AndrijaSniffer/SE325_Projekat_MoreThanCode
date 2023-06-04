import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExpenseTableComponent} from './expense-table/expense-table.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IncomeTableComponent} from './income-table/income-table.component';
import {ExpenseFormComponent} from './expense-form/expense-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IncomeFormComponent} from './income-form/income-form.component';
import {StatByPropertyComponent} from './stat-by-property/stat-by-property.component';
import {StatByMonthComponent} from './stat-by-month/stat-by-month.component';
import {StatByYearComponent} from './stat-by-year/stat-by-year.component';
import {NgxChartsModule, PieChartModule} from "@swimlane/ngx-charts";
import {LoginRegisterComponent} from './login-register/login-register.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ExpensesDialogComponent} from './expenses-dialog/expenses-dialog.component';
import {IncomesDialogComponent} from './incomes-dialog/incomes-dialog.component';
import {YesNoDialogComponent} from './yes-no-dialog/yes-no-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseTableComponent,
    IncomeTableComponent,
    ExpenseFormComponent,
    IncomeFormComponent,
    StatByPropertyComponent,
    StatByMonthComponent,
    StatByYearComponent,
    LoginRegisterComponent,
    ExpensesDialogComponent,
    IncomesDialogComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxChartsModule,
    PieChartModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
