import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal, private dataSvc: DataService) {
  }

  message: string = "123";

  ngOnInit() {
    this.message = this.dataSvc.getMessage();
  }

  confirm() {
    /*alert(Text);*/
    this.activeModal.close(true);
  }
  
  cancell() {
    /*alert(Text);*/
    this.activeModal.close(true);
  }
}
