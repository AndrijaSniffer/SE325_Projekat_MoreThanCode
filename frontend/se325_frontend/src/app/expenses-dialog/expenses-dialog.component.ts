import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Expense} from "../classes/expense";

@Component({
  selector: 'app-expenses-dialog',
  templateUrl: './expenses-dialog.component.html',
  styleUrls: ['./expenses-dialog.component.css']
})
export class ExpensesDialogComponent implements OnInit {
  model: NgbDateStruct;
  form: FormGroup;
  @Input() expense: Expense;
  closeDto: { reason: string, expense: Expense }

  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    let date = new Date(this.expense.date);
    this.model = {
      year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()
    }

    this.form = this._formBuilder.group({
      date: new FormControl({
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDate()
      }, Validators.required),
      shop: new FormControl(this.expense.shop, Validators.required),
      expense: new FormControl(this.expense.cost, Validators.required)
    })
  }

  close() {
    let date = this.form.value.date;
    const dateString = new Date(`${date.month}-${date.day}-${date.year}`);

    this.closeDto = {
      reason: "save",
      expense: {
        date: dateString.toISOString(),
        cost: this.form.value.expense,
        shop: this.form.value.shop
      }
    }

    this.activeModal.close(this.closeDto);
  }

}
