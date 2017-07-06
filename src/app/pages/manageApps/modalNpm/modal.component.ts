import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./modal.component.scss')],
  templateUrl: 'modal.component.html'
})

export class ModalNpm implements OnInit {

  modalHeader: string;
  modalContent: string;

  constructor(private activeModal: NgbActiveModal, private appsService: AppsService, private toastrService: ToastrService) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }



}
