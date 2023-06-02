import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IncomesService} from "../services/incomes.service";

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  model: NgbDateStruct;
  form: FormGroup

  constructor(private _formBuilder: FormBuilder,
              private _incomeService: IncomesService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this._formBuilder.group({
      date: new FormControl("", Validators.required),
      source: new FormControl("", Validators.required),
      income: new FormControl("", Validators.required)
    })
  }

  submitForm() {
    let date = this.form.value.date;
    const dateString = new Date(`${date.month}-${date.day}-${date.year}`);

    // console.log(`${date.month}-${date.day}-${date.year}`)
    // console.warn(new Date(`${date.month}-${date.day}-${date.year}`).toISOString())

    this._incomeService.createIncomes({
      date: dateString.toISOString(),
      source: this.form.value.source,
      earning: this.form.value.income
    }).subscribe(expense => {
      this._router.navigate(["incomes"])
    }, error => {
      alert("Error has occured")
    })
  }

  goBack() {
    this._router.navigate(["incomes"])
  }

}
