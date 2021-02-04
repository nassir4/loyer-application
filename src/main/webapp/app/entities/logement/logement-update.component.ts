import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILogement, Logement } from 'app/shared/model/logement.model';
import { LogementService } from './logement.service';

@Component({
  selector: 'jhi-logement-update',
  templateUrl: './logement-update.component.html',
})
export class LogementUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    etat: [],
  });

  constructor(protected logementService: LogementService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logement }) => {
      this.updateForm(logement);
    });
  }

  updateForm(logement: ILogement): void {
    this.editForm.patchValue({
      id: logement.id,
      etat: logement.etat,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logement = this.createFromForm();
    if (logement.id !== undefined) {
      this.subscribeToSaveResponse(this.logementService.update(logement));
    } else {
      this.subscribeToSaveResponse(this.logementService.create(logement));
    }
  }

  private createFromForm(): ILogement {
    return {
      ...new Logement(),
      id: this.editForm.get(['id'])!.value,
      etat: this.editForm.get(['etat'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogement>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
