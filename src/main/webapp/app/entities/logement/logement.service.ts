import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILogement } from 'app/shared/model/logement.model';

type EntityResponseType = HttpResponse<ILogement>;
type EntityArrayResponseType = HttpResponse<ILogement[]>;

@Injectable({ providedIn: 'root' })
export class LogementService {
  public resourceUrl = SERVER_API_URL + 'api/logements';

  constructor(protected http: HttpClient) {}

  create(logement: ILogement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logement);
    return this.http
      .post<ILogement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(logement: ILogement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logement);
    return this.http
      .put<ILogement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILogement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILogement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(logement: ILogement): ILogement {
    const copy: ILogement = Object.assign({}, logement, {
      createdAt: logement.createdAt && logement.createdAt.isValid() ? logement.createdAt.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((logement: ILogement) => {
        logement.createdAt = logement.createdAt ? moment(logement.createdAt) : undefined;
      });
    }
    return res;
  }
}
