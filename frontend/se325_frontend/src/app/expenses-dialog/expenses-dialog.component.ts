import {Component, OnInit} from '@angular/core';
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
  closeDto: { reason: string, expense: Expense }

  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder) {
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
