import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILogement } from 'app/shared/model/logement.model';
import { LogementService } from './logement.service';

@Component({
  templateUrl: './logement-delete-dialog.component.html',
})
export class LogementDeleteDialogComponent {
  logement?: ILogement;

  constructor(protected logementService: LogementService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('logementListModification');
      this.activeModal.close();
    });
  }
}
