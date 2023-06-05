import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Income} from "../classes/income";

@Component({
  selector: 'app-incomes-dialog',
  templateUrl: './incomes-dialog.component.html',
  styleUrls: ['./incomes-dialog.component.css']
})
export class IncomesDialogComponent implements OnInit {
  model: NgbDateStruct;
  form: FormGroup;
  @Input() income: Income;
  closeDto: { reason: string, income: Income }

  constructor(public activeModal: NgbActiveModal,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    let date = new Date(this.income.date);
    this.model = {
      year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()
    }

    this.form = this._formBuilder.group({
      date: new FormControl({
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDate()
      }, Validators.required),
      source: new FormControl(this.income.source, Validators.required),
      income: new FormControl(this.income.earning, Validators.required)
    })
  }

  close() {
    let date = this.form.value.date;
    const dateString = new Date(`${date.month}-${date.day}-${date.year}`);

    this.closeDto = {
      reason: "save",
      income: {
        date: dateString.toISOString(),
        earning: this.form.value.income,
        source: this.form.value.source
      }
    }

    this.activeModal.close(this.closeDto);
  }

}
