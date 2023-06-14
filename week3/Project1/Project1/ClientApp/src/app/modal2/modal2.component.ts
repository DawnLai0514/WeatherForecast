import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';


@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.css']
})
export class Modal2Component implements OnInit {
  constructor(private activeModal: NgbActiveModal, private dataSvc: DataService) {
  }

  message: string = "123"

  ngOnInit() {
    this.message = this.dataSvc.getMessage();
  }

  confirm() {
    /*alert(Text);*/
    this.activeModal.close(true);
/*    this.dataSvc.setMessage("是");*/
  }

  cancell() {
    /*alert(Text);*/
    this.activeModal.close(false);
/*    this.dataSvc.setMessage("否");*/
  }
}
