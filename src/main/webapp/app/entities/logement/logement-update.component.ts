import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILogement, Logement } from 'app/shared/model/logement.model';
import { LogementService } from './logement.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAdresse } from 'app/shared/model/adresse.model';
import { AdresseService } from 'app/entities/adresse/adresse.service';

@Component({
  selector: 'jhi-logement-update',
  templateUrl: './logement-update.component.html',
})
export class LogementUpdateComponent implements OnInit {
  isSaving = false;
  adresses: IAdresse[] = [];

  editForm = this.fb.group({
    id: [],
    nbreChambe: [null, [Validators.required]],
    sufarce: [],
    photo: [],
    photoContentType: [],
    loyer: [null, [Validators.required]],
    description: [null, [Validators.required]],
    etage: [],
    ascenceur: [],
    garage: [],
    piscine: [],
    grenier: [],
    adresseId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected logementService: LogementService,
    protected adresseService: AdresseService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logement }) => {
      this.updateForm(logement);

      this.adresseService.query().subscribe((res: HttpResponse<IAdresse[]>) => (this.adresses = res.body || []));
    });
  }

  updateForm(logement: ILogement): void {
    this.editForm.patchValue({
      id: logement.id,
      nbreChambe: logement.nbreChambe,
      sufarce: logement.sufarce,
      photo: logement.photo,
      photoContentType: logement.photoContentType,
      loyer: logement.loyer,
      description: logement.description,
      etage: logement.etage,
      ascenceur: logement.ascenceur,
      garage: logement.garage,
      piscine: logement.piscine,
      grenier: logement.grenier,
      adresseId: logement.adresseId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('loyerApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
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
      nbreChambe: this.editForm.get(['nbreChambe'])!.value,
      sufarce: this.editForm.get(['sufarce'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      loyer: this.editForm.get(['loyer'])!.value,
      description: this.editForm.get(['description'])!.value,
      etage: this.editForm.get(['etage'])!.value,
      ascenceur: this.editForm.get(['ascenceur'])!.value,
      garage: this.editForm.get(['garage'])!.value,
      piscine: this.editForm.get(['piscine'])!.value,
      grenier: this.editForm.get(['grenier'])!.value,
      adresseId: this.editForm.get(['adresseId'])!.value,
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

  trackById(index: number, item: IAdresse): any {
    return item.id;
  }
}
