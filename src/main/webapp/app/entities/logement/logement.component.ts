import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILogement } from 'app/shared/model/logement.model';
import { LogementService } from './logement.service';
import { LogementDeleteDialogComponent } from './logement-delete-dialog.component';

@Component({
  selector: 'jhi-logement',
  templateUrl: './logement.component.html',
})
export class LogementComponent implements OnInit, OnDestroy {
  logements?: ILogement[];
  eventSubscriber?: Subscription;

  constructor(protected logementService: LogementService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.logementService.query().subscribe((res: HttpResponse<ILogement[]>) => (this.logements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLogements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILogement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLogements(): void {
    this.eventSubscriber = this.eventManager.subscribe('logementListModification', () => this.loadAll());
  }

  delete(logement: ILogement): void {
    const modalRef = this.modalService.open(LogementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.logement = logement;
  }
}
