import { Component, Input  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  Text: string = ''
  constructor(private ngbModal: NgbModal) {
  }

  getErrText(errText: string) {
    this.Text = errText;
  }

  public openModal() {
    this.ngbModal.open(ModalComponent);
  }
  
}
