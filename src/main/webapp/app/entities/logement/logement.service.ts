import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<ILogement>(this.resourceUrl, logement, { observe: 'response' });
  }

  update(logement: ILogement): Observable<EntityResponseType> {
    return this.http.put<ILogement>(this.resourceUrl, logement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILogement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILogement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
