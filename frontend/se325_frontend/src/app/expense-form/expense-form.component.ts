import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpensesService} from "../services/expenses.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  model: NgbDateStruct;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _expensesService: ExpensesService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.form = this._formBuilder.group({
      date: new FormControl("", Validators.required),
      shop: new FormControl("", Validators.required),
      expense: new FormControl("", Validators.required)
    })
  }

  submitForm() {
    if (this.form.valid) {
      let date = this.form.value.date;
      const dateString = new Date(`${date.month}-${date.day}-${date.year}`);

      this._expensesService.createExpense({
        date: dateString.toISOString(),
        cost: this.form.value.expense,
        shop: this.form.value.shop
      }).subscribe(expense => {
        this._router.navigate([""])
      }, error => {
        alert("Error has occured")
      })
    }
  }

  goBack() {
    this._router.navigate([""])
  }

}
