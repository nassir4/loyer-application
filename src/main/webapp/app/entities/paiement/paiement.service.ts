import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaiement } from 'app/shared/model/paiement.model';

type EntityResponseType = HttpResponse<IPaiement>;
type EntityArrayResponseType = HttpResponse<IPaiement[]>;

@Injectable({ providedIn: 'root' })
export class PaiementService {
  public resourceUrl = SERVER_API_URL + 'api/paiements';

  constructor(protected http: HttpClient) {}

  create(paiement: IPaiement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paiement);
    return this.http
      .post<IPaiement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paiement: IPaiement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paiement);
    return this.http
      .put<IPaiement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPaiement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPaiement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(paiement: IPaiement): IPaiement {
    const copy: IPaiement = Object.assign({}, paiement, {
      dateDebut: paiement.dateDebut && paiement.dateDebut.isValid() ? paiement.dateDebut.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paiement: IPaiement) => {
        paiement.dateDebut = paiement.dateDebut ? moment(paiement.dateDebut) : undefined;
      });
    }
    return res;
  }
}
