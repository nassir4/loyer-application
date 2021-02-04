import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILogement } from 'app/shared/model/logement.model';

@Component({
  selector: 'jhi-logement-detail',
  templateUrl: './logement-detail.component.html',
})
export class LogementDetailComponent implements OnInit {
  logement: ILogement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logement }) => (this.logement = logement));
  }

  previousState(): void {
    window.history.back();
  }
}
