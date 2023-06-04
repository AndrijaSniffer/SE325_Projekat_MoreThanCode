import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent implements OnInit {
  @Input() private openReason: "expense" | "income" | "logout";
  title: string = ""

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    switch (this.openReason) {
      case "expense":
        this.title = $localize`Da li želite da obršite trošak?`;
        break;

      case "income":
        this.title = $localize`Da li želite da obršite prihod?`;
        break;

      case "logout":
        this.title = $localize`Da li želite da se izlogujete?`;
        break;

      default:
        this.title = "N/A"
    }
  }

}
